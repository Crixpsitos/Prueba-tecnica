import type { Movie, MovieImage, MovieTag } from "@/interface/Movies";
import { useMovies } from "@/shared/hooks/useMovies";
import { format } from "date-fns";
import { ImagePlus, Plus, X } from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
} from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

interface Props {
  initialMovie?: Movie | undefined;
  isEditing?: boolean;
}

const MoviesForm: FC<Props> = ({ initialMovie, isEditing = false }) => {
  const { getAllTag, updateMovie, addMovie } = useMovies();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const [form, setform] = useState({
    title: initialMovie?.title || "",
    description: initialMovie?.description || "",
    releaseDate: initialMovie?.releaseDate || "",
    tags: initialMovie?.tags || [],
    images: initialMovie?.images || [],
  });
  const [error, setError] = useState({
    title: "",
    description: "",
    releaseDate: "",
    images: "",
  });
  const [newTags, setNewTags] = useState("");

  const allTags = getAllTag();

  const validateForm = useCallback(() => {
    const errors: {
      title: string;
      description: string;
      releaseDate: string;
      images: string;
    } = {
      title: "",
      description: "",
      releaseDate: "",
      images: "",
    };
    if (!form.title) {
      errors.title = "El título es requerido";
    }
    if (!form.description) {
      errors.description = "La descripción es requerida";
    }
    if (!form.releaseDate) {
      errors.releaseDate = "La fecha de lanzamiento es requerida";
    }
    if (form.images.length === 0) {
      errors.images = "Por favor selecciona al menos una imagen";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  }, [form.description, form.images.length, form.releaseDate, form.title]);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (
        name === "images" &&
        e.target instanceof HTMLInputElement &&
        e.target.files
      ) {
        const files = Array.from(e.target.files) as File[];
        setError((prev) => ({
          ...prev,
          images: "",
        }));

        const invalidImages: File | undefined = files.find(
          (file: File) => !file.type.startsWith("image/")
        );

        if (invalidImages) {
          setError((prev) => ({
            ...prev,
            images: "Por favor selecciona solo imágenes",
          }));
          return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        const invalidSize: File | undefined = files.find(
          (file: File) => file.size > maxSize
        );
        if (invalidSize) {
          setError((prev) => ({
            ...prev,
            images: "El tamaño máximo de la imagen es de 5MB",
          }));
          return;
        }

        const newImages = await Promise.all(
          files.map((file) => {
            return new Promise<MovieImage>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                console.log(e.target?.result);
                resolve({
                  id: uuidv4(),
                  imageUrl: e.target?.result as string,
                  caption: "",
                });
              };
              reader.readAsDataURL(file);
            });
          })
        );

        console.log(newImages);

        setform((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setform((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },

    []
  );

  const handleAddTag = useCallback(() => {
    if (
      newTags.trim() &&
      !form.tags.some((tag) => tag.name === newTags.trim())
    ) {
      const newTag: MovieTag = { id: uuidv4(), name: newTags.trim() };
      setform((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTags("");
    }
  }, [form.tags, newTags]);

  const removeTag = useCallback((tagId: string) => {
    setform((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.id !== tagId),
    }));
  }, []);

  const { title, description, images, releaseDate, tags } = form;

  const handleSubmit = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    const newMovie = {
      ...form,
      updatedAt: new Date().toISOString(),
    };

    if (isEditing && initialMovie) {
      updateMovie(initialMovie.id, newMovie);
    } else {
      addMovie(form);
    }

    navigate("/");
  }, [
    addMovie,
    form,
    initialMovie,
    isEditing,
    navigate,
    updateMovie,
    validateForm,
  ]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && newTags.trim()) {
        e.preventDefault();
        handleAddTag();
      }
    },
    [handleAddTag, newTags]
  );

  const handleRemoveImage = useCallback(
    (imageId: string) => {
      setform((prev) => ({
        ...prev,
        images: prev.images.filter((image) => image.id !== imageId),
      }));
    },
    [setform]
  );

  const handleCaptionChange = useCallback(
    (imageId: string, caption: string) => {
      setform((prev) => ({
        ...prev,
        images: prev.images.map((image) =>
          image.id === imageId ? { ...image, caption } : image
        ),
      }));
    },
    [setform]
  );

  console.log("form", form);
  console.log("images", images);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={`input ${
            error?.title
              ? "border-error-500 focus:ring-error-500 focus:border-error-500"
              : ""
          } `}
          value={title}
          onChange={onChange}
          placeholder="Título de la película"
        />
        {error?.title && (
          <p className="text-sm text-error-600 mt-1">{error.title}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Descripción
        </label>
        <textarea
          name="description"
          id="description"
          className={`input ${
            error?.description
              ? "border-error-500 focus:ring-error-500 focus:border-error-500"
              : ""
          } `}
          value={description}
          onChange={onChange}
          placeholder="Descripción de la película"
          rows={4}
        />
        {error?.description && (
          <p className="text-sm text-error-600 mt-1">{error.description}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="releaseDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Fecha de lanzamiento
        </label>
        <DatePicker
          selected={releaseDate ? new Date(releaseDate) : null}
          onChange={(date: Date | null) => {
            setform((prev) => ({
              ...prev,
              releaseDate: date ? format(date.toISOString(), "yyyy/MM/dd") : "",
            }));
          }}
          showYearPicker
          dateFormat="yyyy/MM/dd"
        />
        {error?.releaseDate && (
          <p className="text-sm text-error-600 mt-1">{error.releaseDate}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Tags
        </label>
        <div className="flex items-center gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
            >
              {tag.name}
              <button
                type="button"
                onClick={() => removeTag(tag.id)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            name="tags"
            id="tags"
            className={`input `}
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Agregar tag a la pelicula"
            list="tags-list"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-400"
          >
            <Plus className="size-5" />
          </button>
          <datalist id="tags-list">
            {allTags.map((tag, index) => (
              <option key={`${tag.id}-${index}`} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </datalist>
        </div>
      </div>

      <div className="mb-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Imágenes
            </label>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="size-5 mr-2" />
              Seleccionar imágenes
            </button>
            <input
              type="file"
              id="images"
              name="images"
              ref={fileInputRef}
              accept="image/*"
              onChange={onChange}
              className="hidden"
              multiple
            />
          </div>
          {error?.images && (
            <p className="text-sm text-error-600 mt-1">{error.images}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-video relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-500">
                  <img
                    src={image.imageUrl}
                    alt={image.caption || title}
                    decoding="async"
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="sr-only">Eliminar imagen</span>
                    <X className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <input
                  type="text"
                  value={image?.caption || ""}
                  onChange={(e) =>
                    handleCaptionChange(image.id, e.target.value)
                  }
                  placeholder="Escribe una descripción de la imagen"
                  className="mt-2 w-full text-sm px-2 py-1 border border-gray-200 dark:border-gray-500 rounded focus:ring-1 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default MoviesForm;
