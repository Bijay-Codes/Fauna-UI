import { useEffect, useRef, useState } from "react";
import { RenderFooter } from "../landing-page/Renderfooter";
import { colorAnim } from "../Data/animalsData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CopyThemeButton } from "../components/RenderCopy";
import { getWCAGRating } from "../test";
import type { theme, color } from "../types";
export function RenderDetail() {
    const { id } = useParams<{ id: string }>();
    const card = colorAnim.find(item => String(item.id) === id);
    const [mode, setMode] = useState(card?.defaultMode || 'dark');
    const navigate = useNavigate();
    const thisPage = useRef<HTMLElement>(null);
    const isDesktop = window.matchMedia("(hover: hover) and (min-width: 750px)").matches;
    useEffect(() => {
        if (isDesktop) thisPage.current?.focus();
    }, [isDesktop]);

    // Function that handles the left and right key click to change between pages
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (!isDesktop) return
        // // convert to num
        const currentNum = Number(id);

        if (e.key === 'ArrowRight') {
            navigate(`/explore/${currentNum + 1}`);
        } else if (e.key === 'ArrowLeft') {
            // Preventing from going below 0
            const next = Math.max(0, currentNum - 1);
            navigate(`/explore/${next}`);
        }
    };

    if (!card) {
        return (
            <section
                tabIndex={0}
                autoFocus
                onKeyDown={(e) => handleKeyDown(e)}
                className="flex flex-col justify-center sm:items-start items-center
                 p-6 gap-6 max-200">
                <Link to='/explore' className="underline underline-offset-8 hover:text-(--success-color) text-xl">← Go back to Explore</Link>
                <div className="mt-4 p-4 rounded-lg bg-(--danger-color) flex items-center gap-2 text-(--danger-fg) text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M7.843 3.802C9.872 2.601 10.886 2 12 2s2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594s-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22s-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7s1.571-1.59 3.6-2.792zM13 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1-9.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-xl">Theme not found.</span>
                </div>
                <div className="text-lg">
                    There are only {colorAnim.length} themes available for now!
                </div>
                <div className="text-md">
                    Want more themes? please wait paitently or if you could help create a new theme.
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M4 20h16v2H4zM4 2h16v2H4zM2 2h2v20H2zm18 0h2v20h-2zM7 13h2v2H7zm2 2h6v2H9zm6-2h2v2h-2zM8 8h2v2H8zm6 0h2v2h-2z"></path>
                    </svg>
                </div>
                <a href="https://github.com/Bijay-Codes/fauna-ui"
                    className="underline underline-offset-8
                     hover:text-(--accent-bg) self-start text-xl"
                    target="_blank">
                    GitHub ↗
                </a>
            </section >
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
            autoFocus
            tabIndex={-1}
            onKeyDown={(e) => handleKeyDown(e)}
            ref={thisPage}
            className="transition-all duration-700 ease-in-out">
            <div
                className="flex flex-col gap-4 p-4
            max-w-300 m-auto"
            >
                <Link to='/explore' className="underline text-xl prim-font hover:text-(--success-color)">← Go back to Explore</Link>
                {isDesktop && <div className="text-md">You can switch between themes using left and right arrow keys</div>}

                {/* renders copy button theme name and tagline */}
                <RenderHero theme={card} mode={mode} />

                {/* renders darkmode toggle section */}
                <div className="flex flex-row sm:flex-col flex-wrap gap-4">
                    <h1 className="text-2xl w-fit font-bold">This page is using {name} theme</h1>
                    <div className="flex gap-2 flex-wrap prim-font items-center">
                        <h2 className="opacity-80 text-xl">Active</h2>
                        <button title="Click to check light/dark mode of this theme"
                            className="px-2 py-2 rounded text-md capitalize"
                            style={{ background: primary_bg, color: primary_fg }}
                            onClick={toggle}
                        >
                            [ {mode} ] <span className="animate-pulse">Toggle</span>
                        </button>
                    </div>
                </div>

                <RenderContent theme={card} mode={mode} />
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


/* Structure
    _________________________
    |       name            |
    |      Tagline          |
    |     Copy button       |
    _________________________
    
*/

function RenderHero({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode]
    return (
        <main className="flex flex-col justify-center gap-4 sm:py-8 sm:p-4 py-6 border-b-2"
            style={{
                borderColor: colors.accent_bg,
            }}>
            <div
                className="text-4xl font-extrabold text-shadow-2xs"
                style={{ color: colors.accent_bg }}>
                {theme.name}
            </div>
            <div
                className="text-2xl font-bold opacity-90"
                style={{ color: colors.page_fg }}>
                {theme.tagline}
            </div>
            <CopyThemeButton theme={theme} mode={mode} />
        </main>
    )
}

function RenderContent({ theme, mode }: { theme: theme; mode: 'dark' | 'light' }) {
    const colors = theme.color[mode];

    return (
        <main className="flex flex-col gap-10">
            {/* Colors pallate => renders color swatches preview */}
            <RenderColor colors={colors} mode={mode} />
            {/* Font suggestions => renders head and font names*/}
            <RenderFont theme={theme} mode={mode} />

            {/* Line break for sections */}
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-4" />

            {/* Use case section => render where the users can use this theme section */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold py-2 uppercase tracking-widest" style={{ color: colors.page_fg }}>
                    Built for
                </h2>
                <div className="flex flex-wrap gap-2 sec-font">
                    {theme.categories.map(category => (
                        <span
                            key={category}
                            className="text-lg px-2 py-1 rounded"
                            style={{ background: colors.accent_bg, color: colors.accent_fg }}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            {/* Usage */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold uppercase tracking-widest py-2" style={{ color: colors.page_fg }}>
                    Usage
                </h2>
                <div className="flex flex-wrap gap-2">
                    {theme.sites.map(site => (
                        <span
                            key={site}
                            className="text-lg px-4 py-1 rounded sec-font"
                            style={{ background: colors.surface_muted_bg, color: colors.surface_muted_fg }}
                        >
                            {site}
                        </span>
                    ))}
                </div>
            </div>
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-4" />
        </main>
    )
}

// Color swatches for the colors / necessary for the color swatches to work
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
            <h2 className="text-md uppercase tracking-widest" style={{ color: colors.surface_muted_fg }}>
                Palette | {mode}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {swatch.map(({ key, label, fgKey }) => {
                    const { ratio, rating } = getWCAGRating(colors[key], colors[fgKey]);
                    return (
                        <div
                            key={key}
                            className="flex flex-col gap-1 rounded-lg p-2 min-h-15 justify-center border"
                            style={{ background: colors[key], color: colors[fgKey], borderColor: colors.surface_fg }}
                        >
                            <span className="text-md font-medium">{label}</span>
                            <div className="flex gap-2 text-xs opacity-90 sec-font w-fit px-2 items-center">
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
            <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: colors.page_fg }}>
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
                    <div className="text-lg mt-1 sec-font">Head | {theme.font.main}</div>
                </div>
                <div>
                    <p className="text-lg font-medium sec-font" style={{ fontFamily: theme.font.body }}>
                        Body copy renders in {theme.font.body}, built for longer reading without losing the theme's character.
                    </p>
                    <div className="text-md mt-1 sec-font" style={{ color: colors.surface_muted_fg }}>Body | {theme.font.body}</div>
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
            <h2 className="text-xl font-extrabold uppercase tracking-widest" style={{ color: colors.page_fg }}>
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
                            <span className="text-xl font-medium">{label}</span>
                            <span className="sm:text-lg text-sm" style={{ color: colors.surface_muted_fg }}>{useCase}</span>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-4" />
        </div>
    );
}