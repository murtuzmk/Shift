import dotenv from 'dotenv';
dotenv.config();
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

let auth0: Auth0Client | null = null;

export async function createClient() {
  auth0 = await createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    redirect_uri: 'http://localhost:3000/callback'
  });
}

export async function login() {
  if (!auth0) return;
  await auth0.loginWithRedirect();
}

export function logout() {
  if (!auth0) return;
  auth0.logout();
}

export async function getUser() {
  if (!auth0) return;
  return await auth0.getUser();
}

export async function handleRedirectCallback() {
  if (!auth0) return;
  const isAuthenticated = await auth0.isAuthenticated();

  if (!isAuthenticated) {
    const query = window.location.search;
    if (query.includes('code=') && query.includes('state=')) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, '/');
    }
  }

  updateUI();
}

export async function updateUI() {
  if (!auth0) return;
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // show the authenticated user's UI
  } else {
    // show the unauthenticated user's UI
  }
}
