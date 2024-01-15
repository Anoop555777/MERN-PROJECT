import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkModeHandler() {
    setDarkMode((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkModeHandler,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDark() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("out of scope of context Provider");
  return context;
}

export { useDark, DarkModeProvider };
