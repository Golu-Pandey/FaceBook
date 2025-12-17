import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Component/HomePage/HomePage";
import GroupPage from "./Component/GroupPage/GroupPage";
import MarketPlacePage from "./Component/MarketPlace/MarketPlacePage";
import MessengerPage from "./Component/MessengerPage/MessengerPage";
import VideoPage from "./Component/VideoPage/VideoPage";
import GamingPage from "./Component/GamingPage/GamingPage";
import UserProfilePage from "./Component/UserProfilePage/UserProfilePage";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/group", element: <GroupPage /> },
    { path: "/gaming", element: <GamingPage /> },
    { path: "/marketplace", element: <MarketPlacePage /> },
    { path: "/messenger", element: <MessengerPage /> },
    { path: "/video", element: <VideoPage /> },
    { path: "/user-profile", element: <UserProfilePage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;


// cd Facebook_React cd facebook-live