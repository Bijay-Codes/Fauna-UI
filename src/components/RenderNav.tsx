import { useTheme } from "./themeManager";
import { NavLink } from "react-router-dom";

export function RenderNav() {
    const { theme, toggle } = useTheme(); // theme switcher {theme current, set theme current}
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `rounded-lg transition-colors text-sm sm:text-lg px-3 py-1
        ${isActive ? "bg-(--primary-bg) text-(--primary-fg) font-extrabold"
            : "hover:bg-(--surface-muted-bg)"}`;

    return (
        <nav className="sm:h-20 w-full border-b border-(--accent-bg)/30 prim-font">
            <div className="m-auto flex items-center py-4 sm:px-10 p-2 mt-2">
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
                            className="bg-(--primary-bg) text-(--primary-fg)
                            aspect-square w-6 sm:w-8 rounded-t-lg text-sm sm:text-xl rounded p-1
                            duration-300 ease-in-out"
                            onClick={toggle}
                        >{theme === 'dark' ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z" />
                                <path d="M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.5 5.5 0 0 1 1.055.209A3.6 3.6 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.58 3.58 0 0 1-2.241.634q.244.477.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z" />
                                <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                            </svg>}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

