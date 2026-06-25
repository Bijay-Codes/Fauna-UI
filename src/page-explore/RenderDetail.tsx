import { useState } from "react";
import { colorAnim } from "../Data/animalsData";
import { Link, useParams } from "react-router-dom";
import { CopyThemeButton } from "../components/RenderCopy";

export function RenderDetail() {
    const { id } = useParams<{ id: string }>();
    const card = colorAnim.find(item => String(item.id) === id);
    const [mode, setMode] = useState(card?.defaultMode || 'dark');

    if (!card) {
        return (
            <section>
                <Link to='/explore' className="underline">← Go back to Explore</Link>
                <div className="mt-4">Theme not found.</div>
            </section>
        );
    }

    const { defaultMode, color, name } = card;
    const { page_bg, page_fg, accent_bg, accent_fg } = color[mode] || color[defaultMode];

    const toggle = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    }

    return (
        <section
            className="flex flex-col gap-6 px-4"
            style={{ background: page_bg, color: page_fg }}
        >
            <Link to='/explore' className="underline">← Go back to Explore</Link>
            <h1 className="text-2xl">Welcome to <span style={{ color: accent_bg }} className="font-extrabold">{name}</span> theme</h1>
            <div className="">
                <h2>Current Preview</h2>
                <button
                    className=""
                    style={{ background: accent_bg, color: accent_fg }}
                    onClick={toggle}
                >
                    [ {mode} ] Mode
                </button>
            </div>
            <article>
                <div className="">
                    Copy this theme <CopyThemeButton color={color} mode={mode} />
                </div>
            </article>
        </section>
    );
}