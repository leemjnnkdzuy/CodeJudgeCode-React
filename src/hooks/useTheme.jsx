import React, {createContext, useState, useContext, useEffect} from "react";

const ThemeContext = createContext();

const THEME_STORAGE_KEY = "theme";

const setThemeStorage = (value) => {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, value);
	} catch (error) {
		console.warn("Failed to save theme to localStorage:", error);
	}
};

export function ThemeProvider({children}) {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const theme = localStorage.getItem(THEME_STORAGE_KEY);
		return theme === "dark";
	});

	useEffect(() => {
		const theme = isDarkMode ? "dark" : "light";
		document.documentElement.setAttribute("data-theme", theme);
		setThemeStorage(theme);
	}, [isDarkMode]);

	useEffect(() => {
		const handleStorage = (e) => {
			if (e.key === THEME_STORAGE_KEY) {
				const theme = localStorage.getItem(THEME_STORAGE_KEY);
				setIsDarkMode(theme === "dark");
			}
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => {
			const next = !prevMode;
			setThemeStorage(next ? "dark" : "light");
			return next;
		});
	};

	return (
		<ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);
