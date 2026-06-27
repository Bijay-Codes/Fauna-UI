import { useEffect, useRef, useState } from "react";
import type { theme as Theme, color as Color } from "../types";

type Format = "css" | "tailwind" | "json" | "array" | "font";
type Scope = "current" | "both";

interface CopyThemeButtonProps {
    theme: Theme;
    mode: "light" | "dark";
}

const FORMAT_LABELS: Record<Format, string> = {
    css: "CSS Variables",
    tailwind: "Tailwind Config",
    json: "JSON",
    array: "Color Array",
    font: "Font Import",
};

const toVarName = (key: string) => `--${key.replace(/_/g, "-")}`;

function buildCSSBlock(color: Color, selector: string, indent = "  ") {
    const lines = Object.entries(color)
        .map(([key, value]) => `${indent}${toVarName(key)}: ${value};`)
        .join("\n");
    return `${selector} {\n${lines}\n}`;
}

function buildTailwindBlock(color: Color, indent = "        ") {
    return Object.entries(color)
        .map(([key, value]) => `${indent}'${key.replace(/_/g, "-")}': '${value}',`)
        .join("\n");
}

function generateOutput(theme: Theme, mode: "light" | "dark", format: Format, scope: Scope): string {
    const { color, font, name } = theme;
    const current = color[mode];

    switch (format) {
        case "css": {
            if (scope === "current") {
                return buildCSSBlock(current, ":root");
            }
            return `${buildCSSBlock(color.light, ":root")}
            ${buildCSSBlock(color.dark, ".dark")}`;
        }
        case "tailwind": {
            if (scope === "current") {
                return `// tailwind.config.js
                module.exports = {
                theme: {
                extend: {
                colors: {
                ${buildTailwindBlock(current)}
     },
    },
  },
}`;
            }
            return `// tailwind.config.js
            module.exports = {
            darkMode: 'class',
            theme: {
            extend: {
            colors: {
            light: {
            ${buildTailwindBlock(color.light)}
            },
            dark: {
            ${buildTailwindBlock(color.dark)}
        },
      },
    },
  },
}`;
        }
        case "json": {
            const data =
                scope === "current"
                    ? { name, mode, ...current }
                    : { name, light: color.light, dark: color.dark };
            return JSON.stringify(data, null, 2);
        }

        case "array": {
            if (scope === "current") {
                return `[\n${Object.values(current)
                    .map((v) => `  "${v}"`)
                    .join(",\n")}\n]`;
            }
            return `{\n  "light": [\n${Object.values(color.light)
                .map((v) => `    "${v}"`)
                .join(",\n")}\n  ],\n  "dark": [\n${Object.values(color.dark)
                    .map((v) => `    "${v}"`)
                    .join(",\n")}\n  ]\n}`;
        }

        case "font": {
            const families = Array.from(new Set([font.main, font.body]));
            const params = families
                .map((f) => `family=${f.trim().replace(/\s+/g, "+")}:wght@400;500;600;700`)
                .join("&");
            return [
                `<link rel="preconnect" href="https://fonts.googleapis.com">`,
                `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
                `<link href="https://fonts.googleapis.com/css2?${params}&display=swap" rel="stylesheet">`,
            ].join("\n");
        }
    }
}

export function CopyThemeButton({ theme, mode }: CopyThemeButtonProps) {
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState<Format>("css");
    const [scope, setScope] = useState<Scope>("current");
    const [copied, setCopied] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const current = theme.color[mode];

    const handleCopy = async () => {
        const output = generateOutput(theme, mode, format, scope);
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopyFailed(true);
            setTimeout(() => setCopyFailed(false), 1500);
        }
    };

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative inline-block" ref={wrapperRef}>
            <button
                className="px-3 py-1 rounded text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: current.accent_bg, color: current.accent_fg }}
                onClick={() => setOpen((o) => !o)}
            >
                {copyFailed ? "Copy failed" : copied ? "Copied!" : "Copy theme ▾"}
            </button>

            {open && (
                <div
                    className="absolute z-10 mt-2 sm:w-64 w-50 rounded p-4 border"
                    style={{
                        background: current.surface_bg,
                        color: current.surface_fg,
                        borderColor: current.accent_bg,
                    }}
                >
                    <div className="">
                        <p className="text-xs uppercase tracking-wide opacity-70 mb-1">Format</p>
                        <div className="flex flex-wrap gap-1">
                            {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
                                <button
                                    key={f}
                                    className="px-2 py-1 rounded text-xs"
                                    style={
                                        format === f
                                            ? { background: current.primary_bg, color: current.primary_fg }
                                            : { background: current.secondary_bg, color: current.secondary_fg }
                                    }
                                    onClick={() => setFormat(f)}
                                >
                                    {FORMAT_LABELS[f]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {format !== "font" && (
                        <div className="mb-2">
                            <p className="text-xs uppercase tracking-wide opacity-70 mb-1">Scope</p>
                            <div className="flex gap-1">
                                {(["current", "both"] as Scope[]).map((s) => (
                                    <button
                                        key={s}
                                        className="px-2 rounded text-xs flex-1"
                                        style={
                                            scope === s
                                                ? { background: current.primary_bg, color: current.primary_fg }
                                                : { background: current.secondary_bg, color: current.secondary_fg }
                                        }
                                        onClick={() => setScope(s)}
                                    >
                                        {s === "current" ? `${mode} only` : "light + dark"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        className="w-full px-2 mt-2 rounded text-sm font-medium"
                        style={{ background: current.primary_bg, color: current.primary_fg }}
                        onClick={handleCopy}
                    >
                        {copyFailed ? "Copy failed ✕" : copied ? "Copied to clipboard ✓" : "Copy"}
                    </button>
                </div>
            )}
        </div>
    );
}