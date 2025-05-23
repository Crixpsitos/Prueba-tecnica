import { loadInitalMovies, saveMovies } from "@/services/localStorage";
import type { Movie, MovieState } from "@/interface/Movies";
import type { MovieActions } from "@/interface/Movies";
import { sortAndFilterMovies } from "../utils/movies-utils";
import { v4 as uuidv4 } from "uuid";

export const movieReducer = (
  state: MovieState,
  action: MovieActions
): MovieState => {
  let newMovies: Movie[];

  switch (action.type) {
    case "LOAD_MOVIE":
      newMovies = loadInitalMovies();
      saveMovies(newMovies);
      return {
        ...state,
        movies: newMovies,
        filteredMovies: sortAndFilterMovies(
          newMovies,
          state.filter,
          state.sort
        ),
      };

    case "ADD_MOVIE": {
      const newMovie: Movie = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      newMovies = [...state.movies, newMovie];
      return {
        ...state,
        movies: newMovies,
        filteredMovies: sortAndFilterMovies(
          newMovies,
          state.filter,
          state.sort
        ),
      };
    }

    case "REMOVE_MOVIE":
      newMovies = state.movies.filter(
        (movie: Movie) => movie.id !== action.payload
      );
      saveMovies(newMovies);
      return {
        ...state,
        movies: newMovies,
        filteredMovies: sortAndFilterMovies(
          newMovies,
          state.filter,
          state.sort
        ),
      };

    case "UPDATE_MOVIE":
  
      newMovies = state.movies.map((movie: Movie) =>
        movie.id === action.payload.id
          ? {
          ...movie,
          ...action.payload,
          createdAt: movie.createdAt,
          updatedAt: new Date().toISOString(),
        }
          : movie
      );
      saveMovies(newMovies);
      return {
        ...state,
        movies: newMovies,
        filteredMovies: sortAndFilterMovies(
          newMovies,
          state.filter,
          state.sort
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
        filteredMovies: sortAndFilterMovies(
          state.movies,
          action.payload,
          state.sort
        ),
      };

    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
        filteredMovies: sortAndFilterMovies(
          state.movies,
          state.filter,
          action.payload
        ),
      };

    case "SEARCH_MOVIES": {
      const newFilter = {
        ...state.filter,
        search: action.payload,
      };
      return {
        ...state,
        filter: newFilter,
        filteredMovies: sortAndFilterMovies(
          state.movies,
          newFilter,
          state.sort
        ),
      };
    }

    case "CLEAR_FILTER":
      return {
        ...state,
        filter: {
          tags: [],
          search: "",
          releaseDate: "",
        },
        filteredMovies: sortAndFilterMovies(
          state.movies,
          state.filter,
          state.sort
        ),
      };
    case "CLEAR_SORT":
      return {
        ...state,
        sort: {
          order: "asc",
          field: "title",
        },
        filteredMovies: sortAndFilterMovies(
          state.movies,
          state.filter,
          state.sort
        ),
      };

    default:
      return state;
  }
};
