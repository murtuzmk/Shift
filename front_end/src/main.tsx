import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createClient, handleRedirectCallback } from './auth';

createClient();
window.addEventListener('load', handleRedirectCallback);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <App />
  </React.StrictMode>,
  document.getElementById('root')
)
