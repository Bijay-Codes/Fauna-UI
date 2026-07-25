import { useMemo, useState } from "react"
import type { theme } from "../types";
import { colorAnim } from "../Data/animalsData";
import { useNavigate } from "react-router-dom";
export function RenderSearch({ homepage }: { homepage: boolean }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const totalNames = colorAnim.map(anim => anim.name.toLowerCase());
    const filtered = useMemo(
        () => totalNames.filter(name => name.includes(text) && text),
        [text, totalNames]
    );

    // Search function
    function handleSearch(text: string) {
        const querry = text.trim();
        if (!querry) return;
        const normalText = querry.toLowerCase();
        const id = findTheme(normalText);
        navigate(`/explore/${id}`);
        setText('');
    }

    return (
        <div
            className={`rounded-lg m-auto active:outline-0 max-w-250 min-w-[70%] grid grid-cols-[1fr_auto]
                 p-2 sec-font relative
            ${homepage ? '' : 'sticky top-0 z-40 bg-(--page-bg)/70 border-b border-(--primary-bg)'}`}>
            <input type="search"
                value={text}
                onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        handleSearch(text);
                }}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search"
                className="bg-(--surface-bg) text-(--surface-fg) border border-(--surface-muted-bg) text-lg sm:text-2xl
                hover:bg-(--secondary-bg)/50 focus:bg-(--secondary-bg) focus:text-(--secondary-fg)
                outline-none rounded-l-lg rounded pl-2 w-full mask-r-from-80% p-2
                transition-colors duration-500 ease-in-out" />
            <button
                onClick={() => {
                    handleSearch(text);
                }}
                className="bg-(--surface-bg) text-(--surface-fg) text-lg sm:text-xl
                hover:bg-(--secondary-bg) hover:text-(--secondary-fg) active:bg-(--accent-bg) active:text-(--accent-fg)
                transition-colors duration-300 ease-in-out
                rounded-br-2xl rounded py-1 sm:py-2 px-4 prim-font"
            >Search</button>
            {filtered.length > 0 &&
                <SearchUtility filtered={filtered} handleSearch={handleSearch} />
            }
        </div>
    )
}

function findTheme(text: string) {
    const list = colorAnim;
    const theme = list.find((data: theme) => {
        return data.name.toLowerCase() === text || data.id === Number(text);
    })
    return theme?.id;
}

// make a list of all animal names in lowercase
// compare the current text in input from all the animals list
// set the filtered array to the list
// set a function that renders all the list items
function SearchUtility({ filtered, handleSearch }: { filtered: string[], handleSearch: (name: string) => void }) {
    return (
        <div className="flex flex-col gap-3 bg-(--secondary-bg) rounded-lg m-2 w-fit p-2 sm:pr-4 absolute top-full z-50 outline outline-(--surface-muted-fg)">
            {filtered.map((name, i) =>
            (i < 4 &&
                <span key={name + i} className="capitalize hover:bg-(--accent-bg) hover:text-(--accent-fg) p-2 rounded-lg"
                    onClick={() => handleSearch(name)}>
                    {name}
                </span>))}
        </div>
    )
}
