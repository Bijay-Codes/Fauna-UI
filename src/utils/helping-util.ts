import type { theme } from "../types";

export function filterCategory(arr: string[], list: theme[]): theme[] {
    return list.filter(data =>
        data.categories.some(cat => arr.includes(cat))
    );
}

export function getBestTheme(colorAnim: theme[]) {
    const themeID = [18, 3, 5, 29];
    return colorAnim.filter(theme => themeID.includes(theme.id));
}

export function sliceMetaData(list: string[], qty: number) {
    return list.slice(0, qty);
}