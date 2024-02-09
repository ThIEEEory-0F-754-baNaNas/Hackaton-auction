import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayoutNavigation from "./layout/MainLayoutNavigation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuctionItem from "./pages/AuctionItem";
import AuctionSearchItems from "./pages/AuctionSearchItems";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export const HOME = "/home";
export const PROFILE = "/profile";
export const SETTINGS = "/settings";
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
          children: [
            {
              path: `${HOME}`,
              element: <Home />,
            },
            {
              path: `${HOME}${PROFILE}`,
              element: <Profile />,
            },
            {
              path: `${HOME}${SETTINGS}`,
              element: <Settings />,
            },
          ],
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
