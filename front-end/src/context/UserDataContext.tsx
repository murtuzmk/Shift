import { ReactNode, createContext, useState } from "react";
import fetchWrapper from "./fetch-wrapper";
import { MAN_API_URL } from "./auth-man";
import { VerifiedUser } from "@/types";
// import { token } from ".";

interface UserMeta {
  onboarded?: boolean;
}

const UserDataContext = createContext({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("man_auth");
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
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetchWrapper(
      `${MAN_API_URL}/users/${userId}`,
      options
    );
    // const data = await fetch(
    //   `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users/${userId}/roles`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/json",
    //       authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    const data = await response.json();
    const user = data as VerifiedUser;
    return user.user_metadata.role;
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

  const getUsers = async () => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/users`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await data.json();
    const users = await response.map((user: any) => {
      return {
        id: user.user_id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      };
    });
    return users;
  };

  const getUsersWithRole = async (roleId: string) => {
    const data = await fetch(
      `https://dev-e7jyddja3xm6p30e.us.auth0.com/api/v2/roles/${roleId}/users`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await data.json();
    return response;
  };

  const getRAs = async () => {
    const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const response = await fetchWrapper(
          `${MAN_API_URL}/users`,
          options
        );
    const data = await response.json();
    const users = data as VerifiedUser[];
    const ras = users.filter((user) => user.user_metadata.role == "Resident Assistant");
    const finalRas = ras.map((ra)=> {return {id: ra.user_id,
      name: ra.name,
      email: ra.email,
      picture: ra.picture,}})
    return finalRas;
  };

  const getREAs = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetchWrapper(
        `${MAN_API_URL}/users`,
        options
      );
  const data = await response.json();
  const users = data as VerifiedUser[];
  const reas = users.filter((user) => user.user_metadata.role == "Resident Education Assistant");
  const finalReas = reas.map((rea)=> {return {id: rea.user_id,
    name: rea.name,
    email: rea.email,
    picture: rea.picture,}})
  return finalReas;
  };

  const getRECs = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetchWrapper(
        `${MAN_API_URL}/users`,
        options
      );
  const data = await response.json();
  const users = data as VerifiedUser[];
  const recs = users.filter((user) => user.user_metadata.role == "Resident Education Coordinator");
  const finalRecs = recs.map((rec)=> {return {id: rec.user_id,
    name: rec.name,
    email: rec.email,
    picture: rec.picture,}})
  return finalRecs;
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
        getUsers,
        getUsersWithRole,
        getRAs,
        getREAs,
        getRECs,
      }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
