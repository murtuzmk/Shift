import Button from "../components/Button";
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Landing page for Shift.
 * Renders the landing page with a welcome message and login/signup buttons.
 */
const Landing = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <main className="bg-gray-400 h-screen flex flex-col justify-center items-center space gap-4">
      <h1 className="text-9xl font-bold">Welcome to Shift!</h1>
      <p className="text-4xl font-medium">The best app for RA scheduling!</p>
      <div className="flex justify-between mt-8 gap-8 ">
        {/* <Button>Log in</Button>
        <Button>Sign up</Button> */}
        {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
        ) : (
          <button onClick={loginWithRedirect}>Log In</button>
        )}
      </div>
    </main>
  );
};

export default Landing;
