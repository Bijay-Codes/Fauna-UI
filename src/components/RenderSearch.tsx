import { useState } from "react"
import type { theme } from "../types";
import { colorAnim } from "../Data/animalsData";
import { useNavigate } from "react-router-dom";
export function RenderSearch({ homepage }: { homepage: boolean }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    function handleSearch(text: string) {
        const querry = text.trim()
        if (!querry) return;
        const normalText = querry.toLowerCase();
        const id = findTheme(normalText);
        navigate(`/explore/${id}`);
        setText('');
    }

    return (
        <div className={`rounded-lg m-auto active:outline-0 max-w-250 min-w-[70%] grid grid-cols-[1fr_auto] p-2 sec-font
            ${homepage ? '' : 'sticky top-0 z-40 bg-(--page-bg)/70 border-b border-(--primary-bg)'}`}>
            <input type="search"
                value={text}
                onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        handleSearch(text);
                }}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search"
                className="bg-(--surface-bg) text-(--surface-fg) border border-(--surface-muted-bg) text-sm
                 outline-none rounded-l-lg rounded pl-2 w-full mask-r-from-80% p-2
                 transition-colors duration-500 ease-in-out" />
            <button
                onClick={() => {
                    handleSearch(text);
                }}
                className="bg-(--surface-bg) text-(--surface-fg) text-xs sm:text-md prim-font
                transition-colors duration-500 ease-in-out
                 rounded-br-2xl rounded py-2 px-4"
            >Search</button>
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