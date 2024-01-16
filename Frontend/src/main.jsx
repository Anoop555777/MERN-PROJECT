import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { UserContextProvider } from "./store/UserContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
