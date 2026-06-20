import { useLocation } from "react-router-dom";
import { useState } from "react";
import { RenderCard } from "../components/RenderCard";
import { RenderCategory } from "../components/RenderCategory";
import { colorAnim } from "../Data/animalsData";
import { RenderSearch } from "../components/RenderSearch";
import { filterCategory } from "../utils/helping-util";

export function RenderExplore() {
    const location = useLocation();
    const initial = location.state?.subcategories as string[] | undefined;

    const [subcategories, setSubcategories] = useState(initial);
    const [prevInitial, setPrevInitial] = useState(initial);

    if (initial !== prevInitial) {
        setPrevInitial(initial);
        setSubcategories(initial);
    }

    const filtered = subcategories ? filterCategory(subcategories, colorAnim) : colorAnim;

    return (
        <div className="flex flex-col items-center gap-0 relative">
            <RenderSearch />
            <RenderCategory homeview={false} />

            {subcategories && (
                <button
                    onClick={() => setSubcategories(undefined)}
                    className="text-sm px-3 py-1 rounded-full fixed bottom-2 right-2
                    bg-(--warning-color)/80 text-(--warning-fg) hover:bg-(--warning-color) hover:text-(--warning-fg)"
                >
                    Clear filter ✕
                </button>
            )}

            <main className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-2 mt-6 max-w-[80%] m-auto">
                {filtered.map(data => (
                    <RenderCard key={data.id} data={data} />
                ))}
            </main>
        </div>
    );
}