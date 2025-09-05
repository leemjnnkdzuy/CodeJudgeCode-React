import React, {useState, useEffect, useCallback, useMemo} from "react";
import classNames from "classnames/bind";
import {Loading, Select} from "../../../../components/UI";
import {useAuth} from "../../../../hooks/useAuth";
import {useGlobalNotificationPopup} from "../../../../hooks/useGlobalNotificationPopup";
import {useTheme} from "../../../../hooks/useTheme";
import request from "../../../../utils/request";
import style from "./InterfaceAndLanguageTab.module.scss";

const cx = classNames.bind(style);

const InterfaceAndLanguageTab = ({
	setLoading: propSetLoading,
	setHasChanges: propSetHasChanges,
	updateSubmitHandler: propUpdateSubmitHandler,
	resetChanges: propResetChanges,
}) => {
	const {token} = useAuth();
	const {showNotification} = useGlobalNotificationPopup();
	const {theme, toggleTheme} = useTheme();
	const [settings, setSettings] = useState({
		language: "en",
		theme: "light",
	});
	const [initialSettings, setInitialSettings] = useState({
		language: "en",
		theme: "light",
	});
	const [isLoadingInitial, setIsLoadingInitial] = useState(true);

	const setLoading = useMemo(
		() => propSetLoading || (() => {}),
		[propSetLoading]
	);
	const setHasChanges = useMemo(
		() => propSetHasChanges || (() => {}),
		[propSetHasChanges]
	);
	const updateSubmitHandler = useMemo(
		() => propUpdateSubmitHandler || (() => {}),
		[propUpdateSubmitHandler]
	);
	const resetChanges = useMemo(
		() => propResetChanges || (() => {}),
		[propResetChanges]
	);

	useEffect(() => {
		const fetchSettings = async () => {
			setIsLoadingInitial(true);
			setLoading(true);
			try {
				const response = await request.getInterfaceAndLanguage(token);
				if (!response.error && response.settings) {
					const fetchedSettings = response.settings;
					setSettings(fetchedSettings);
					setInitialSettings(fetchedSettings);
				}
			} catch (error) {
				console.error("Failed to fetch settings:", error);
				showNotification("Failed to load settings", "error");
			} finally {
				setLoading(false);
				setIsLoadingInitial(false);
			}
		};
		if (token) {
			fetchSettings();
		}
	}, [token, showNotification, setLoading]);

	const handleSelectChange = (name, value) => {
		setSettings((prev) => ({...prev, [name]: value}));
	};

	const submitHandler = useCallback(
		async (e) => {
			if (e) e.preventDefault();
			setLoading(true);
			try {
				const response = await request.changeInterfaceAndLanguage(
					settings,
					token
				);
				if (response.error) {
					showNotification("Failed to update settings", "error");
				} else {
					setInitialSettings(settings);
					resetChanges();
					showNotification(
						"Settings updated successfully",
						"success"
					);
					if (settings.theme !== theme) {
						toggleTheme();
					}
				}
			} catch (error) {
				showNotification("An error occurred", "error");
			} finally {
				setLoading(false);
			}
		},
		[
			settings,
			token,
			showNotification,
			setLoading,
			resetChanges,
			theme,
			toggleTheme,
		]
	);

	useEffect(() => {
		updateSubmitHandler(submitHandler);
	}, [updateSubmitHandler, submitHandler]);

	useEffect(() => {
		const hasChanges =
			JSON.stringify(settings) !== JSON.stringify(initialSettings);
		setHasChanges(hasChanges);
	}, [settings, initialSettings, setHasChanges]);

	if (isLoadingInitial) {
		return (
			<div className={cx("loading-container")}>
				<Loading size={50} />
			</div>
		);
	}

	const languageOptions = [
		{value: "en", label: "English"},
		{value: "vi", label: "Tiếng Việt"},
	];

	const themeOptions = [
		{value: "light", label: "Light"},
		{value: "dark", label: "Dark"},
	];

	const getSelectedLabel = (options, value) => {
		const option = options.find((opt) => opt.value === value);
		return option ? option.label : value;
	};

	return (
		<div className={cx("interface-language-tab")}>
			<div className={cx("title")}>Ngôn ngữ và Chủ đề</div>
			<form onSubmit={submitHandler} className={cx("form")}>
				<div className={cx("form-group")}>
					<label>Ngôn ngữ</label>
					<Select
						items={languageOptions}
						selectedValue={settings.language}
						className={cx("setting-select")}
						onSelect={(item) =>
							handleSelectChange("language", item.value)
						}
					>
						{() =>
							getSelectedLabel(languageOptions, settings.language)
						}
					</Select>
				</div>
				<div className={cx("form-group")}>
					<label>Chủ đề</label>
					<Select
						items={themeOptions}
						selectedValue={settings.theme}
						className={cx("setting-select")}
						onSelect={(item) =>
							handleSelectChange("theme", item.value)
						}
					>
						{() => getSelectedLabel(themeOptions, settings.theme)}
					</Select>
				</div>
			</form>
		</div>
	);
};

export default InterfaceAndLanguageTab;
