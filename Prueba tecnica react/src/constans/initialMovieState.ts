export const initialMovieState = {
    movies: [],
    loading: false,
    error: null,
    filters: {
        tags: [],
        search: "",
        releaseDate: "" // filtrar por año
    },
    sort: {
        order: "asc",
        field: "title",
    }
    
}