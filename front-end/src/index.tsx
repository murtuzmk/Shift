import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./components/theme-provider";
import { OnboardContextProvider } from "./context/justOnboarded";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./context/UserDataContext";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
      }}>
      <NextUIProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <OnboardContextProvider>
            <CookiesProvider defaultSetOptions={{ path: "/" }}>
              <UserProvider>
                <App />
              </UserProvider>
            </CookiesProvider>
          </OnboardContextProvider>
        </ThemeProvider>
      </NextUIProvider>
    </Auth0Provider>
  </React.StrictMode>
);
