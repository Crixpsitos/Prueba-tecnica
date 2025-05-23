import { ClipboardList } from "lucide-react";
import { memo, type FC, type ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyMovies: FC<Props> = memo(({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4 py-12 px-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
      <ClipboardList className="text-gray-400 dark:text-gray-500 size-16 mb-4" />
      <h3 className="text-gray-400 dark:text-gray-500 text-2xl font-bold">
        {title}
      </h3>
      <p className="text-gray-400 dark:text-gray-500 text-sm">{description}</p>
      {action}
    </div>
  );
});
