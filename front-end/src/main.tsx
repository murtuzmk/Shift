import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import App from "./App.tsx";

import { Auth0Provider } from "@auth0/auth0-react";
// import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./pages/Settings.tsx";

import ExecutivePage from "./pages/ExecutivePage.tsx";
import { MyAvailability } from "./pages/MyAvailability.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { UserProvider } from "./context/UserDataContext.tsx";
import CreateRAAccount from "./components/CreateRAAccount.tsx";
import  RAWelcome  from "./pages/RAWelcome.tsx";
import Coworkers from "./pages/Coworkers/index.tsx";
import Employees from "./pages/Employees/index.tsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
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
      { path: "employees", element: <Employees /> },
      { path: "executivepage", element: <ExecutivePage /> },
      { path: "co-workers", element: <Coworkers /> },
      { path: "availability", element: <MyAvailability /> },
      { path: "create-ra-account", element: <CreateRAAccount /> },
      { path: "ra-welcome", element: <RAWelcome />}
      { path: "settings", element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <Auth0Provider
        domain="dev-e7jyddja3xm6p30e.us.auth0.com"
        clientId="pzBbZV1cdrBz76xNxuEUqVBS6KZ6Wgte"
        authorizationParams={{
          redirect_uri: "http://localhost:5173/app",
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </UserProvider>
  </React.StrictMode>
);
