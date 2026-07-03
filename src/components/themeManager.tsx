import { useEffect, useState } from "react";

type ThemeMode = 'light' | 'dark';
export function useTheme() {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        return (localStorage.getItem('theme') as ThemeMode) ??// is there theme? in localstorage if it has then use or
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        // use the theme prefered by the browser/user if dark then use dark or light
    });
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);//set current theme in localstorage
    }, [theme]);
    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
    return { theme, toggle };
}