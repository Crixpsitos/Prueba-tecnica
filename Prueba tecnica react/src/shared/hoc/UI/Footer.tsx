import { useTheme } from "@/shared/hooks/useTheme";

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`${
        theme === "dark" ? "bg-slate-800" : "bg-white"
      } py-8 text-slate-500 text-sm`}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Prueba tecnica React. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
