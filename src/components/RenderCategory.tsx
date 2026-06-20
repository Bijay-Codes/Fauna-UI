import { useNavigate } from "react-router-dom";
import { category } from "../Data/category";

export function RenderCategory({ homeview }: { homeview: boolean }) {
    const navigate = useNavigate();
    const tags = homeview ? 2 : 1;
    return (
        <section className="mt-4 overflow-x-scroll">
            {homeview && <div className="text-2xl p-2">Category</div>}
            <div className={`flex ${homeview ? 'overflow-x-scroll flex-wrap' : ''} gap-4 px-4 items-center justify-center`}>
                {category.map(c => (
                    <div
                        key={c.category}
                        onClick={() => navigate("/explore", { state: { subcategories: c.subcategories } })}
                        className={`bg-(--secondary-bg) text-(--secondary-fg)
              rounded-2xl text-md p-2 hover:bg-(--primary-bg) hover:text-(--primary-fg)
              text-left`}
                    >
                        <div>{c.category} <span>↗</span></div>
                        <div className="flex gap-2 text-xs">
                            {c.subcategories.map((sc, i) => i <= tags && <span key={i}>[{sc}]</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}