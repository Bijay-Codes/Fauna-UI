import type { theme } from "../types";

export function filterCategory(arr: string[], list: theme[]): theme[] {
    return list.filter(data =>
        data.categories.some(cat => arr.includes(cat))
    );
}

