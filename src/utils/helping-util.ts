import type { theme } from "../types";

export function filterCategory(arr: string[], list: theme[]): theme[] {
    return list.filter(data =>
        data.categories.some(cat => arr.includes(cat))
    );
}

// utils/copy-util.ts
type ColorObj = Record<string, string>;
type BothModes = { light: ColorObj; dark: ColorObj };

function oklchToHex(oklch: string): string {
    const el = document.createElement("div");
    el.style.color = oklch;
    document.body.appendChild(el);
    const rgb = getComputedStyle(el).color;
    document.body.removeChild(el);

    const match = rgb.match(/\d+/g);
    if (!match) return "#000000";
    const [r, g, b] = match.map(Number);
    return "#" + [r, g, b].map(n => n.toString(16).padStart(2, "0")).join("");
}

function cssBlock(colorObj: ColorObj) {
    return Object.entries(colorObj)
        .map(([key, value]) => `  --${key.replace(/_/g, "-")}: ${value};`)
        .join("\n");
}

function tailwindBlock(colorObj: ColorObj) {
    return Object.entries(colorObj)
        .map(([key, value]) => `      "${key.replace(/_/g, "-")}": "${value}",`)
        .join("\n");
}

export function copyAs(
    colorObj: ColorObj,
    format: "css" | "tailwind" | "hex" | "json"
): string {
    switch (format) {
        case "css":
            return `:root {\n${cssBlock(colorObj)}\n}`;
        case "tailwind":
            return `colors: {\n${tailwindBlock(colorObj)}\n}`;
        case "hex":
            return JSON.stringify(Object.values(colorObj).map(oklchToHex));
        case "json":
            return JSON.stringify(colorObj, null, 2);
    }
}

export function copyAsBoth(
    color: BothModes,
    format: "css" | "tailwind" | "hex" | "json"
): string {
    switch (format) {
        case "css":
            return `:root {\n${cssBlock(color.light)}\n}\n\n[data-theme="dark"] {\n${cssBlock(color.dark)}\n}`;
        case "tailwind":
            return `colors: {\n  light: {\n${tailwindBlock(color.light)}\n  },\n  dark: {\n${tailwindBlock(color.dark)}\n  }\n}`;
        case "hex":
            return JSON.stringify({
                light: Object.values(color.light).map(oklchToHex),
                dark: Object.values(color.dark).map(oklchToHex),
            });
        case "json":
            return JSON.stringify(color, null, 2);
    }
}