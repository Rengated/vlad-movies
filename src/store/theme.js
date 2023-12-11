import { useState } from "react";
import { createContext } from "react";

export const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("black");

  const toggleTheme = () =>
    setCurrentTheme((prev) => (prev == "black" ? "white" : "black"));

  return (
    <Theme.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};
