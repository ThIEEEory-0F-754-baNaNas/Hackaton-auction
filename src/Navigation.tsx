import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayoutNavigation from "./layout/MainLayoutNavigation";
import Home from "./pages/Home";
import Start from "./pages/Start"
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";

export const HOME = "/home";
export const EXPLORE = "/explore";
export const START = "/start";

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
        { 
          path: EXPLORE, 
          element: <Explore /> 
        },
        {
          path: START,
          element: <Start />,
        },
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
