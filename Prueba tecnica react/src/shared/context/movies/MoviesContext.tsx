import { createContext } from "react";
import type { MovieContext } from "@/interface/Movies";

export const MoviesContext = createContext<MovieContext | null>(null);
