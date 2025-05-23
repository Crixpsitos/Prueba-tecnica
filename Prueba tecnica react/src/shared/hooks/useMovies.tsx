import {  useContext } from "react";
import { MoviesContext } from "../context/movies/MoviesContext";

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }
  return context;
};
