import { useState } from "react";
import { colorAnim } from "../Data/animalsData";
import { Link, useParams } from "react-router-dom";
import { CopyThemeButton } from "../components/RenderCopy";
import type { theme, color } from "../types";
export function RenderDetail() {
    const { id } = useParams<{ id: string }>();
    const card = colorAnim.find(item => String(item.id) === id);
    const [mode, setMode] = useState(card?.defaultMode || 'dark');

    if (!card) {
        return (
            <section>
                <Link to='/explore' className="underline">← Go back to Explore</Link>
                <div className="mt-4">Theme not found.</div>
            </section>
        );
    }

    const { defaultMode, color, name } = card;
    const {
        page_bg, page_fg,
        primary_bg, primary_fg,
        // secondary_bg, secondary_fg
    } = color[mode] || color[defaultMode];

    const toggle = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    }

    return (
        <section style={{ background: page_bg, color: page_fg }}
            className="transition-all duration-700 ease-in-out ">
            <div
                className="flex flex-col gap-6 p-4
            max-w-300 m-auto"
            >
                <Link to='/explore' className="underline">← Go back to Explore</Link>
                <RenderHero theme={card} mode={mode} />
                <div className="flex flex-row sm:flex-col flex-wrap gap-4">
                    <h1 className="text-2xl w-fit">Welcome to <span style={{ color: primary_bg }} className="font-extrabold">{name}</span> theme</h1>
                    <div className="flex gap-2 flex-wrap">
                        <h2>Active</h2>
                        <button
                            className="px-2 rounded text-xs"
                            style={{ background: primary_bg, color: primary_fg }}
                            onClick={toggle}
                        >
                            [{mode}]
                        </button>
                    </div>
                </div>
                <RenderIntro theme={card} mode={mode} />
            </div>
            {mode == 'dark' ?
                (
                    <footer className="flex justify-center items-center text-sm mask-t-from-90%"
                        style={
                            {
                                background: `linear-gradient(to bottom,
                    transparent 20%,
                    ${primary_bg} 100%)`
                            }}>
                        <RenderFooter />
                    </footer>
                ) :
                (
                    <footer className="flex justify-center items-center text-sm rounded-t-xl"
                        style={{
                            background: primary_bg,
                            color: primary_fg
                        }}>
                        <RenderFooter />
                    </footer>
                )}

        </section >
    );
}

function RenderHero({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode]
    return (
        <main className="flex flex-col justify-center gap-4 sm:p-4 p-1 border-b-2"
            style={{
                borderColor: colors.primary_bg,
            }}>
            <div className="text-2xl">{theme.name}</div>
            <div className="text-lg">{theme.tagline}</div>
            <CopyThemeButton theme={theme} mode={mode} />
        </main>
    )
}

const swatch: { key: keyof color, label: string, fgKey: keyof color }[] = [
    { key: "page_bg", label: "Page", fgKey: "page_fg" },
    { key: "surface_bg", label: "Surface", fgKey: "surface_fg" },
    { key: "surface_muted_bg", label: "Surface muted", fgKey: "surface_muted_fg" },
    { key: "primary_bg", label: "Primary", fgKey: "primary_fg" },
    { key: "secondary_bg", label: "Secondary", fgKey: "secondary_fg" },
    { key: "accent_bg", label: "Accent", fgKey: "accent_fg" },
    { key: "success_color", label: "Success", fgKey: "success_fg" },
    { key: "warning_color", label: "Warning", fgKey: "warning_fg" },
    { key: "danger_color", label: "Danger", fgKey: "danger_fg" },
];

function RenderIntro({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode];

    return (
        <section className="flex flex-col gap-10">
            {/* Colors pallate */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                    Palette | {mode}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {swatch.map(({ key, label, fgKey }) => (
                        <div
                            key={key}
                            className="flex flex-col gap-1 rounded-lg p-2 min-h-15 justify-center border border-slate-600"
                            style={{ background: colors[key], color: colors[fgKey] }}
                        >
                            <span className="text-sm font-medium">{label}</span>
                            <span className="text-[0.6rem] opacity-80 break-all">{colors[key]}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Font suggestions */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                    Typography
                </h2>
                <div
                    className="flex flex-col gap-4 rounded-lg p-4"
                    style={{ background: colors.surface_bg, color: colors.surface_fg }}
                >
                    <div>
                        <div className="text-2xl" style={{ fontFamily: theme.font.main }}>
                            {theme.name} sets the tone
                        </div>
                        <div className="text-xs mt-1 opacity-70 font-mono">Head | {theme.font.main}</div>
                    </div>
                    <div>
                        <p className="text-sm" style={{ fontFamily: theme.font.body }}>
                            Body copy renders in {theme.font.body}, built for longer reading without losing the theme's character.
                        </p>
                        <div className="text-xs mt-1 opacity-70 font-mono">Body | {theme.font.body}</div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-4" />
            {/* Use case section */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                    Built for
                </h2>
                <div className="flex flex-wrap gap-2">
                    {theme.categories.map(category => (
                        <span
                            key={category}
                            className="text-sm px-2 py-1 rounded capitalize"
                            style={{ background: colors.accent_bg, color: colors.accent_fg }}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                    Where can use it
                </h2>
                <div className="flex flex-wrap gap-2">
                    {theme.sites.map(site => (
                        <span
                            key={site}
                            className="text-sm px-4 py-1 rounded capitalize"
                            style={{ background: colors.surface_muted_bg, color: colors.surface_muted_fg }}
                        >
                            {site}
                        </span>
                    ))}
                </div>
            </div>
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-4" />
        </section>
    )
}

function RenderFooter() {
    return (
        <div className="flex flex-col gap-2 px-2 py-4 text-sm w-full text-center">
            <p>Built solo, shaped by feedback.</p>

            <p >
                Have a theme idea, found a bug, or want to suggest something?{" "}
                <a href="https://github.com/Bijay-Codes/fauna-ui/issues" className="underline"
                    target="_blank">
                    Open an issue on GitHub—
                </a>{" "}
            </p>

            <div className="flex gap-4 items-center justify-center">
                <a href="https://github.com/Bijay-Codes/fauna-ui" className="underline"
                    target="_blank">
                    GitHub ↗
                </a>
                <a href="https://github.com/Bijay-Codes/fauna-ui/blob/main/LICENSE" className="underline"
                    target="_blank">
                    MIT License ↗
                </a>
            </div>

            <p className="text-xs mt-2">
                © 2026 Bijay. Built with React | Typescript & Tailwind.
            </p>
        </div>
    )
}