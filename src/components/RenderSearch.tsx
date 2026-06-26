import { useState } from "react"
import type { theme } from "../types";
import { colorAnim } from "../Data/animalsData";
import { useNavigate } from "react-router-dom";
export function RenderSearch({ homepage }: { homepage: boolean }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    function handleSearch(text: string) {
        if (!text) return;
        const normalText = text.trim().toLowerCase();
        const id = findTheme(normalText);
        navigate(`/explore/${id}`);
        setText('');
    }

    return (
        <div className={`rounded-lg m-auto active:outline-0 max-w-250 min-w-[70%] grid grid-cols-[1fr_auto] p-2
            ${homepage ? '' : 'sticky top-0 z-10 bg-(--page-bg)/40 border-b border-(--primary-bg)'}`}>
            <input type="search"
                value={text}
                onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        handleSearch(text);
                }}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search"
                className="bg-(--surface-bg) border border-(--surface-muted-bg) focus:bg-(--accent-bg)/40 hover:bg-(--accent-bg)/20
                 outline-none rounded-l-lg rounded pl-2 w-full mask-r-from-90% p-2
                 transition-colors duration-500 ease-in-out" />
            <button

                onClick={() => {
                    handleSearch(text);
                }}
                className="bg-(--surface-bg) text-(--surface-fg) hover:bg-(--accent-bg) hover:text-(--accent-fg) active:bg-(--accent-bg)/40
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