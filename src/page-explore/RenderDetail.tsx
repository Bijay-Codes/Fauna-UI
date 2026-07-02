import { useState } from "react";
import { RenderFooter } from "../landing-page/Renderfooter";
import { colorAnim } from "../Data/animalsData";
import { Link, useParams } from "react-router-dom";
import { CopyThemeButton } from "../components/RenderCopy";
import { getWCAGRating } from "../test";
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
    } = color[mode] || color[defaultMode];

    const toggle = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    }

    return (
        <section style={{ background: page_bg, color: page_fg }}
            className="transition-all duration-700 ease-in-out">
            <div
                className="flex flex-col gap-6 p-4
            max-w-300 m-auto"
            >
                <Link to='/explore' className="underline prim-font">← Go back to Explore</Link>
                <RenderHero theme={card} mode={mode} />
                <div className="flex flex-row sm:flex-col flex-wrap gap-4">
                    <h1 className="text-xl w-fit font-medium">This page is using {name} theme</h1>
                    <div className="flex gap-2 flex-wrap prim-font items-center">
                        <h2 className="opacity-80">Active</h2>
                        <button
                            className="px-2 py-2 rounded text-xs capitalize"
                            style={{ background: primary_bg, color: primary_fg }}
                            onClick={toggle}
                        >
                            [ {mode} ] <span className="animate-pulse">Toggle</span>
                        </button>
                    </div>
                </div>
                <RenderIntro theme={card} mode={mode} />
                <RenderTutorial theme={card} mode={mode} />
            </div>
            {
                mode == 'dark' ?
                    (
                        <footer className="flex justify-center items-center text-sm mask-t-from-90%"
                            style={
                                {
                                    background: `linear-gradient(to bottom,
                    transparent 40%,
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
                    )
            }

        </section >
    );
}

function RenderHero({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode]
    return (
        <main className="flex flex-col justify-center gap-4 sm:p-4 p-1 border-b-2"
            style={{
                borderColor: colors.accent_bg,
            }}>
            <div className="text-2xl font-extrabold text-shadow-2xs " style={{ color: colors.accent_bg }}>{theme.name}</div>
            <div className="text-lg font-bold opacity-80" style={{ color: colors.page_fg }}>{theme.tagline}</div>
            <CopyThemeButton theme={theme} mode={mode} />
        </main>
    )
}

function RenderIntro({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode];

    return (
        <section className="flex flex-col gap-10">
            {/* Colors pallate */}
            <RenderColor colors={colors} mode={mode} />
            {/* Font suggestions */}
            <RenderFont theme={theme} mode={mode} />
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-4" />

            {/* Use case section */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                    Built for
                </h2>
                <div className="flex flex-wrap gap-2 sec-font">
                    {theme.categories.map(category => (
                        <span
                            key={category}
                            className="text-sm px-2 py-1 rounded"
                            style={{ background: colors.accent_bg, color: colors.accent_fg }}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            {/* Usage */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                    Usage
                </h2>
                <div className="flex flex-wrap gap-2">
                    {theme.sites.map(site => (
                        <span
                            key={site}
                            className="text-sm px-4 py-1 rounded sec-font"
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

function RenderColor({ colors, mode }: { colors: color; mode: 'dark' | 'light' }) {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                Palette | {mode}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {swatch.map(({ key, label, fgKey }) => {
                    const { ratio, rating } = getWCAGRating(colors[key], colors[fgKey]);
                    return (
                        <div
                            key={key}
                            className="flex flex-col gap-1 rounded-lg p-2 min-h-15 justify-center border border-slate-600"
                            style={{ background: colors[key], color: colors[fgKey] }}
                        >
                            <span className="text-sm font-medium">{label}</span>
                            <div className="flex gap-2 text-[0.6rem] opacity-90 sec-font w-fit px-2 items-center">
                                <span>
                                    {ratio} : 1
                                </span>
                                <span>||</span>
                                <span>{rating}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

function RenderFont({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode];

    return (
        <div className="flex flex-col gap-2">
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
                    <div className="text-xs mt-1 opacity-70 font-mono sec-font">Head | {theme.font.main}</div>
                </div>
                <div>
                    <p className="text-sm sec-font" style={{ fontFamily: theme.font.body }}>
                        Body copy renders in {theme.font.body}, built for longer reading without losing the theme's character.
                    </p>
                    <div className="text-xs mt-1 opacity-70 sec-font">Body | {theme.font.body}</div>
                </div>
            </div>
        </div>

    )
}

const useCases: { key: keyof color; label: string; useCase: string }[] = [
    {
        key: "page_bg",
        label: "--page-bg",
        useCase: "The base canvas color behind everything — sets the overall mood of the app.",
    },
    {
        key: "surface_bg",
        label: "--surface-bg",
        useCase: "Background for cards, panels, modals — anything that sits slightly above the page.",
    },
    {
        key: "surface_muted_bg",
        label: "--surface-muted",
        useCase: "A quieter surface for secondary panels, sidebars, or input fields that shouldn't compete for attention.",
    },
    {
        key: "primary_bg",
        label: "--primary-bg",
        useCase: "Your main brand color — primary buttons, active links, key CTAs the user should notice first.",
    },
    {
        key: "secondary_bg",
        label: "--secondary-bg",
        useCase: "Supports the primary color — secondary buttons, less critical actions, supporting UI accents.",
    },
    {
        key: "accent_bg",
        label: "--accent-bg",
        useCase: "Used sparingly to draw the eye — badges, highlights, tags, or decorative emphasis.",
    },
    {
        key: "success_color",
        label: "--success-color",
        useCase: "Confirms a positive outcome — saved changes, completed steps, passed checks.",
    },
    {
        key: "warning_color",
        label: "--warning-color",
        useCase: "Flags caution — pending states, unsaved changes, things that need a second look.",
    },
    {
        key: "danger_color",
        label: "--danger-color",
        useCase: "Signals something destructive or broken — errors, failed validation, delete actions.",
    },
];

function RenderTutorial({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode];

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xs uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                color usage
            </h2>
            <div className="flex flex-col gap-2">
                {useCases.map(({ key, label, useCase }) => (
                    <div
                        key={key}
                        className="flex gap-2 items-start rounded-lg p-3 max-w-200"
                        style={{ background: colors.surface_bg, color: colors.surface_fg }}
                    >
                        <span
                            className="w-4 h-4 rounded shrink-0 mt-0.5 border border-slate-600"
                            style={{ background: colors[key] }}
                        />
                        <div className="flex flex-col gap-0.5 sec-font">
                            <span className="text-sm font-medium">{label}</span>
                            <span className="text-xs opacity-75">{useCase}</span>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-4" />
        </div>
    );
}