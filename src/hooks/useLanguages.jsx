import React, {createContext, useContext, useState, useEffect} from "react";
import {SUPPORTED_LANGUAGES} from "../config/supportedLanguagesConfig";

const LanguagesContext = createContext();

const LANGUAGE_STORAGE_KEY = "language";

const setLanguageStorage = (value) => {
	try {
		localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
	} catch (error) {
		console.warn("Failed to save language to localStorage:", error);
	}
};

export const LanguagesProvider = ({children}) => {
	const [selectedLanguage, setSelectedLanguage] = useState(() => {
		const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if (lang) return lang;
		return "vi";
	});
	const [supportedLanguages] = useState(SUPPORTED_LANGUAGES);

	useEffect(() => {
		setLanguageStorage(selectedLanguage);
	}, [selectedLanguage]);

	useEffect(() => {
		const handleStorage = (e) => {
			if (e.key === LANGUAGE_STORAGE_KEY) {
				const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
				if (lang) setSelectedLanguage(lang);
			}
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const setLanguage = (language) => {
		setSelectedLanguage(language);
	};

	const getTemplate = (language) => {
		return supportedLanguages[language]?.template || "";
	};

	const value = {
		selectedLanguage,
		setLanguage,
		supportedLanguages,
		getTemplate,
	};

	return (
		<LanguagesContext.Provider value={value}>
			{children}
		</LanguagesContext.Provider>
	);
};

export const useLanguages = () => {
	const context = useContext(LanguagesContext);
	if (!context) {
		throw new Error("useLanguages must be used within a LanguagesProvider");
	}
	return context;
};
