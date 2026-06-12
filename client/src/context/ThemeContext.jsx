import { createContext, useContext, useState } from "react";
import { themes } from "../constants/colors";
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
    const [mode, setMode] = useState("light");
    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light")); };
    const colors = themes[mode];
    return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
        <div style={{ backgroundColor: colors.pageBg, minHeight: "100vh" }}>
            {children}
        </div>
    </ThemeContext.Provider>);}

export function useTheme() { return useContext(ThemeContext);}