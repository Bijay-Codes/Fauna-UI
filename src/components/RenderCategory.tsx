import { category } from "../Data/category"
export function RenderCategory() {
    return (
        <section className="px-4">
            <div className="text-2xl p-2">Category</div>
            <div className="flex flex-wrap gap-4 px-4">
                {
                    category.map(c => {
                        return (
                            <div key={c.category}
                                className="bg-(--secondary-bg) text-(--secondary-fg)
                            rounded-2xl leading-6 text-md w-fill p-4 hover:bg-(--primary-bg) hover:text-(--primary-fg)
                            text-left">
                                <div
                                >{c.category} <span>↗</span></div>
                                <div className="flex gap-2 text-xs">{c.subcategories.map((sc, i) =>
                                    i <= 2 && <span key={i}>[{sc}]</span>)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}