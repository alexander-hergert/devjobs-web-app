import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/normalize.css";
import "./styles/index.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./api/apiSlice.js";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Auth0Provider
        domain="dev-8xdmup6cvgzbmjkw.us.auth0.com"
        clientId="mjN11zl0Oqw4J0UdG6I15fv90tCGb9aA"
        // audience="http://localhost:3000/"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </ApiProvider>
  </React.StrictMode>
);
