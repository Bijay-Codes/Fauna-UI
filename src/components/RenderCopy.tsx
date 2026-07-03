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

// input {color_key}, {--var}, {indent= "  " space between each var start point}
// output root:{colors} side note based on default mode root is selected
function buildCSSBlock(color: Color, selector: string, indent = "  ") {
    const lines = Object.entries(color)
        .map(([key, value]) => `${indent}${toVarName(key)}: ${value};`)
        .join("\n");
    return `${selector} {\n${lines}\n}`;
}

// input {colors=>themes, indent}
// output 'var' separator "-" instead of "_" and color in string format
function buildTailwindBlock(color: Color, indent = "        ") {
    console.log(Object.entries(color)
        .map(([key, value]) => `${indent}'${key.replace(/_/g, "-")}': '${value}',`)
        .join("\n"));

    return Object.entries(color)
        .map(([key, value]) => `${indent}'${key.replace(/_/g, "-")}': '${value}',`)
        .join("\n");
}

// call the generator functions based on which format user choose
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

        // Simple JSON creation
        case "json": {
            const data =
                scope === "current"
                    ? { name, mode, ...current }
                    : { name, light: color.light, dark: color.dark };
            return JSON.stringify(data, null, 2);
        }


        // Simple array creation, normalization using regex
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


        // Font imports to add at html head
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
    // if the dropdown is visible then its true -_- simple
    const [open, setOpen] = useState(false);

    // what format? css, tailwind, json etc this is the provider
    const [format, setFormat] = useState<Format>("css");

    // hmmm shows which mode to be copied only light mode? = current, both dark and light? = both
    const [scope, setScope] = useState<Scope>("current");

    //Copied? it is true if the format was copied or false if not
    const [copied, setCopied] = useState(false);
    // simple name same task... same as above
    const [copyFailed, setCopyFailed] = useState(false);

    // the backdrop to close dropdown when the user click outside the dropdown
    const wrapperRef = useRef<HTMLDivElement>(null);

    const current = theme.color[mode];
    const handleCopy = async () => {
        const output = generateOutput(theme, mode, format, scope);
        // try to write in clipboard wont work if the browser flags it suspicious so we have a catch block
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Display message that copy failed
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
        document.addEventListener("click", handleClick);

        // clear up function to avoid stacking event listeners per ReRender !IMP
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    return (
        <div className="relative inline-block" ref={wrapperRef}>
            <button title="Copy this theme"
                className="px-3 py-1 rounded  hover:opacity-90
                 text-sm font-medium sec-font"
                style={{
                    background: `linear-gradient(to bottom right,
                     ${current.primary_bg},
                     ${current.accent_bg})`,
                    color: current.accent_fg
                }}
                onClick={() => setOpen((o) => !o)}
            >
                {copyFailed ? "Try again" : copied ? "Copied ✓" : "Copy theme ▾"}
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
                        <p className="text-xs uppercase tracking-wide opacity-70 mb-1 prim-font">Format</p>
                        <div className="flex flex-wrap gap-1">
                            {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
                                <button
                                    key={f}
                                    className="px-2 py-1 rounded text-xs sec-font"
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
                            <p className="text-xs uppercase tracking-wide opacity-70 mb-1 prim-font">Scope</p>
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
                        className="w-full px-2 mt-2 rounded text-sm font-medium prim-font"
                        style={{ background: current.primary_bg, color: current.primary_fg }}
                        onClick={handleCopy}
                    >
                        {copyFailed ? "Try again ✕" : copied ? "Copied ✓" : "Copy"}
                    </button>
                </div>
            )}
        </div>
    );
}
