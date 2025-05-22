export interface MovieTag {
  id: number;
  name: string;
}

export interface MovieImage {
  id: number;
  imageUrl: string;
  caption?: string;
}

export interface Movie {
  id: number;
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
  addMovie: (movie: Omit<Movie, "id" | "createdAt" | "updatedAt">) => void;
  removeMovie: (id: number) => void;
  updateMovie: (id: number, updatedMovie: Movie) => void;
}

export type MovieActions =
  | { type: "LOAD_TASK" }
  | { type: "ADD_TASK"; payload: Omit<Movie, "id" | "createdAt" | "updatedAt"> }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "UPDATE_TASK"; payload: Movie }
  | { type: "SET_TASKS"; payload: Movie[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };
