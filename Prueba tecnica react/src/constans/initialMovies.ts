import type { Movie } from "@/interface/Movies";
import { v4 as uuidv4 } from "uuid";

export const initialMovies: Movie[] = [
    {
        id: uuidv4(),
        title: "The Shawshank Redemption",
        description: "The Shawshank Redemption is a 1994 American drama film directed by Frank Darabont and written by Stephen King. It is based on the 1993 novel of the same name by Stephen King.",
        releaseDate: "2004-06-16",
        tags: [
            {
                id: uuidv4(),
                name: "Drama"
            },
            {
                id: uuidv4(),
                name: "Crime"
            },
            {
                id: uuidv4(),
                name: "Thriller"
            }
        ],
        images: [
            {
                id: uuidv4(),
                imageUrl: "https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg",
                caption: "The Shawshank Redemption"
            },
            {
                id: uuidv4(),
                imageUrl: "https://images.squarespace-cdn.com/content/v1/657716dc6cd59d329f8cc943/1702303456952-89SVMRXKDUZ65S4279HJ/TSRL+Poster.jpg",
                caption: "The Shawshank Redemption"
            }
        ],
        createdAt: "2022-01-02T00:00:00.000Z",
        updatedAt: "2022-01-03T00:00:00.000Z"
    },
    {
        id: uuidv4(),
        title: "The Godfather",
        description: "The Godfather is a 1972 American crime drama film directed by Francis Ford Coppola and written by Mario Puzo and Dan DeCarlo. It is based on the 1970 novel of the same name by Mario Puzo.",
        releaseDate: "1972-03-16",
        tags: [
            {
                id: uuidv4(),
                name: "Crime"
            },
            {
                id: uuidv4(),
                name: "Drama"
            },
            {
                id: uuidv4(),
                name: "Thriller"
            },
            {
                id: uuidv4(),
                name: "Action"
            }
        ],
        images: [
            {
                id: uuidv4(),
                imageUrl: "https://cdn.britannica.com/14/262414-050-E4A47241/Still-from-The-Godfather-1972-film-directed-by-Francis-Ford-Coppola-Starring-Sofia-Coppola-Al-Pacino-Marlon-Brando-Robert-Duvall-James-Caan.jpg",
                caption: "The Godfather"
            },
            {
                id: uuidv4(),
                imageUrl: "https://m.media-amazon.com/images/M/MV5BMDIxMzBlZDktZjMxNy00ZGI4LTgxNDEtYWRlNzRjMjJmOGQ1XkEyXkFqcGc@._V1_.jpg",
                caption: "The Godfather"
            }
        ],
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z"
    }
]