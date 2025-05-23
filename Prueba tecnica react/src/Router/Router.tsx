import Loading from "@/shared/components/loading/Loading";
import { MainLayout } from "@/shared/hoc/MainLayout";
import { Provider } from "@/shared/providers/Provider";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/features/home/pages/Home"));
const MovieDetail = lazy(() => import("@/features/movies/pages/MoviePage"));

export const Router = () => {
  return (
    <Provider>
      <MainLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="movies/:id" element={<MovieDetail />} />
            <Route path="movies/add" element={<h1>Add Movie</h1>} />
            <Route path="movies/:id/edit" element={<MovieDetail />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Provider>
  );
};
