import React, { createContext, useContext, useState } from "react";
import { SUPPORTED_LANGUAGES } from "../config/supportedLanguagesConfig";

const LanguagesContext = createContext();

export const LanguagesProvider = ({ children }) => {
	const [selectedLanguage, setSelectedLanguage] = useState('python');
	const [supportedLanguages] = useState(SUPPORTED_LANGUAGES);

	const getTemplate = (language) => {
		return supportedLanguages[language]?.template || '';
	};

	const value = {
		selectedLanguage,
		setSelectedLanguage,
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
