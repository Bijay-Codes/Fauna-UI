import { useLocation } from "react-router-dom";
import { useState } from "react";
import { RenderCard } from "../components/RenderCard";
import { colorAnim } from "../Data/animalsData";
import { RenderSearch } from "../components/RenderSearch";
import { filterCategory } from "../utils/helping-util";
import { RenderFilter } from "./RenderFilters";
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
        <div className="relative flex flex-col gap-4 sm:gap-10 justify-center items-center max-w-300">
            <RenderSearch homepage={false} />
            <div className="px-4 self-start">
                <RenderFilter />
            </div>
            {subcategories && (
                <button
                    onClick={() => setSubcategories(undefined)}
                    className="text-sm px-3 py-1 rounded-full fixed bottom-2 right-2
                bg-(--warning-color)/80 text-(--warning-fg) hover:bg-(--warning-color) hover:text-(--warning-fg)"
                >
                    Clear filter ✕
                </button>
            )
            }

            <main className="flex flex-wrap justify-center gap-6
            overflow-hidden">
                {filtered.map(data => (
                    <RenderCard key={data.id} data={data} />
                ))}
            </main>
        </div >
    );
}