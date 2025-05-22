import { createContext } from "react";
import type { ThemeContextProps } from "@/interface/Theme";

export const ThemeContext = createContext<ThemeContextProps | null>(null);
