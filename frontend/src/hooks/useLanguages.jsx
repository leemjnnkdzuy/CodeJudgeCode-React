import React, {createContext, useContext, useState, useEffect} from "react";
import i18n from "../i18n";
import {useTranslation} from "react-i18next";

const SUPPORTED_UI_LANGUAGES = {
	en: {name: "English"},
	vi: {name: "Tiếng Việt"},
};

const LanguagesContext = createContext();

const LANGUAGE_STORAGE_KEY = "language";

const setLanguageStorage = (value) => {
	try {
		localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
	} catch (error) {
		console.warn("Failed to save UI language to localStorage:", error);
	}
};

export const LanguagesProvider = ({children}) => {
	const [selectedLanguage, setSelectedLanguage] = useState(() => {
		const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if (lang && SUPPORTED_UI_LANGUAGES[lang]) return lang;
		return "vi";
	});
	const [supportedLanguages] = useState(SUPPORTED_UI_LANGUAGES);
	const {t} = useTranslation();

	useEffect(() => {
		setLanguageStorage(selectedLanguage);
		i18n.changeLanguage(selectedLanguage);
	}, [selectedLanguage]);

	useEffect(() => {
		const handleStorage = (e) => {
			if (e.key === LANGUAGE_STORAGE_KEY) {
				const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
				if (lang && SUPPORTED_UI_LANGUAGES[lang])
					setSelectedLanguage(lang);
			}
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const setLanguage = (language) => {
		if (SUPPORTED_UI_LANGUAGES[language]) {
			setSelectedLanguage(language);
		}
	};

	const getLanguageName = (language) => {
		return supportedLanguages[language]?.name || "";
	};

	const value = {
		selectedLanguage,
		setLanguage,
		supportedLanguages,
		getLanguageName,
		t,
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

	const getConfigValue = React.useCallback(
		(configObj, key, fallback = "") => {
			if (!configObj || !key) return fallback;

			const value = configObj[key];

			if (typeof value === "object" && value !== null) {
				return (
					value[context.selectedLanguage] ||
					value["en"] ||
					value["vi"] ||
					fallback
				);
			}

			return value || fallback;
		},
		[context.selectedLanguage]
	);

	const getConfigName = React.useCallback(
		(configObj, keyType = "name") => {
			return getConfigValue(configObj, keyType);
		},
		[getConfigValue]
	);

	const getConfigDescription = React.useCallback(
		(configObj) => {
			return getConfigValue(configObj, "description");
		},
		[getConfigValue]
	);

	return {
		...context,
		getConfigValue,
		getConfigName,
		getConfigDescription,
	};
};

export const useLanguageConfig = () => {
	return useLanguages();
};
