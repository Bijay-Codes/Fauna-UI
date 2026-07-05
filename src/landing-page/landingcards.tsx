import { getBestTheme } from "../utils/helping-util";
import { colorAnim } from "../Data/animalsData"
import { sliceMetaData } from "../utils/helping-util";
import { Link } from "react-router-dom";
import type { theme } from "../types";
export function RenderLandingCards() {
    const cardsToRender = getBestTheme(colorAnim);
    return (
        <section className="
        bg-(--surface-bg)/30 border-(--border)/40 border-t border-l border-r 
        w-full rounded-lg">
            <h3 className="p-4 text-lg font-bold border-b border-(--accent-bg)">
                Pick a theme — see it work
            </h3>
            <div title="See this theme applied to a page click visit"
                className="flex gap-4 overflow-auto custom-scroll p-4">
                {cardsToRender.map(card => {
                    return (
                        <RenderThemeSwatch key={card.name} data={card} />
                    )
                })}
            </div>
        </section>
    )
}

function RenderThemeSwatch({ data }: { data: theme }) {
    const mode = data.defaultMode;
    const color = data.color[mode];
    const colorSwatch = 'w-4 h-4 border rounded';
    return (
        <div className="w-60 sm:w-70 justify-center aspect-square shrink-0
        flex flex-col items-center gap-2
        rounded p-4 shadow"
            style={{
                background: color.primary_bg,
                color: color.primary_fg
            }}>
            <h1 className="text-lg sec-font font-extrabold">{data.name}</h1>
            <div className="text-md sec-font text-center flex gap-2 flex-wrap justify-center">
                {/* Fonts of theme */}
                <h2>[{data.font.main}]</h2>
                <h2>[{data.font.body}]</h2>
            </div>
            <div className="flex gap-2">
                {/* Color swatches of the card */}
                <span
                    className={colorSwatch}
                    style={{
                        background: color.accent_bg,
                        borderColor: color.accent_fg
                    }}></span>
                <span
                    className={colorSwatch}
                    style={{
                        background: color.secondary_bg,
                        borderColor: color.secondary_fg
                    }}></span>
                <span
                    className={colorSwatch}
                    style={{
                        background: color.surface_bg,
                        borderColor: color.surface_fg
                    }}></span>
            </div>
            <div className="text-md sec-font flex flex-wrap gap-x-1">
                {sliceMetaData(data.categories, 2).map(c =>
                    // answers the where to use this theme question
                    <span key={c}>[ {c} ]</span>
                )}
            </div>
            <Link to={`/explore/${data.id}`} className="px-4 rounded hover:opacity-90 text-lg border"
                style={{
                    background: color.accent_bg,
                    color: color.accent_fg,
                    borderColor: color.accent_fg
                }}
            >Visit</Link>
        </div>
    )
};