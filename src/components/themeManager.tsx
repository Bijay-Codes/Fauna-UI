import { useEffect, useState } from "react";

type Theme = 'light' | 'dark';
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) ??
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
    return { theme, toggle };
}