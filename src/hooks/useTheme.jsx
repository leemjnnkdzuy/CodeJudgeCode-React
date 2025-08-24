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

const getUserFromStorage = () => {
	try {
		const raw = localStorage.getItem("userInfo");
		if (!raw) return null;
		return JSON.parse(raw);
	} catch (error) {
		console.warn("Failed to parse userInfo from localStorage:", error);
		return null;
	}
};

export function ThemeProvider({children}) {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const user = getUserFromStorage();
		if (user && user.theme) {
			return user.theme === "dark";
		}
		return false;
	});

	useEffect(() => {
		const theme = isDarkMode ? "dark" : "light";
		document.documentElement.setAttribute("data-theme", theme);
		setThemeStorage(theme);
		const user = getUserFromStorage();
		if (user) {
			try {
				user.theme = theme;
				localStorage.setItem("userInfo", JSON.stringify(user));
			} catch (e) {
			}
		}
	}, [isDarkMode]);

	useEffect(() => {
		const handleStorage = (e) => {
			if (e.key === "userInfo") {
				const user = getUserFromStorage();
				if (user && user.theme) {
					setIsDarkMode(user.theme === "dark");
				} else {
					setIsDarkMode(false);
				}
			}
			if (e.key === THEME_STORAGE_KEY) {
				const user = getUserFromStorage();
				if (!user) {
					setIsDarkMode(false);
				}
			}
		};

		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => {
			const next = !prevMode;
			const user = getUserFromStorage();
			if (user) {
				try {
					user.theme = next ? "dark" : "light";
					localStorage.setItem("userInfo", JSON.stringify(user));
				} catch (e) {
				}
			} else {
				setThemeStorage(next ? "dark" : "light");
			}
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
