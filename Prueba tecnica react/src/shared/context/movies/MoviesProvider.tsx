import { initialMovieState } from "@/constans/initialMovieState";
import type { Movie, MovieFilter, MovieSortOption } from "@/interface/Movies";
import { movieReducer } from "@/shared/reducer/MovieReducer";
import { useCallback, useEffect, useReducer, type ReactNode } from "react";
import { MoviesContext } from "./MoviesContext";
import { getAllTags } from "@/shared/utils/movies-utils";

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  useEffect(() => {
    dispatch({ type: "LOAD_MOVIE" });
  }, []);

  const removeMovie = useCallback((id: string) => {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
  }, []);

  const contextValue = {
    movies: state.movies,
    filteredMovies: state.filteredMovies,
    filter: state.filter,
    sort: state.sort,
    addMovie: (movie: Omit<Movie, "id" | "createdAt" | "updatedAt">) =>
      dispatch({ type: "ADD_MOVIE", payload: movie }),
    removeMovie,
    updateMovie: (id: string, updatedMovie: Movie) =>
      dispatch({ type: "UPDATE_MOVIE", payload: { ...updatedMovie, id } }),
    setFilter: (filter: MovieFilter) =>
      dispatch({ type: "SET_FILTER", payload: filter }),
    setSort: (sort: MovieSortOption) =>
      dispatch({ type: "SET_SORT", payload: sort }),
    searchMovies: (search: string) =>
      dispatch({ type: "SEARCH_MOVIES", payload: search }),
    getAllTag: () => getAllTags(state.movies),
    clearFilter: () => dispatch({ type: "CLEAR_FILTER" }),
    clearSort: () => dispatch({ type: "CLEAR_SORT" }),
  };
  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
