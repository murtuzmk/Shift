import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import App from "./App.tsx";

import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./pages/Settings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/dashboard" />,
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-e7jyddja3xm6p30e.us.auth0.com"
      clientId="pzBbZV1cdrBz76xNxuEUqVBS6KZ6Wgte"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/app",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
