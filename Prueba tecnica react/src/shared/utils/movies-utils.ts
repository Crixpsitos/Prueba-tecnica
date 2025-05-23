import type { Movie, MovieFilter, MovieSortOption } from "@/interface/Movies";
import Fuse from "fuse.js";
import { startTransition } from "react";

const searchFuse = (movies: Movie[]): Fuse<Movie> => {
  return new Fuse(movies, {
    keys: ["title", "description", "tags"],
    threshold: 0.3,
    ignoreLocation: true,
  });
};

export const searchMovies = (movies: Movie[], search: string): Movie[] => {
  if (!search) return movies;

  let searchResults: Movie[] = [];
  startTransition(() => {
    const fuse = searchFuse(movies);
    searchResults = fuse.search(search).map((result) => result.item);
  });
  return searchResults;
};

export const filtereMovies = (
  movies: Movie[],
  filter: MovieFilter
): Movie[] => {
  const { search, releaseDate, tags } = filter;
  let filteredMovies = movies;


  if (search) {
    filteredMovies = searchMovies(filteredMovies, search);
  }

  // filtrar por fecha de lanzamiento por año
  if (releaseDate) {
    const year = new Date(releaseDate).getFullYear().toString();
    filteredMovies = filteredMovies.filter((movie) =>
      movie.releaseDate.includes(year)
    );
  }

  if (tags.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.tags.some((tag) => tags.includes(tag.name))
    );
  }

  return filteredMovies;
};

export const sortMovies = (movies: Movie[], sort: MovieSortOption): Movie[] => {
  const { field, order } = sort;
  switch (field) {
    case "title":
      return movies.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return order === "asc" ? -1 : 1;
        if (titleA > titleB) return order === "asc" ? 1 : -1;
        return 0;
      });
    case "releaseDate":
      return movies.sort((a, b) => {
        const dateA = new Date(a.releaseDate).getTime();
        const dateB = new Date(b.releaseDate).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
    case "createdAt":
      return movies.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
    default:
      return movies;
  }
};

export const sortAndFilterMovies = (
  movies: Movie[],
  filter: MovieFilter,
  sort: MovieSortOption
): Movie[] => {
  let results = movies;
  results = filtereMovies(results, filter);
  results = sortMovies(results, sort);
  return results;
};

export const getAllTags = (movies: Movie[]): string[] => {
  const tags = new Set<string>();
  movies.forEach((movie) => {
    movie.tags.forEach((tag) => {
      tags.add(tag.name);
    });
  });

  return Array.from(tags);
};
