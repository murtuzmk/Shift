import type { DataProvider } from "@refinedev/core";
import fetchWrapper from "./fetch-wrapper";
import { GenericError, GenericResponse } from "@/types";
const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID_API;
const CLIENT_SECRET = import.meta.env.VITE_AUTH0_CLIENT_SECRET_API;

const MAN_API_URL = `https://${DOMAIN}/api/v2`;
const TOKEN_URL = `https://${DOMAIN}/oauth/token`;

type tokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: "Bearer";
};

export const getManagementAccessToken = async () => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience: `${MAN_API_URL}/`,
    }),
  };
  const response = await fetchWrapper(`${TOKEN_URL}`, options);
  const data: tokenResponse = await response.json();
  return data.access_token;
};

export const revalidateManagementAccessToken = async () => {
  const accessToken = localStorage.getItem("man_auth");
  if (!accessToken) {
    const newAccessToken = await getManagementAccessToken();
    localStorage.setItem("man_auth", newAccessToken);
  } else {
    try {
      // This is a dummy request to check if the token is still valid
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      };
      const response = await fetchWrapper(`${MAN_API_URL}/users`, options);
    } catch (e) {
      const error = e as GenericError;
      if (error.statusCode === 401) {
        const newAccessToken = await getManagementAccessToken();
        localStorage.setItem("man_auth", newAccessToken);
      } else {
        throw e;
      }
    }
  }
};

const authManDataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const accessToken = localStorage.getItem("man_auth");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      ...meta,
    };
    const response = await fetchWrapper(
      `${MAN_API_URL}/${resource}/${id}`,
      options
    );
    const data = await response.json();
    return { data };
  },
  update: async ({ resource, id, variables, meta }) => {
    const accessToken = localStorage.getItem("man_auth");
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      body: JSON.stringify(variables),
      ...meta,
    };
    const response = await fetchWrapper(
      resource == "usersRoles"
        ? `${MAN_API_URL}/users/${id}/roles`
        : `${MAN_API_URL}/${resource}/${id}`,
      options
    );
    let data;
    try {
      data = await response.json();
    } catch (e) {
      const genericResponse: GenericResponse = {
        statusCode: response.status,
        statusText: response.statusText,
      };
      data = genericResponse;
    }
    return { data };
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const accessToken = localStorage.getItem("man_auth");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      ...meta,
    };
    const response = await fetchWrapper(`${MAN_API_URL}/${resource}`, options);
    const data = await response.json();
    return { data, total: 0 };
  },
  create: async ({ resource, variables, meta }) => {
    const accessToken = localStorage.getItem("man_auth");
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      body: JSON.stringify(variables),
      ...meta,
    };
    const response = await fetchWrapper(`${MAN_API_URL}/${resource}/`, options);
    const data = await response.json();
    return { data };
  },
  deleteOne: async ({ resource, variables, meta, id }) => {
    const accessToken = localStorage.getItem("man_auth");
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      body: JSON.stringify(variables),
      ...meta,
    };
    const response = await fetchWrapper(
      resource == "usersRoles"
        ? `${MAN_API_URL}/users/${id}/roles`
        : `${MAN_API_URL}/${resource}/${id}`,
      options
    );
    let data;
    try {
      data = await response.json();
    } catch (e) {
      const genericResponse: GenericResponse = {
        statusCode: response.status,
        statusText: response.statusText,
      };
      data = genericResponse;
    }
    return { data };
  },
  getApiUrl: () => MAN_API_URL,
};

export default authManDataProvider;
