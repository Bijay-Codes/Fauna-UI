import { useTheme } from "./themeManager";
import { NavLink } from "react-router-dom";

export function RenderNav() {
    const { toggle } = useTheme();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-1 sm:px-2 py-1 rounded-lg transition-colors text-[clamp(0.5rem,5vw,1rem)]
        ${isActive ? "bg-(--primary-bg) text-(--primary-fg)"
            : "hover:bg-(--surface-muted-bg)"}`;

    return (
        <nav className="bg-(--surface-bg)
             text-(--surface-fg) outline-2 outline-(--accent-bg)
             h-[clamp(50px,8vh,100px)] flex place-items-end sec-font font-bold">
            <ul className="flex gap-1 sm:gap-2 px-1 sm:px-2 w-full items-center">
                <li className="mr-auto text-[clamp(1.6rem,4vw,2rem)] tracking-tighter font-extrabold prim-font whitespace-nowrap">
                    <NavLink to="/" end>
                        Fauna<span className="text-(--primary-bg)">UI</span>
                    </NavLink>
                </li>
                <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
                <li><NavLink to="/explore" className={linkClass}>Explore</NavLink></li>
                <li>
                    <button
                        className="bg-(--primary-bg) rounded-t-lg rounded text-(--primary-fg) duration-300 ease-in-out p-1"
                        onClick={toggle}
                    >⛯</button>
                </li>
            </ul>
        </nav>
    );
}