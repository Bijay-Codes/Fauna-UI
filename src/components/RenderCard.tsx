// src/components/RenderCards.tsx
import { colorAnim } from "../Data/animalsData";
import { getBestTheme } from "../utils/helping-util";
import type { theme } from "../types";
import { Link } from "react-router-dom";

interface CardDataProps {
    data: theme;
}

// [animal,meaw,blah,blah] => card max 4 as of now card =>
/*
_____________________
| name              |
| fonts             |   
| colors swatch     |   x 4 or more depending on how many we put in array data[]
| category          |
_____________________
*/
export function RenderCards() {
    const data = getBestTheme(colorAnim);
    return (
        <section className="flex flex-col p-4">
            <div className="text-2xl font-extrabold tracking-tight">Hot picks</div>
            <div className="flex flex-nowrap gap-4 overflow-auto h-fit py-4">
                {data.map(data => {
                    return (
                        <div key={data.id} className="z-10">
                            <RenderCard data={data} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

// Rensonsible for rendering card in a good format and inject colors from the theme object
/* data is theme {
    color:{
        light:{colors,blah, blah},
        dark:{colors,blah,blah}
        }
    }
*/
// also go to explore on click of card using link...
export function RenderCard({ data }: CardDataProps) {
    const mode = data.defaultMode
    const {
        secondary_bg, secondary_fg,
        accent_bg, accent_fg,
        surface_muted_bg, surface_muted_fg,
        surface_bg, surface_fg } = data.color[mode];

    const colors = 'w-5 h-5 rounded aspect-square outline';
    const categoryUpperlimit = 3;
    return (
        <Link title="Click to visit" to={`/explore/${data.id}`} className="block no-underline">
            <div
                className="w-65 sm:w-80 aspect-square rounded-lg text-center
                grid p-4
                hover:-translate-y-0.5 hover:z-20 border-(--primary-bg) hover:outline hover:outline-offset-4
                transition-all duration-100 ease-in sec-font bg-(--surface-bg)"
                style={{
                    // background: surface_bg,
                    // color: surface_fg,
                    outlineColor: accent_bg
                }}
            >
                <div className="text-2xl font-extrabold prim-font text-left">{data.name}</div>
                {/* Fonts */}
                <div className="flex flex-wrap gap-2 items-center">
                    <h1 className="text-md font-bold">Fonts :</h1>
                    <div className="flex gap-1 text-sm">
                        <span>[ {data.font.main},</span>
                        <span>{data.font.body} ]</span>
                    </div>
                </div>
                {/* color swatch */}
                <div className="flex flex-wrap gap-2">
                    <h2 className="text-md text-(--surface-fg) font-bold">Colors</h2>
                    <div className="flex flex-wrap gap-2">
                        <div className={colors} style={{ background: accent_bg, outlineColor: accent_fg }}></div>
                        <div className={colors} style={{ background: secondary_bg, outlineColor: secondary_fg }}></div>
                        <div className={colors} style={{ background: surface_bg, outlineColor: surface_fg }}></div>
                        <div className={colors} style={{ background: surface_muted_bg, outlineColor: surface_muted_fg }}></div>
                    </div>
                </div>
                {/* tags to be shown */}
                <div className="sec-font text-left flex flex-wrap items-center" style={{ color: surface_muted_fg }}>
                    <h3 className="font-bold text-(--surface-muted-fg) pr-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.categories.slice(0, categoryUpperlimit + 1).map((c, i) => (
                            <span
                                key={c + i}
                                className="text-sm px-2 py-0.5 rounded h-fit capitalize transition-colors hover:opacity-80 cursor-default"
                                style={{ background: accent_bg, color: accent_fg }}
                            >
                                {c}
                            </span>
                        ))}
                        {data.categories.length > categoryUpperlimit + 1 && (
                            <span
                                className="text-sm px-2 py-0.5 rounded h-fit"
                                style={{ background: surface_bg, color: surface_fg, opacity: 0.6 }}
                            >
                                +{data.categories.length - (categoryUpperlimit + 1)} more...
                            </span>
                        )}
                    </div>

                </div>
                <hr className="opacity-40 m-2" />
                <span className="text-xs sm:text-sm opacity-60">Click card to visit &gt;&gt;</span>
            </div>
        </Link >
    );
}