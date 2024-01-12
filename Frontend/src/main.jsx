import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { UserContextProvider } from "./store/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
