import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayoutNavigation from "./layout/MainLayoutNavigation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const HOME = "/home";
export const EXPLORE = "/explore";

const Navigation = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayoutNavigation />,
      errorElement: <NotFound />,
      children: [
        {
          path: HOME,
          element: <Home />,
        },
        { path: EXPLORE, element: <h1>About</h1> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default Navigation;
