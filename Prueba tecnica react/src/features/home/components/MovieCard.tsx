import type { Movie } from "@/interface/Movies";
import { useMovies } from "@/shared/hooks/useMovies";
import { Edit, Image, Trash } from "lucide-react";
import {
    useCallback,
    type FC,
    type MouseEvent as ReactMouseEvent,
} from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Link } from "react-router";
import 'sweetalert2/src/sweetalert2.scss'
import { useTheme } from "@/shared/hooks/useTheme";

interface Props {
    movie: Movie;
}

export const MovieCard: FC<Props> = ({ movie }) => {
    const { removeMovie } = useMovies();
    const { theme } = useTheme();

    const isDark = theme === "dark";

    const handleDelete = useCallback(
        (e: ReactMouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            Swal.fire({
                title: "¿Estás seguro?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    removeMovie(movie.id);
                    Swal.fire("Borrado!", "Tu archivo ha sido borrado.", "success");
                } else if (result.isDismissed) {
                    Swal.fire("Cancelado", "Tu archivo no ha sido borrado.", "error");
                }
            });
        },
        [movie.id, removeMovie]
    );

    return (
        <div
            className={`
                ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}
                rounded-xl shadow-lg overflow-hidden border transition-transform
            `}
        >
            <div className="flex flex-col h-full">
                {movie.images.length > 0 && (
                    <div className={`${isDark ? "bg-gray-800" : "bg-gray-100"} w-full aspect-video flex items-center justify-center`}>
                        <img
                            src={movie.images[0].imageUrl}
                            alt={movie.images[0].caption || movie.title}
                            className="object-cover w-full h-[300px] max-h-[300px] min-h-[200px] rounded-t-xl"
                        />
                    </div>
                )}
                <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className={`${isDark ? "text-gray-100" : "text-gray-900"} text-lg font-semibold truncate`}>
                            {movie.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                            {movie.images.length > 0 && (
                                <span className={`${isDark ? "text-gray-400" : "text-gray-500"} flex items-center text-sm`}>
                                    <Image className="mr-1 size-4" />
                                    {movie.images.length}{" "}
                                    {movie.images.length > 1 ? "imágenes" : "imagen"}
                                </span>
                            )}
                        </div>
                    </div>

                    <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm mb-2 line-clamp-3`}>
                        {movie.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                        {movie.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className={`
                                    inline-block
                                    ${isDark ? "bg-gray-900 text-primary-200" : "bg-primary-100 text-primary-700"}
                                    text-xs font-semibold mr-1 px-2 py-0.5 rounded-full
                                `}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <div className={`flex justify-between items-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-auto`}>
                        <div>
                            {movie.releaseDate && (
                                <span className="font-semibold text-xs">
                                    Fecha de estreno: 
                                    <br />
                                    {format(movie.releaseDate, "MM / dd / yyyy")}
                                </span>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                                <Link
                                    to={`/movie/${movie.id}/edit`}
                                    className={`
                                        p-1.5
                                        ${isDark
                                            ? "text-gray-400 hover:text-primary-200 hover:bg-primary-900"
                                            : "text-gray-500 hover:text-primary-600 hover:bg-primary-50"}
                                        rounded-full transition-colors
                                    `}
                                >
                                    <Edit className="size-4" />
                                </Link>
                                <Link
                                    to={`/movies/${movie.id}`}
                                    className={`
                                        p-1.5 inline-flex gap-2 rounded-full transition-colors
                                        ${isDark
                                            ? "text-gray-400 hover:text-primary-200 hover:bg-primary-900"
                                            : "text-gray-500 hover:text-primary-600 hover:bg-primary-50"}
                                    `}
                                >
                                    <Image className="size-4" />
                                    Ver
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className={`
                                        p-1.5 rounded-full transition-colors
                                        ${isDark
                                            ? "text-gray-400 hover:text-red-400 hover:bg-red-900"
                                            : "text-gray-500 hover:text-red-600 hover:bg-red-50"}
                                    `}
                                >
                                    <Trash className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
