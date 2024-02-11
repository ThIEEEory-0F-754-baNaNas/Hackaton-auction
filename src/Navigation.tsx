import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayoutNavigation from "./layout/MainLayoutNavigation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuctionItem from "./pages/AuctionItem/AuctionItem";
import AuctionSearchItems from "./pages/AuctionSearchItems";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedPage from "./pages/ProtectedPage";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import CreateAuction from "./pages/CreateAuction";
import EditAuction from "./pages/EditAuction";
import Explore from "./pages/Explore";
import Start from "./pages/Start";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { BASE_URL } from "./config";

export const BASE = BASE_URL;

export const HOME = `${BASE_URL}/home`;
export const PROFILE = `${HOME}/profile`;
export const SETTINGS = `${HOME}/settings`;
export const EDIT_AUCTION = `${HOME}/edit-auction`;

export const CREATE_AUCTION = `${BASE_URL}/create-auction`;

export const EXPLORE = `${BASE_URL}/explore`;
export const AUCTION_ITEMS = `${EXPLORE}/auction-items`;

export const START = `${BASE_URL}/start`;
export const SIGN_IN = `${START}/sign-in`;
export const SIGN_UP = `${START}/sign-up`;

const Navigation = () => {
  const [user] = useContext(UserContext);

  const router = createBrowserRouter([
    {
      path: BASE_URL,
      element: <MainLayoutNavigation />,
      errorElement: <NotFound />,
      children: [
        {
          path: HOME,
          element: <ProtectedPage user={user} />,
          children: [
            {
              path: `${HOME}`,
              element: <Home />,
            },
            {
              path: `${PROFILE}`,
              element: <Profile />,
            },
            {
              path: `${SETTINGS}`,
              element: <Settings />,
            },
            {
              path: `${EDIT_AUCTION}/:id`,
              element: <EditAuction />,
            },
          ],
        },
        {
          path: CREATE_AUCTION,
          element: (
            <ProtectedPage user={user}>
              <CreateAuction />
            </ProtectedPage>
          ),
        },
        {
          path: EXPLORE,
          children: [
            {
              path: `${EXPLORE}`,
              element: <Explore />,
            },
            {
              path: `${AUCTION_ITEMS}`,
              element: <AuctionSearchItems />,
            },
            {
              path: `${AUCTION_ITEMS}/:id`,
              element: (
                <ProtectedPage user={user}>
                  <AuctionItem />
                </ProtectedPage>
              ),
            },
          ],
        },
        {
          path: START,
          children: [
            {
              path: START,
              element: <Start />,
            },
            {
              path: SIGN_IN,
              element: <SignIn />,
            },
            {
              path: SIGN_UP,
              element: <SignUp />,
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
