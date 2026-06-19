import { useTheme } from "./themeManager";
import { NavLink } from "react-router-dom";

export function RenderNav() {
    const { toggle } = useTheme();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-2 py-1 rounded-lg transition-colors ${isActive ? "bg-(--primary-bg) text-(--primary-fg)" : "hover:bg-(--surface-muted-bg)"
        }`;

    return (
        <nav className="bg-(--surface-bg)
         text-(--surface-fg) outline-2 outline-(--accent-bg)
         h-[clamp(80px,8vh,100px)] flex place-items-end sec-font font-bold">
            <ul className="flex gap-2 px-2 w-full items-center">
                <li className="mr-auto text-4xl tracking-tighter font-extrabold prim-font">
                    <NavLink to="/" end>
                        Fauna<span className="text-(--primary-bg)">UI</span>
                    </NavLink>
                </li>
                <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
                <li><NavLink to="/explore" className={linkClass}>Explore</NavLink></li>
                <li><NavLink to="/community" className={linkClass}>Community</NavLink></li>
                <li>
                    <button
                        className="bg-(--primary-bg) text-(--primary-fg) rounded-full duration-300 ease-in-out"
                        onClick={toggle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <g fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1">
                                <path d="M12 18.308a6.308 6.308 0 1 0 0-12.616a6.308 6.308 0 0 0 0 12.616Z" />
                                <path d="M17.974 14.031a6.308 6.308 0 0 1-8.005-8.005a6.308 6.308 0 1 0 8.005 8.005ZM16.46 16.46l2.788 2.788M18.308 12h3.942m-3.002-7.248L16.46 7.54M12 1.75v3.942M7.54 7.54L4.752 4.752M5.692 12H1.75m5.79 4.46l-2.788 2.788m7.248-.94v3.942" />
                            </g>
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}