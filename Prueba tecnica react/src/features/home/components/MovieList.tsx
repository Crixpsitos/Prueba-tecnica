import { useMovies } from "@/shared/hooks/useMovies";
import { EmptyMovies } from "./EmptyMovies";
import { useMemo } from "react";
import { Link } from "react-router";
import { PlusCircle } from "lucide-react";
import { MovieCard } from "./MovieCard";

export const MovieList = () => {
  const { filteredMovies, filter } = useMovies();

  const renderEmptyState = useMemo(() => {
    if (filter.search) {
      return (
        <EmptyMovies
          title="No hay resultados"
          description={`No se han encontrado resultados para la búsqueda: ${filter.search}.`}
          action={
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-secondary"
            >
              Limpiar busqueda
            </button>
          }
        />
      );
    }

    return (
      <EmptyMovies
        title="No hay peliculas aun :O, como puede ser?"
        description="Crea tus propias peliculas y empieza a disfrutar de la experiencia."
        action={
            <Link
            to="/movies/new"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors
              bg-gray-200 text-gray-800 hover:bg-gray-300
              dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
            <PlusCircle className="size-5" />
            Empieza a crear
            </Link>
        }
      />
    );
  }, [filter.search]);

  if (filteredMovies.length === 0) {
    return renderEmptyState;
  }

  return (
    <div className="grid gird-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
