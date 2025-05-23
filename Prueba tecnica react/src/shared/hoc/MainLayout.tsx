import type { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { Navbar } from "./UI/Navbar";
import { Footer } from "./UI/Footer";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-50 text-slate-900"
      }`}
    >
      <Navbar />
      <main className=" w-full mx-auto max-w-7xl px-4 md:px-6 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};
