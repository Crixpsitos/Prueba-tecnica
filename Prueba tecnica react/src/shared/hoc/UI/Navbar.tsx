import { useNavigate } from "react-router";
import { useTheme } from "@/shared/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b ${
        theme === "dark"
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
      } transition-colors duration-200`}
    >
      {/* Logo o nombre de la app */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer font-bold text-lg select-none"
      >
        MovieApp
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/add")}
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add Movie
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
