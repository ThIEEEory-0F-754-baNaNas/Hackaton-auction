import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayoutNavigation from "./layout/MainLayoutNavigation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuctionItem from "./pages/AuctionItem";

export const HOME = "/home";
export const EXPLORE = "/explore";
export const AUCTION_ITEM = "/auction-item";

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
          children: [
            {
              path: `${EXPLORE}`,
              element: <h1>Explore</h1>,
            },
            {
              path: `${EXPLORE}${AUCTION_ITEM}/:id`,
              element: <AuctionItem />,
            },
          ],
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
