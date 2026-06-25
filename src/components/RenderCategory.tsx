import { useNavigate } from "react-router-dom";
import { category } from "../Data/category";

export function RenderCategory({ homeview }: { homeview: boolean }) {
    const navigate = useNavigate();
    const tags = homeview ? 2 : 1;
    return (
        <section className="p-4 flex flex-col gap-4 w-full">
            {homeview && <div className="text-xl font-extrabold text-(--primary-bg)">Category</div>}

            {/* Added flex-wrap here so items drop down when space runs out */}
            <div className="flex flex-wrap gap-4 text-xs">
                {category.map(c => (
                    <div
                        className="flex flex-col justify-center text-sm hover:bg-(--primary-bg) hover:text-(--primary-fg)
                        p-4 rounded-lg border border-(--border) cursor-pointer"
                        key={c.category}
                        onClick={() => navigate("/explore", { state: { subcategories: c.subcategories } })}
                    >
                        <div className="font-medium">{c.category} <span>↗</span></div>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {c.subcategories.map((sc, i) => i <= tags && <span key={i}>[{sc}]</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}