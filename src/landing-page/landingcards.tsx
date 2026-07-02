import { getBestTheme } from "../utils/helping-util";
import { colorAnim } from "../Data/animalsData"
import { sliceMetaData } from "../utils/helping-util";
import type { theme } from "../types";
// import { useState } from "react";
export function RenderLandingCards() {
    // const [activeTheme, setTheme] = useState(null);
    const cardsToRender = getBestTheme(colorAnim);
    return (
        <section className="
        bg-(--surface-bg)/30 border-(--border)/40 border-t border-l border-r 
        w-full rounded-lg">
            <h3 className="p-4 underline underline-offset-8">Live theme Preview</h3>
            <div className="flex gap-4 overflow-auto p-4">
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
        <div className="w-50 aspect-square shrink-0
        flex flex-col items-center gap-2
        rounded p-4 shadow"
            style={{
                background: color.primary_bg,
                color: color.primary_fg
            }}>
            <h1 className="text-md sec-font font-extrabold">{data.name}</h1>
            <div className="text-xs sec-font text-center">
                <h2 className="opacity-90">{data.font.main}</h2>
                <h2 className="opacity-80">{data.font.body}</h2>
            </div>
            <h2></h2>
            <div className="flex gap-2">
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
            <div className="text-xs sec-font flex flex-wrap m-auto gap-x-1 opacity-70">
                {sliceMetaData(data.categories, 2).map(c =>
                    <span key={c}>[ {c} ]</span>
                )}
            </div>
            <button className="px-4 rounded"
                style={{
                    background: color.accent_bg,
                    color: color.accent_fg
                }}
            >Apply</button>
        </div>
    )
};