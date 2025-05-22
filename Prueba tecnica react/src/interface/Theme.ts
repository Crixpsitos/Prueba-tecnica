export type ThemeContextType = "light" | "dark";

export interface ThemeContextProps {
    theme: ThemeContextType,
    toggleTheme: () => void;
}