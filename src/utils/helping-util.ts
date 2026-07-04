import type { theme } from "../types";

export function filterCategory(arr: string[], list: theme[]): theme[] {
    // return the themes which satisfy the filtering criteria
    return list.filter(data =>
        data.categories.some(cat => arr.includes(cat))
    );
}

// not random number i picked what i liked the 4 best in my eyes
export function getBestTheme(colorAnim: theme[]) {
    const themeID = [18, 3, 5, 29];
    return colorAnim.filter(theme => themeID.includes(theme.id));
}
// limit the amount of tags or metadata shown
export function sliceMetaData(list: string[], qty: number) {
    return list.slice(0, qty);
}
// shows the structure of theme object
export function showStructure(colorAnim: theme[]) {
    console.log(colorAnim[0]);
}