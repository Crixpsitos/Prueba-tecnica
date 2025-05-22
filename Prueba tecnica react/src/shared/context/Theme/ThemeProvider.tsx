// pequeño contexto para los temas blanco y negro de la aplicacion

import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

export type ThemeContextType = "light" | "dark";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): ThemeContextType => {
    if (typeof window !== "undefined") {
      const Theme = localStorage.getItem("theme") as ThemeContextType | null;
      if (Theme) return Theme;

      const prefersTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      return prefersTheme;
    }
    return "dark";
  };

  const [theme, setTheme] = useState<ThemeContextType>(getInitialTheme());

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};