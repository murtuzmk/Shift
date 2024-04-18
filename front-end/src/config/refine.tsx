import { useAuthProvider } from "@/context/auth";
import authManDataProvider from "@/context/auth-man";
import dataProvider from "@/context/data";
import routerBindings from "@refinedev/react-router-v6";
import resources from "./resources";

const useRefineProps = () => {
  const { authProvider } = useAuthProvider();
  const refineProps = {
    dataProvider: {
      default: dataProvider,
      authMan: authManDataProvider,
    },
    routerProvider: routerBindings,
    authProvider: authProvider,
    resources: resources,
    options: {
      syncWithLocation: true,
      warnWhenUnsavedChanges: true,
      useNewQueryKeys: true,
      projectId: "NhpceU-rfOfu0-XhvdAS",
    },
  };
  return refineProps;
};
export default useRefineProps;
