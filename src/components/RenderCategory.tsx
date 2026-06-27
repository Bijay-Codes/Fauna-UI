import { useNavigate } from "react-router-dom";
import { category } from "../Data/category";

export function RenderCategory({ homeview }: { homeview: boolean }) {
    const navigate = useNavigate();
    const tags = homeview ? 2 : 1;
    return (
        <section className="p-4 flex flex-col gap-4 w-full text-(--surface-muted-fg)/50">
            {homeview && <div className="text-xl font-extrabold text-(--page-fg) border-b border-(--border)/80">Category</div>}

            <div className="flex flex-wrap gap-4 text-xs">
                {category.map(c => (
                    <div
                        className="flex flex-col justify-center text-sm p-2
                        hover:bg-(--primary-bg)/80 hover:text-(--primary-fg)
                        rounded-lg border border-(--border)/30 cursor-pointer"
                        key={c.category}
                        onClick={() => navigate("/explore", { state: { subcategories: c.subcategories } })}
                    >
                        <div className="font-medium  text-(--page-fg)">{c.category} <span>↗</span></div>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {c.subcategories.map((sc, i) => i <= tags && <span key={i}>[{sc}]</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}