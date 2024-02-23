import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Detail from "../pages/Detail/Detail";
import Profile from "../pages/Profile/Profile";
import Chat from "../pages/Chat/Chat";
import Settings from "../pages/settingsPage/Settings";
import PostsDetail from "../pages/PostsDetail/PostsDetail";
import Admin from "../pages/Admin/Admin";
import AdminPosts from "../pages/AdminPosts/AdminPosts";
import SavedPosts from "../pages/SavedPosts/SavedPosts";
import AdminStories from "../pages/AdminStories/AdminStories";
import AdminWishList from "../pages/AdminWishList/AdminWishList";
import Error from "../pages/Error/Error";
import AdminFollowers from "../pages/AdminFollowers/AdminFollowers";
import AdminFollowings from "../pages/AdminFollowings/AdminFollowings";
import AdminBlockList from "../pages/AdminBlockList/AdminBlockList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home/:id",
    element: <Detail />
  },

  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/user/:userId/posts/:id",
    element: <PostsDetail />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/admin/posts/:id",
    element: <AdminPosts />
  },
  {
    path: "/savedposts",
    element: <SavedPosts />
  },
  {
    path: "/admin/stories/:id",
    element: <AdminStories />
  },
  {
    path: "/admin/wishList/:id",
    element: <AdminWishList />
  },
  {
    path: "/admin/followers/:id",
    element: <AdminFollowers />
  },
  {
    path: "/admin/followings/:id",
    element: <AdminFollowings />
  },
  {
    path: "/admin/blockList/:id",
    element: <AdminBlockList />
  },
  {
    path: "*",
    element: <Error />,
  },
]);
export default router 