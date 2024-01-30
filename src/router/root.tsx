import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Detail from "../pages/Detail/Detail";
import Profile from "../pages/Profile/Profile";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/home/:id",
      element: <Detail/>
    },

    {
      path: "/profile",
      element: <Profile/>
    },

  ]);
  export default router 