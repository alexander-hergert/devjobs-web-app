import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/normalize.css";
import "./styles/index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <Auth0Provider
      domain="dev-8xdmup6cvgzbmjkw.us.auth0.com"
      clientId="mjN11zl0Oqw4J0UdG6I15fv90tCGb9aA"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </>
);
