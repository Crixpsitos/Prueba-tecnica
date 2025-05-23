import type { MovieState } from "@/interface/Movies";

export const initialMovieState: MovieState = {
    movies: [],
    filter: {
        tags: [],
        search: "",
        releaseDate: "" // filtrar por año
    },
    sort: {
        order: "asc",
        field: "title",
    },
    filteredMovies: []
}