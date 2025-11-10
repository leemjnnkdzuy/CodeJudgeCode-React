import {useState, useEffect, useCallback} from "react";
import {useTheme} from "./useTheme";

const DEFAULT_EDITOR_SETTINGS = {
	fontFamily: "'Consolas', monospace",
	fontSize: 14,
	theme: "sync",
	tabSize: 4,
	wordWrap: true,
	lineNumbers: true,
	minimap: false,
	autoCloseBrackets: true,
	formatOnPaste: true,
};

export const useEditorSettings = () => {
	const {isDarkMode} = useTheme();
	const [editorSettings, setEditorSettingsState] = useState(
		DEFAULT_EDITOR_SETTINGS
	);

	useEffect(() => {
		try {
			const savedSettings = localStorage.getItem("editorSettings");
			if (savedSettings) {
				const parsedSettings = JSON.parse(savedSettings);
				setEditorSettingsState(parsedSettings);
			}
		} catch (error) {
			console.warn("Could not load editor settings:", error);
		}
	}, []);

	useEffect(() => {
		const handleStorageChange = (e) => {
			if (e.key === "editorSettings" && e.newValue) {
				try {
					const parsedSettings = JSON.parse(e.newValue);
					setEditorSettingsState(parsedSettings);
				} catch (error) {
					console.warn("Could not parse editor settings:", error);
				}
			}
		};

		const handleCustomUpdate = (e) => {
			if (e.detail) {
				const mergedSettings = {
					...DEFAULT_EDITOR_SETTINGS,
					...e.detail,
				};
				setEditorSettingsState(mergedSettings);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		window.addEventListener("editorSettingsUpdated", handleCustomUpdate);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener(
				"editorSettingsUpdated",
				handleCustomUpdate
			);
		};
	}, []);

	useEffect(() => {
		setEditorSettingsState((prevSettings) => {
			if (prevSettings.theme === "sync") {
				const appTheme = isDarkMode ? "vs-dark" : "vs-light";
				const updatedSettings = {
					...prevSettings,
					theme: "sync",
					_appTheme: appTheme,
				};
				localStorage.setItem(
					"editorSettings",
					JSON.stringify(updatedSettings)
				);
				return updatedSettings;
			}
			return prevSettings;
		});
	}, [isDarkMode]);

	const updateEditorSettings = useCallback(
		(newSettings) => {
			const updatedSettings = {...editorSettings, ...newSettings};
			setEditorSettingsState(updatedSettings);
			localStorage.setItem(
				"editorSettings",
				JSON.stringify(updatedSettings)
			);
		},
		[editorSettings]
	);

	const loadFromApiResponse = useCallback((apiResponse) => {
		if (apiResponse?.editorSettings) {
			const apiSettings = apiResponse.editorSettings;
			const mergedSettings = {...DEFAULT_EDITOR_SETTINGS, ...apiSettings};
			setEditorSettingsState(mergedSettings);
			localStorage.setItem(
				"editorSettings",
				JSON.stringify(mergedSettings)
			);
		}
	}, []);

	const resetToDefaults = useCallback(() => {
		setEditorSettingsState(DEFAULT_EDITOR_SETTINGS);
		localStorage.setItem(
			"editorSettings",
			JSON.stringify(DEFAULT_EDITOR_SETTINGS)
		);
	}, []);

	return {
		editorSettings,
		updateEditorSettings,
		loadFromApiResponse,
		resetToDefaults,
	};
};
