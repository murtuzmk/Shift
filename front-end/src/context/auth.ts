import { AuthProvider } from "@refinedev/core";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { getManagementAccessToken } from "./auth-man";
import fetchWrapper from "./fetch-wrapper";

const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const MAN_API_URL = `https://${DOMAIN}/api/v2`;

export const useAuthProvider = () => {
  const { isLoading, user, logout, getIdTokenClaims } = useAuth0();
  const authProvider: AuthProvider = {
    login: async () => {
      // This login function is for auth0's management api
      try {
        const accessToken = await getManagementAccessToken();
        localStorage.setItem("man_auth", accessToken);
        return {
          success: true,
        };
      } catch (e) {
        const error = e as Error;
        localStorage.removeItem("man_auth");
        return {
          success: false,
          error: {
            message: "message" in error ? error.message : "Request failed",
            name:
              "name" in error
                ? error.name
                : "Couldn't get management api access token",
          },
        };
      }
    },
    logout: async () => {
      localStorage.removeItem("man_auth");
      logout({ logoutParams: { returnTo: window.location.origin } });
      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          };
          return {
            authenticated: true,
          };
        }
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Token not found",
          },
          redirectTo: "/",
          logout: true,
        };
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("man_auth")}`,
            Accept: "application/json",
          },
        };
        const response = await fetchWrapper(
          `${MAN_API_URL}/users/${user.sub}`,
          options
        );
        let data = await response.json();
        data.sub = data.user_id;
        return {
          ...data,
        };
      }
      return null;
    },
  };
  return { isLoading, authProvider };
};
