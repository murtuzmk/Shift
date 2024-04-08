import { useOutletContext } from "react-router-dom";
import { Auth0ContextInterface } from "@auth0/auth0-react";

export function useUser() {
  return useOutletContext<Auth0ContextInterface>();
}
