import { useTheme } from "./themeManager";
import { NavLink } from "react-router-dom";

export function RenderNav() {
    const { theme, toggle } = useTheme(); // theme switcher {theme current, set theme current}
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `rounded-lg transition-colors text-sm sm:text-lg p-1
        ${isActive ? "bg-(--primary-bg) text-(--primary-fg) font-extrabold"
            : "hover:bg-(--surface-muted-bg)"}`;

    return (
        <nav className="sm:h-20 w-full border-b border-(--accent-bg)/30 prim-font">
            <div className="m-auto flex items-center py-4 sm:px-10 p-2 max-w-400">
                <ul className="flex gap-2 sm:gap-4 items-center w-full">
                    <li title="Visit landing page">
                        <NavLink to="/intro" className='text-md sm:text-2xl tracking-widest'>
                            {/* go to landing page */}
                            {/* uncomment if image is acting wierd Fauna<span className="text-(--primary-bg)">UI</span> */}
                            <img key={theme} // this key is important for animating the logo text
                                src={`/assets/Text${theme}.svg`}
                                loading='lazy'
                                alt="Fauna UI"
                                className="w-30 logo" />
                        </NavLink>
                    </li>
                    <li className="flex-1"></li>
                    <li><NavLink to="/" className={linkClass}>Home</NavLink></li>{/* link to homepage */}
                    <li><NavLink to="/explore" className={linkClass}>Explore</NavLink></li>{/* link to explore */}

                    {/* dark mode? light mode? theme toggle button resides below ˅ */}
                    <li>
                        <button title="Toggle dark/light mode"
                            className="bg-(--primary-bg) aspect-square w-6 sm:w-8 rounded-t-lg text-sm sm:text-xl rounded text-(--primary-fg) duration-300 ease-in-out"
                            onClick={toggle}
                        ><span className="text-xl">⛯</span></button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}