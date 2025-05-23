import type { MovieSortOption } from "@/interface/Movies";
import { useMovies } from "@/shared/hooks/useMovies";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import DatePicker from "react-datepicker";


export const MovieFilters = () => {
  const {
    filter,
    setFilter,
    searchMovies,
    setSort,
    sort,
    getAllTag,
    clearFilter,
    clearSort,
  } = useMovies();
  const [showFilters, setShowFilters] = useState(false);

  const allTags = useMemo(() => getAllTag(), [getAllTag]);

  const handleTagsChange = useCallback(
    (tag: string) => {
      const newTags = filter.tags.includes(tag)
        ? filter.tags.filter((t) => t !== tag)
        : [...filter.tags, tag];

      setFilter({ ...filter, tags: newTags });
    },
    [filter, setFilter]
  );

  const hanldeSortChange = useCallback(
    (field: MovieSortOption["field"]) => {
      const newDirection =
        sort.field === field && sort.order === "asc" ? "desc" : "asc";

      setSort({ field, order: newDirection });
    },
    [setSort, sort.field, sort.order]
  );

  const isFiltered =
    filter.releaseDate ||
    (filter.tags && filter.tags.length > 0) ||
    filter.search;

  return (
    <div className="mb-6">
      <div className="mb-4">
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="size-5 text-gray-500 dark:text-gray-300" />
            </div>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => {
                searchMovies(e.target.value);
              }}
              placeholder="Buscar por título"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center space-x-2">
            <button
              className={`flex items-center ${
                showFilters ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="size-5 mr-2" />
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            </button>
            {isFiltered && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  clearFilter();
                  clearSort();
                  setShowFilters(false);
                  searchMovies("");
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Ordenar por:
            </span>

            <button
              className={`btn-ghost text-sm flex gap-2 items-center ${
                sort.field === "title" ? "text-primary-600" : ""
              }`}
              onClick={() => hanldeSortChange("title")}
            >
              <ArrowUpDown
                className={`size-3 ml-1 ${
                  sort.order === "asc" ? "rotate-0" : "rotate-180"
                }`}
              />
              Titulo
            </button>
            <button
              className={`btn-ghost text-sm flex gap-2 items-center ${
                sort.field === "releaseDate" ? "text-primary-600" : ""
              }`}
              onClick={() => hanldeSortChange("releaseDate")}
            >
              <ArrowUpDown
                className={`size-3 ml-1 ${
                  sort.order === "asc" ? "rotate-0" : "rotate-180"
                }`}
              />
              Fecha de lanzamiento
            </button>
            <button
              className={`btn-ghost text-sm flex gap-2 items-center ${
                sort.field === "createdAt" ? "text-primary-600" : ""
              }`}
              onClick={() => hanldeSortChange("createdAt")}
            >
              <ArrowUpDown
                className={`size-3 ml-1 ${
                  sort.order === "asc" ? "rotate-0" : "rotate-180"
                }`}
              />
              Fecha de creación
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-4 slide-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Año de lanzamiento
                </h4>
                <DatePicker
                  selected={
                    filter.releaseDate ? new Date(filter.releaseDate) : null
                  }
                  showYearPicker
                  dateFormat="yyyy"
                  onChange={(date: Date | null) => {
                    setFilter({
                      ...filter,
                      releaseDate: date ? date.toISOString() : "",
                    });
                  }}
                  className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  calendarClassName="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <label
                      key={typeof tag === "string" ? tag : tag.id ?? tag.name}
                      className={`inline-flex items-center px-3 py-1 rounded-full border cursor-pointer transition-all ${
                        filter.tags.includes(typeof tag === "string" ? tag : tag.name)
                          ? "bg-primary-600 text-white border-primary-600 dark:bg-primary-600 dark:text-white dark:border-primary-600"
                          : "bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={filter.tags.includes(typeof tag === "string" ? tag : tag.name)}
                        onChange={() => handleTagsChange(typeof tag === "string" ? tag : tag.name)}
                        className="hidden"
                      />
                      {typeof tag === "string" ? tag : tag.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
