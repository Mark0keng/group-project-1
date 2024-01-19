import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from './pages/Home/index.jsx'
import Cart from './pages/Cart/index.jsx'
import Detail from "./pages/Detail/index.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {

    path: "/cart",
    element: <Cart />
  },
    {
        path: "/product/:id",
    element: <Detail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
