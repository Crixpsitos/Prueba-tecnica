

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
        {/* creacion de navbar sencillo solo con icono y boton para agregar tareas */}
        <div className="flex justify-between items-center bg-gray-800 p-4">
            <div className="text-white text-lg font-bold">Movie App</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Movie</button>
        </div>
    </nav>
  )
}
