import { initialMovieState } from "@/constans/initialMovieState";
import type { Movie, MovieFilter, MovieSortOption, MovieTag } from "@/interface/Movies";
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

  const setFilter = useCallback((filter: MovieFilter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);
  const setSort = useCallback((sort: MovieSortOption) => {
    dispatch({ type: "SET_SORT", payload: sort });
  }, []);
  const searchMovies = useCallback((search: string) => {
    dispatch({ type: "SEARCH_MOVIES", payload: search });
  }, []);

  

  const contextValue = {
    movies: state.movies,
    filteredMovies: state.filteredMovies,
    filter: state.filter,
    sort: state.sort,
    addMovie: (movie: Omit<Movie, "id" | "createdAt" | "updatedAt">) =>
      dispatch({ type: "ADD_MOVIE", payload: movie }),
    removeMovie,
    updateMovie: (id: Movie["id"], updatedMovie: Omit<Movie, "id" | "createdAt">) =>
      dispatch({ type: "UPDATE_MOVIE", payload: { ...updatedMovie, id } }),
    setFilter,
    setSort,
    searchMovies,
    getAllTag: () => getAllTags(state.movies) as unknown as MovieTag[],
    clearFilter: () => dispatch({ type: "CLEAR_FILTER" }),
    clearSort: () => dispatch({ type: "CLEAR_SORT" }),
  };
  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
