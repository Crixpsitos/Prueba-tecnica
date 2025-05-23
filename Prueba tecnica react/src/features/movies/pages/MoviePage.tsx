import { EmptyMovies } from "@/features/home/components/EmptyMovies";
import Loading from "@/shared/components/loading/Loading";
import { useMovies } from "@/shared/hooks/useMovies";
import { ArrowLeft } from "lucide-react";
import { lazy, Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const MoviesForm = lazy(() => import("../components/MoviesForm"));

const MovieDetail = () => {
  const { id } = useParams();
  const { movies } = useMovies();
  const navigate = useNavigate();

  const location = useLocation();

  const isEdit = location.pathname.endsWith("/edit");
  const isNew = location.pathname === "/movies/add";

  const movie = movies.find((movie) => movie.id === id);

  const handleBack = () => {
    navigate(-1);
  };

  if (!movie && !isNew) {
    return (
      <div className="container mx-auto px-4 py-8 w-screen">
        <EmptyMovies
          title="Pelicula no encontrado"
          description="No se ha encontrado la pelicula que buscas."
          action={
            <button type="button" onClick={handleBack} className="btn-primary">
              Volver
            </button>
          }
        />
      </div>
    );
  }

  if (isNew || isEdit) {
    return (
      <div className="container mx-auto px-4 py-8 w-screen">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="size-5 mr-2" />
            Volver
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isNew ? "Crear nueva pelicula" : "Editar pelicula"}
          </h1>
        </div>
        <Suspense fallback={<Loading />}>
          <MoviesForm initialMovie={movie} isEditing={isEdit} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a películas
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{movie?.title}</h1>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="flex items-center">
              {/* Puedes poner aquí un icono si quieres, por ejemplo un reloj para la fecha */}
              <span className="mr-1">Fecha de estreno:</span>
              {movie?.releaseDate}
            </div>
          </div>
        </div>

        {movies && movie?.images?.length && movie.images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Imágenes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movie.images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-video rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={image.imageUrl}
                    alt={image.caption || "Imagen de la película"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{movie?.description}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/movies/${movie?.id}/edit`)}
            className="btn-primary"
          >
            Editar película
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;