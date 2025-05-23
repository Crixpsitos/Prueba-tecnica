

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] py-12 px-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando datos...</p>
    </div>
  );
};

export default Loading;