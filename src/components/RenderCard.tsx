// src/components/RenderCards.tsx
import { colorAnim } from "../Data/animalsData";
import { getBestTheme } from "../utils/helping-util";
import type { theme } from "../types";
import { Link } from "react-router-dom";

interface CardDataProps {
    data: theme;
}

export function RenderCards() {
    const data = getBestTheme(colorAnim);
    return (
        <section className="flex flex-col p-4">
            <div className="text-xl font-extrabold tracking-tight">Hot picks</div>
            <div className="flex flex-nowrap gap-4 overflow-auto h-fit py-4">
                {data.map(data => {
                    return (
                        <div key={data.id}>
                            <RenderCard data={data} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function RenderCard({ data }: CardDataProps) {
    const mode = data.defaultMode
    const {
        primary_bg, primary_fg,
        secondary_bg, secondary_fg,
        accent_bg, accent_fg,
        surface_muted_bg, surface_muted_fg,
        surface_bg, surface_fg } = data.color[mode];
    const colors = 'w-4 rounded aspect-square outline';

    return (
        <Link to={`/explore/${data.id}`} className="block no-underline">
            <div
                className="w-60 aspect-square rounded-lg text-center
                flex flex-col gap-4 p-4 justify-center items-center
                hover:-translate-y-0.5 border-(--primary-bg) hover:border-l-4 hover:border-r-4
                transition-all duration-100 ease-in sec-font"
                style={{
                    background: primary_bg,
                    color: primary_fg,
                    borderColor: accent_bg
                }}
            >
                <div className="text-2xl font-extrabold prim-font">{data.name}</div>
                <div className="flex flex-wrap text-xs gap-2 items-center justify-center">
                    <span>[{data.font.main}]</span>
                    <span>[{data.font.body}]</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className={colors} style={{ background: accent_bg, outlineColor: accent_fg }}></div>
                    <div className={colors} style={{ background: secondary_bg, outlineColor: secondary_fg }}></div>
                    <div className={colors} style={{ background: surface_bg, outlineColor: surface_fg }}></div>
                    <div className={colors} style={{ background: surface_muted_bg, outlineColor: surface_muted_fg }}></div>
                </div>
                <div className="sec-font" style={{ color: surface_muted_fg }}>
                    {data.categories.map((c, i) => {
                        if (i <= 3)
                            return (
                                <span key={i} className="text-sm px-0.5" style={{ color: surface_bg }}>
                                    [<span className="text-xs" style={{ color: primary_fg }}>{c}</span>]
                                </span>
                            );
                    })}
                </div>
            </div>
        </Link>
    );
}