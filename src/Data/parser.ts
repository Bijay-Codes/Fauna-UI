import { jsonData } from "./animalsData";
export const animalData: Animal[] = jsonData;
type Animal = {
    id: number,
    name: string,
    typography: CheckTypography,
    tokens: {
        light: CheckTheme,
        dark: CheckTheme
    },
    status: CheckStatus
}

type CheckTypography = {
    heading: string,
    body: string,
}
type CheckTheme = {
    bg: string,
    surface: string,
    "surface-raised": string,
    "surface-sunken": string,
    border: string,
    overlay: string,
    text: string,
    "text-muted": string,
    "text-subtle": string,
    accent: string,
    "accent-secondary": string,
    "accent-fg": string,
    muted: string,
    "muted-fg": string
}
type CheckStatus = {
    success: string,
    error: string,
    warning: string,
    info: string
}

console.log(animalData);
