import type { ReactNode } from "react";
import { MoviesProvider } from "../context/movies/MoviesProvider";
import { ThemeProvider } from "../context/Theme/ThemeProvider";
import { BrowserRouter } from "react-router";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <MoviesProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MoviesProvider>
    </ThemeProvider>
  );
};
