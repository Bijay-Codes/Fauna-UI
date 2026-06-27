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
        <div className="relative flex flex-col sm:gap-4 md:gap-10 w-full items-center max-w-300">

            <RenderSearch homepage={false} />
            <div className="p-2 md:px-10 sm:absolute sm:top-0 self-start">
                <RenderFilter
                    activeFilters={subcategories}
                    onChangeFilters={setSubcategories}
                />
            </div>


            {subcategories && (
                <button
                    onClick={() => setSubcategories(undefined)}
                    className="text-sm px-3 py-1 rounded-full fixed bottom-2 right-2 z-30
                bg-(--warning-color)/80 text-(--warning-fg) hover:bg-(--warning-color) hover:text-(--warning-fg)"
                >
                    Clear filter ✕
                </button>
            )}
            <main className="flex flex-wrap py-4 justify-center gap-6 overflow-hidden">
                {filtered.map(data => (
                    <RenderCard key={data.id} data={data} />
                ))}
            </main>
        </div>
    );
}