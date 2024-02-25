import { useAuth0 } from "@auth0/auth0-react";

export const NavbarApp = () => {
  const { logout } = useAuth0();
  return (
    <header className="bg-gray-500 py-5 flex justify-center gap-x-6">
      <h1 className="text-2xl font-semibold">NavbarApp</h1>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log out
      </button>
    </header>
  );
};
