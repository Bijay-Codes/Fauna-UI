import { useTheme } from "./themeManager";
export function RenderNav() {
    const { theme, toggle } = useTheme();
    return (
        <nav className="bg-(--surface-bg)
         text-(--surface-fg) outline-2 outline-(--accent-bg)
         h-[clamp(80px,8vh,100px)] flex place-items-end sec-font font-bold">
            <ul className="flex gap-2 px-2 w-full items-center">
                <li className="mr-auto text-4xl tracking-tighter font-extrabold prim-font">
                    Fauna<span className="text-(--primary-bg)">UI</span>
                </li>
                <li>Home</li>
                <li>Explore</li>
                <li>Community</li>
                <li><button
                    className={`bg-(--primary-bg) px-1 rounded-full w-12
                         ${theme === 'dark' ? 'text-left' : 'text-right'}
                         duration-300 ease-in-out`}
                    onClick={toggle}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button></li>
            </ul>
        </nav >
    )
}