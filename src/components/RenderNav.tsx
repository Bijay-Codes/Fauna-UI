import { useTheme } from "./themeManager";
import { NavLink } from "react-router-dom";

export function RenderNav() {
    const { toggle } = useTheme();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `rounded-lg transition-colors text-xs p-1
        ${isActive ? "bg-(--primary-bg) text-(--primary-fg)"
            : "hover:bg-(--surface-muted-bg)"}`;

    return (
        <nav className="h-13 w-full border-b border-(--accent-bg)/30">
            <div className="m-auto flex items-center py-4 sm:px-10 p-2">
                <ul className="flex gap-4 items-center w-full">
                    <li>
                        <NavLink to="/" className='text-sm sm:text-2xl tracking-widest'>
                            Fauna<span className="text-(--primary-bg)">UI</span>
                        </NavLink>
                    </li>
                    <li className="flex-1"></li>
                    <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                    <li><NavLink to="/explore" className={linkClass}>Explore</NavLink></li>
                    <button
                        className="bg-(--primary-bg) rounded-t-lg rounded text-(--primary-fg) duration-300 ease-in-out p-1"
                        onClick={toggle}
                    >⛯</button>
                </ul>
            </div>
        </nav>
    );
}