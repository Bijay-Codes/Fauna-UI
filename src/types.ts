export type color = {
    page_bg: string;
    page_fg: string;
    surface_bg: string;
    surface_fg: string;
    surface_muted_bg: string;
    surface_muted_fg: string;
    primary_bg: string;
    primary_fg: string;
    secondary_bg: string;
    secondary_fg: string;
    accent_bg: string;
    accent_fg: string;
    success_color: string;
    success_fg: string;
    warning_color: string;
    warning_fg: string;
    danger_color: string;
    danger_fg: string;
}
export type font = {
    main: string;
    body: string;
}
export type theme = {
    id: number;
    defaultMode: 'light' | 'dark';
    categories: string[];
    sites: string[];
    name: string;
    color: {
        light: color;
        dark: color;
    },
    font: font;
}

