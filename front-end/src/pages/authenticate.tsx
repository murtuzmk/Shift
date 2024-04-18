import JustOnboardedContext from "@/context/justOnboarded";
import { LoadingCard } from "@/components/ui/loading-card";
import {
  getManagementAccessToken,
  revalidateManagementAccessToken,
} from "@/context/auth-man";
import { VerifiedUser } from "@/types";
import { User } from "@auth0/auth0-react";
import { useGetIdentity, useLogin } from "@refinedev/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: loginToManagementApi } = useLogin();
  const { data } = useGetIdentity({ queryOptions: { enabled: !isLoading } });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      loginToManagementApi(
        {},
        {
          onSuccess: (data) => {
            if (!data.success) {
              // TODO: Implement logout on error
              console.log(data.error);
              try {
                (async () => {
                  await revalidateManagementAccessToken();
                })();
              } catch (e) {
                console.log(e);
              }
            }
            // console.log("You can now use the management api");
            setIsLoading(false);
          },
        }
      );
    }
    if (data) {
      const user = data as VerifiedUser;
      const onboarded = user.user_metadata?.onboarded;
      if (!onboarded) {
        // TODO: Navigate to onboarding page
        console.log("You need to onboard");
        navigate("/onboarding");
      } else {
        // TODO: Navigate to dashboard
        console.log("You are onboarded");
        navigate("/dashboard");
      }
    }
  }, [isLoading, loginToManagementApi, data]);
  return isLoading ? <LoadingCard /> : null;
};
export default Authenticate;
