import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayoutNavigation from "./layout/MainLayoutNavigation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuctionItem from "./pages/AuctionItem";
import AuctionSearchItems from "./pages/AuctionSearchItems";

export const HOME = "/home";
export const EXPLORE = "/explore";
export const AUCTION_ITEMS = "/auction-items";

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
              path: `${EXPLORE}${AUCTION_ITEMS}`,
              element: <AuctionSearchItems />,
            },
            {
              path: `${EXPLORE}${AUCTION_ITEMS}/:id`,
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
