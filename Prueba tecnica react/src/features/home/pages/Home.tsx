import { useMovies } from "@/shared/hooks/useMovies";
import { MovieList } from "../components/MovieList";

const Home = () => {
  const { movies } = useMovies();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col dark:text-white   md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Prueba tecnica React
          </h1>
          <p className="text-gray-600 dark:text-gray-100 mt-4">
            Prueba tecnica de peliculas en React. Tu tienes {movies.length}{" "}
            pelicula{movies.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <MovieList />
    </div>
  );
};

export default Home;