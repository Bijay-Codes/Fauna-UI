import { colorAnim } from "../Data/animalsData";
import type { theme } from "../types";

interface cardData {
    data: theme;
}

export function RenderCards() {
    return (
        <section className="text-(--text-prim) px-4 min-h-100">
            <div>Featured</div>
            <div className="flex flex-nowrap overflow-auto gap-4 justify-evenly">
                {colorAnim.map(data => {
                    return (
                        <div key={data.id}>
                            <RenderCard data={data} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
function RenderCard({ data }: cardData) {
    const colors = 'w-4 rounded aspect-square outline';
    return (
        <div className='flex flex-col items-center gap-2
         min-h-75 aspect-square p-2 rounded-xl'
            style={{
                background: data.color[data.defaultMode].primary_bg,
                color: data.color[data.defaultMode].primary_fg
            }}>
            <div className="text-2xl  font-extrabold">{data.name}</div>
            <div className="flex flex-wrap gap-2 items-center justify-center font-light">
                <span>Fonts࠷ </span>
                <span>[{data.font.main}]</span>
                <span>[{data.font.body}]</span>
            </div>
            <div className="flex gap-2">
                <div className={colors}
                    style={{ background: data.color[data.defaultMode].accent_bg }}>
                </div>
                <div className={colors}
                    style={{ background: data.color[data.defaultMode].secondary_bg }}>
                </div>
                <div className={colors}
                    style={{ background: data.color[data.defaultMode].surface_bg }}>
                </div>
                <div className={colors}
                    style={{ background: data.color[data.defaultMode].surface_muted_bg }}>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center">
                {
                    data.categories.map((c, i) => {
                        if (i <= 3)
                            return (
                                <span key={i}
                                    style={{ color: data.color[data.defaultMode].accent_bg }}>
                                    [<span
                                        className="text-sm"
                                        style={{ color: data.color[data.defaultMode].primary_fg }}>
                                        {c}
                                    </span>]
                                </span>
                            )
                    })
                }
            </div>
        </div>
    )
}