import { ReactNode, createContext, useState } from "react";
import { token } from ".";

interface UserMeta {
  onboarded?: boolean;
}

const UserDataContext = createContext({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const getAccessToken = () => {
    return token;
  };

  const getLoginCount = async (userId: any) => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users/${userId}?fields=logins_count`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await data.json();
    return response.logins_count;
  };

  const getOnboarding = async (userId: any) => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users/${userId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data2 = await data.text();
    const response: UserMeta = await JSON.parse(data2).user_metadata;
    const onboard =
      response?.onboarded !== undefined ? response.onboarded : false;
    return onboard;
  };

  const setOnboarding = async (userId: any, isOnboarding: boolean) => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_metadata: { onboarded: isOnboarding } }),
      }
    );
    return data.status;
  };

  const submitOnboardingData = async (userId: any, userInfo: any) => {
    const responseForName = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: userInfo.name }),
      }
    );
    let roleId;
    if (userInfo.role == "ra") {
      roleId = "rol_B4q5MnHKp5bAK3GZ";
    } else if (userInfo.role == "rec") {
      roleId = "rol_dThVMHLWvXU9omdm";
    } else {
      roleId = "rol_TEPNE600izWN97kg";
    }
    const responseForRole = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users/${userId}/roles`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roles: [roleId],
        }),
      }
    );
    return [responseForName.status, responseForRole.status];
  };

  const getUserRole = async (userId: any) => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users/${userId}/roles`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("here");
    const response = await data.json();
    return response[0].name;
  };

  const createPassChangeTicket = async (userId: any) => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/tickets/password-change`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          result_url: "http://localhost:5173",
          ttl_sec: 86400,
          mark_email_as_verified: true,
          includeEmailInRedirect: false,
        }),
      }
    );
    const response = await data.json();
    return response.ticket + "type=invite";
  };

  const createNewUser = async (userEmail: any, userPassword: any) => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userEmail,
          connection: "Username-Password-Authentication",
        }),
      }
    );
    const response = await data.json();
    return [response.user_id, response.email];
  };

  return (
    <UserDataContext.Provider
      value={{
        getAccessToken,
        getLoginCount,
        submitOnboardingData,
        setOnboarding,
        getOnboarding,
        getUserRole,
        createPassChangeTicket,
        createNewUser,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
