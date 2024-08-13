import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home.jsx";
import CreatePicnic from "./routes/CreatePicnic.jsx";
import Picnic from "./routes/Picnic.jsx";
import EditPicnic from "./routes/EditPicnic.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/picnic/new",
        element: <CreatePicnic />,
      },
      {
        path: "/picnic/:id",
        element: <Picnic />,
      },
      {
        path: "/picnic/edit/:id",
        element: <EditPicnic />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
