import { useNavigate } from "react-router-dom";
import { category } from "../Data/category";
import { useEffect, useState } from "react";

// Too simple to explain, use the colors we have and link to the explore page
//  used for filtering by category mechanism
export function RenderCategory() {
    const navigate = useNavigate();
    const getTagCount = () => (window.innerWidth <= 700 ? 3 : window.innerWidth <= 1000 ? 4 : 5);
    const [tags, setTags] = useState(() => getTagCount());

    useEffect(() => {
        const onResize = () => setTags(getTagCount())
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])
    return (
        <section className="p-4 flex flex-col gap-4 w-full max-w-400 text-(--surface-muted-fg)/50">
            <div className="text-2xl font-extrabold text-(--page-fg) border-b border-(--border)/80">
                Category
            </div>
            <div className="flex flex-wrap flex-row gap-4 sec-font
            sm:grid sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
                {category.map(c => (
                    <div title="Filter themes by this category"
                        className="flex flex-col justify-center text-sm p-2 h-full w-full
                        hover:bg-(--primary-bg) hover:text-(--primary-fg) bg-(--surface-muted-bg)
                        rounded-lg border border-(--border)/30 cursor-pointer"
                        key={c.category}
                        onClick={() => navigate("/explore", { state: { subcategories: c.subcategories } })}
                    >
                        <div className="font-medium text-md sm:text-lg text-(--page-fg)">{c.category} <span>↗</span></div>
                        <div className="flex flex-wrap gap-2 opacity-80 text-(--page-fg) text-sm">
                            {c.subcategories.map((sc, i) => i < tags && <span key={sc}>[ {sc} ]</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}