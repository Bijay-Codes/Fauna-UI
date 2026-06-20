import { useState, useRef, useEffect } from "react";
import { copyAs, copyAsBoth } from "../utils/helping-util";

type Mode = "light" | "dark";
type ColorObj = Record<string, string>;
type BothModes = { light: ColorObj; dark: ColorObj };

interface Props {
    color: BothModes;
    mode: Mode;
}

const FORMATS = ["css", "tailwind", "hex", "json"] as const;

export function CopyThemeButton({ color, mode }: Props) {
    const [open, setOpen] = useState(false);
    const [both, setBoth] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleCopy = async (format: typeof FORMATS[number]) => {
        const text = both ? copyAsBoth(color, format) : copyAs(color[mode], format);
        await navigator.clipboard.writeText(text);
        setCopied(format);
        setTimeout(() => setCopied(null), 1200);
        setOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => {
                    setOpen(prev => !prev)

                }}
                className="px-4 py-1 rounded-xl"
                style={{ background: color[mode].primary_bg, color: color[mode].primary_fg }}
            >
                {copied ? `Copied as ${copied} ✓` : "Copy theme ▾"}
            </button>

            {open && (
                <div className="absolute mt-2 z-10 rounded-xl p-2 flex flex-col gap-1 shadow-lg"
                    style={{ background: color[mode].primary_bg, color: color[mode].primary_fg }}>
                    <label className="flex items-center gap-2 text-sm px-2 py-1">
                        <input
                            type="checkbox"
                            checked={both}
                            onChange={() => setBoth(prev => !prev)}
                        />
                        Both modes
                    </label>
                    <hr className="opacity-20" />
                    {FORMATS.map(f => (
                        <button
                            key={f}
                            onClick={() => handleCopy(f)}
                            className="text-left text-sm px-2 py-1 rounded
               bg-(--btn-bg) text-(--btn-fg)
               hover:bg-(--btn-hover-bg) hover:text-(--btn-hover-fg)"
                            style={{
                                "--btn-bg": color[mode].primary_bg_bg,
                                "--btn-fg": color[mode].primary_fg,
                                "--btn-hover-bg": color[mode].accent_bg,
                                "--btn-hover-fg": color[mode].accent_fg,
                            } as React.CSSProperties}
                        >
                            {f}
                        </button>))}
                </div>
            )}
        </div>
    );
}