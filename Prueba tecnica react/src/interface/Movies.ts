export interface MovieTag {
  id: string;
  name: string;
}

export interface MovieImage {
  id: string;
  imageUrl: string;
  caption?: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  tags: MovieTag[];
  images: MovieImage[];
  createdAt: string;
  updatedAt: string;
}

export interface MovieContext {
  movies: Movie[];
  filteredMovies: Movie[];
  filter: MovieFilter;
  sort: MovieSortOption;
  addMovie: (movie: Omit<Movie, "id" | "createdAt" | "updatedAt">) => void;
  removeMovie: (id: string) => void;
  updateMovie: (id: Movie["id"], updatedMovie: Omit<Movie, "id" | "createdAt">) => void;
  setFilter: (filter: MovieFilter) => void;
  setSort: (sort: MovieSortOption) => void;
  searchMovies: (search: string) => void;
  getAllTag: () => MovieTag[];
  clearFilter: () => void;
  clearSort: () => void;
}

export type MovieActions =
  | { type: "LOAD_MOVIE" }
  | {
      type: "ADD_MOVIE";
      payload: Omit<Movie, "id" | "createdAt" | "updatedAt">;
    }
  | { type: "REMOVE_MOVIE"; payload: string }
  | {
      type: "UPDATE_MOVIE";
      payload: Omit<Movie,"createdAt">;
    }
  | { type: "SET_FILTER"; payload: MovieFilter }
  | { type: "SET_SORT"; payload: MovieSortOption }
  | { type: "SEARCH_MOVIES"; payload: string }
  | { type: "CLEAR_FILTER" }
  | { type: "CLEAR_SORT" };

export interface MovieFilter {
  search: string;
  releaseDate: string;
  tags: string[];
}

export type SortOption = "releaseDate" | "title" | "createdAt";
export type SortOrder = "asc" | "desc";
export interface MovieSortOption {
  field: SortOption;
  order: SortOrder;
}

export interface MovieState {
  movies: Movie[];
  filteredMovies: Movie[];
  filter: MovieFilter;
  sort: MovieSortOption;
}
