import { GenericError, ResponseError } from "@/types";
import { MetaQuery } from "@refinedev/core";

// Fetch wrapper using custom fetch and error handling
const fetchWrapper = async (url: string, options?: RequestInit | MetaQuery) => {
  const response = await customFetch(url, options);
  // to re-read response if we need to use it more than once
  const responseClone = response.clone();
  try {
    const body = await responseClone.json();

    const error = getErrors(body);

    if (error) {
      throw error;
    }
  } catch {}
  return response;
};

export default fetchWrapper;

// Add authorization header to fetch request
const customFetch = async (url: string, options?: RequestInit | MetaQuery) => {
  // get headers from request options
  const headers = options?.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
};

const getErrors = (
  body: Record<"errors", ResponseError | undefined>
): GenericError | null => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: 500,
      statusText: "INTERNAL_SERVER_ERROR",
    };
  }
  if ("errors" in body) {
    const errors = body?.errors;
    const messages = errors?.message;
    const code = errors?.status;
    const text = errors?.statusText;
    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
      statusText: text,
    };
  }
  return null;
};
