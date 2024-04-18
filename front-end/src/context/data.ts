import type { DataProvider } from "@refinedev/core";
import fetchWrapper from "@/context/fetch-wrapper";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const options = {
      method: "GET",
    };
    const response = await fetchWrapper(`${API_URL}/${resource}/${id}`, {
      ...options,
      ...meta,
    });
    const data = await response.json();
    return { data };
  },
  update: async ({ resource, id, variables, meta }) => {
    const options = {
      body: JSON.stringify(variables),
    };
    const response = await fetchWrapper(`${API_URL}/${resource}/${id}`, {
      ...options,
      ...meta,
    });
    const data = await response.json();
    return { data };
  },
  getList: async ({ resource, meta }) => {
    const options = {
      method: "GET",
    };
    const response = await fetchWrapper(`${API_URL}/${resource}`, {
      ...options,
      ...meta,
    });
    const data = await response.json();
    return { data, total: 0 };
  },
  create: async ({ resource, variables, meta }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(variables),
    };
    const response = await fetchWrapper(`${API_URL}/${resource}/`, {
      ...options,
      ...meta,
    });
    const data = await response.json();
    return { data };
  },
  deleteOne: async ({ resource, variables, meta }) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify(variables),
    };
    const response = await fetchWrapper(`${API_URL}/${resource}/`, {
      ...options,
      ...meta,
    });
    const data = await response.json();
    return { data };
  },
  getApiUrl: () => API_URL,
};

export default dataProvider;
