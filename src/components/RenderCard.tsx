// src/components/RenderCards.tsx
import { colorAnim } from "../Data/animalsData";
import { useState } from "react";
import type { theme } from "../types";
import { Link } from "react-router-dom";

interface CardDataProps {
    data: theme;
}

export function RenderCards() {
    return (
        <section className="text-(--text-prim) p-4">
            <div className="text-2xl p-2">Hot picks</div>
            <div className="flex flex-nowrap items-center overflow-x-auto gap-4">
                {colorAnim.map(data => {
                    return (
                        <div key={data.id} className="h-full">
                            <RenderCard data={data} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function RenderCard({ data }: CardDataProps) {
    const [mode, setMode] = useState(data.defaultMode);
    const { primary_bg, primary_fg, secondary_bg, accent_bg, surface_muted_bg, surface_bg } = data.color[mode];
    const colors = 'w-4 rounded aspect-square outline';

    return (
        <Link to={`/explore/${data.id}`} className="block no-underline">
            <div
                onClick={() => {
                    setMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                className='flex flex-col items-center gap-2 hover:translate-y-1
                min-w-70 aspect-square p-2 rounded-xl transition-all duration-200 cursor-pointer'
                style={{
                    background: primary_bg,
                    color: primary_fg
                }}
            >
                <div className="text-2xl font-extrabold">{data.name}</div>
                <div className="flex flex-wrap gap-2 items-center justify-center font-light">
                    <span>Fonts </span>
                    <span>[{data.font.main}]</span>
                    <span>[{data.font.body}]</span>
                </div>
                <div className="flex gap-2">
                    <div className={colors} style={{ background: accent_bg }}></div>
                    <div className={colors} style={{ background: secondary_bg }}></div>
                    <div className={colors} style={{ background: surface_bg }}></div>
                    <div className={colors} style={{ background: surface_muted_bg }}></div>
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-center">
                    {data.categories.map((c, i) => {
                        if (i <= 3)
                            return (
                                <span key={i} style={{ color: accent_bg }}>
                                    [<span className="text-sm" style={{ color: primary_fg }}>{c}</span>]
                                </span>
                            );
                    })}
                </div>
            </div>
        </Link>
    );
}