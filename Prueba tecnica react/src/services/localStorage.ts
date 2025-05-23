import { initialMovies } from "@/constans/initialMovies";
import type { Movie } from "@/interface/Movies";

const localStorageKey = "movies2";

export const saveMovies = (movies: Movie[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(movies));
};

export const loadInitalMovies = (): Movie[] => {
  const movies = localStorage.getItem(localStorageKey);

  if (movies) {
    try {
      const parsedMovies = JSON.parse(movies);
      if (Array.isArray(parsedMovies) && parsedMovies.length > 0) {
        return parsedMovies;
      }
    } catch (error) {
      console.error("Error al parsear localStorage:", error);
    }
  }

  return initialMovies;
};
