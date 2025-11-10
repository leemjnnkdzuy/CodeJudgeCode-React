import React, {useState, useEffect, useCallback, useMemo} from "react";
import classNames from "classnames/bind";
import {useLanguages} from "../../../../hooks/useLanguages";
import {useGlobalNotificationPopup} from "../../../../hooks/useGlobalNotificationPopup";
import {useAuth} from "../../../../hooks/useAuth";
import {Toggle, Select, Loading} from "../../../../components/UI";
import request from "../../../../utils/request";
import style from "./EditorSettingsTab.module.scss";

const cx = classNames.bind(style);

const FONT_OPTIONS = [
	{value: "'Consolas', monospace", label: "Consolas"},
	{value: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace", label: "Monaco"},
	{value: "'Fira Code', monospace", label: "Fira Code"},
	{value: "'Source Code Pro', monospace", label: "Source Code Pro"},
	{value: "'JetBrains Mono', monospace", label: "JetBrains Mono"},
	{value: "'Roboto Mono', monospace", label: "Roboto Mono"},
	{value: "'Courier New', monospace", label: "Courier New"},
	{value: "'Lucida Console', monospace", label: "Lucida Console"},
];

const FONT_SIZE_OPTIONS = [
	{value: 12, label: "12px"},
	{value: 13, label: "13px"},
	{value: 14, label: "14px"},
	{value: 15, label: "15px"},
	{value: 16, label: "16px"},
	{value: 17, label: "17px"},
	{value: 18, label: "18px"},
	{value: 19, label: "19px"},
	{value: 20, label: "20px"},
	{value: 21, label: "21px"},
	{value: 22, label: "22px"},
	{value: 23, label: "23px"},
	{value: 24, label: "24px"},
];

const THEME_OPTIONS = [
	{value: "vs-light", label: "Light"},
	{value: "vs-dark", label: "Dark"},
	{value: "hc-black", label: "High Contrast"},
	{value: "sync", label: "Sync with System"},
];

const TAB_SIZE_OPTIONS = [
	{value: 2, label: "2 spaces"},
	{value: 4, label: "4 spaces"},
	{value: 8, label: "8 spaces"},
];

const defaultSettings = {
	autoCloseBrackets: true,
	fontFamily: "'Fira Code', monospace",
	fontSize: 14,
	formatOnPaste: true,
	lineNumbers: true,
	minimap: false,
	tabSize: 4,
	theme: "sync",
	wordWrap: true,
};

const EditorSettingsTab = ({
	setLoading: propSetLoading,
	setHasChanges: propSetHasChanges,
	updateSubmitHandler: propUpdateSubmitHandler,
	resetChanges: propResetChanges,
}) => {
	const {t} = useLanguages();
	const {token} = useAuth();
	const {showNotification} = useGlobalNotificationPopup();
	const [settings, setSettings] = useState(defaultSettings);
	const [initialSettings, setInitialSettings] = useState(defaultSettings);
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
				const response = await request.getEditorSettings(token);
				if (response && response.editorSettings) {
					const fetchedSettings = response.editorSettings;
					setSettings(fetchedSettings);
					setInitialSettings(fetchedSettings);
				}
			} catch (error) {
				console.error("Failed to fetch editor settings:", error);
				showNotification(
					t("settingsPage.editorSettingsTab.loadError"),
					"error"
				);
			} finally {
				setLoading(false);
				setIsLoadingInitial(false);
			}
		};

		if (token) {
			fetchSettings();
		}
	}, [token, showNotification, setLoading, t]);

	const handleChange = (field, value) => {
		setSettings((prev) => ({...prev, [field]: value}));
	};

	const submitHandler = useCallback(
		async (e) => {
			if (e) e.preventDefault();
			setLoading(true);
			try {
				const response = await request.changeEditorSettings(
					settings,
					token
				);
				if (response.error) {
					showNotification(
						t("settingsPage.editorSettingsTab.updateError"),
						"error"
					);
				} else {
					setInitialSettings(settings);
					resetChanges();
					showNotification(
						t("settingsPage.editorSettingsTab.updateSuccess"),
						"success"
					);
				}
			} catch (error) {
				console.error("Error updating editor settings:", error);
				showNotification(
					t("settingsPage.editorSettingsTab.updateError"),
					"error"
				);
			} finally {
				setLoading(false);
			}
		},
		[settings, token, showNotification, setLoading, resetChanges, t]
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

	return (
		<div className={cx("editor-settings-tab")}>
			<div className={cx("title")}>
				{t("settingsPage.editorSettingsTab.title")}
			</div>

			<div className={cx("settings-section")}>
				<h4 className={cx("section-title")}>
					{t("settingsPage.editorSettingsTab.interfaceSection")}
				</h4>

				<div className={cx("setting-item")}>
					<label className={cx("setting-label")}>
						{t("settingsPage.editorSettingsTab.fontFamily")}
					</label>
					<Select
						items={FONT_OPTIONS.map((option) => ({
							label: option.label,
							value: option.value,
						}))}
						onSelect={(item) =>
							handleChange("fontFamily", item.value)
						}
						selectedValue={settings.fontFamily}
						className={cx("setting-select")}
					>
						{(() => {
							const current = FONT_OPTIONS.find(
								(o) => o.value === settings.fontFamily
							);
							return current ? current.label : "Select Font";
						})()}
					</Select>
				</div>
				<div className={cx("setting-item")}>
					<label className={cx("setting-label")}>
						{t("settingsPage.editorSettingsTab.fontSize")}
					</label>
					<Select
						items={FONT_SIZE_OPTIONS.map((option) => ({
							label: option.label,
							value: option.value,
						}))}
						onSelect={(item) =>
							handleChange("fontSize", item.value)
						}
						selectedValue={settings.fontSize}
						className={cx("setting-select")}
					>
						{(() => {
							const current = FONT_SIZE_OPTIONS.find(
								(o) => o.value === settings.fontSize
							);
							return current ? current.label : "Select Size";
						})()}
					</Select>
				</div>

				<div className={cx("setting-item")}>
					<label className={cx("setting-label")}>
						{t("settingsPage.editorSettingsTab.theme")}
					</label>
					<Select
						items={THEME_OPTIONS.map((option) => ({
							label: option.label,
							value: option.value,
						}))}
						onSelect={(item) => handleChange("theme", item.value)}
						selectedValue={settings.theme}
						className={cx("setting-select")}
					>
						{(() => {
							const current = THEME_OPTIONS.find(
								(o) => o.value === settings.theme
							);
							return current ? current.label : "Select Theme";
						})()}
					</Select>
				</div>
			</div>

			<div className={cx("settings-section")}>
				<h4 className={cx("section-title")}>
					{t("settingsPage.editorSettingsTab.formattingSection")}
				</h4>

				<div className={cx("setting-item")}>
					<label className={cx("setting-label")}>
						{t("settingsPage.editorSettingsTab.tabSize")}
					</label>
					<Select
						items={TAB_SIZE_OPTIONS.map((option) => ({
							label: option.label,
							value: option.value,
						}))}
						onSelect={(item) => handleChange("tabSize", item.value)}
						selectedValue={settings.tabSize}
						className={cx("setting-select")}
					>
						{(() => {
							const current = TAB_SIZE_OPTIONS.find(
								(o) => o.value === settings.tabSize
							);
							return current ? current.label : "Select Tab Size";
						})()}
					</Select>
				</div>

				<div className={cx("setting-item")}>
					<div className={cx("setting-title-label")}>
						{t("settingsPage.editorSettingsTab.wordWrap")}
					</div>
					<Toggle
						checked={settings.wordWrap}
						onChange={(value) => handleChange("wordWrap", value)}
					/>
				</div>

				<div className={cx("setting-item")}>
					<div className={cx("setting-title-label")}>
						{t("settingsPage.editorSettingsTab.lineNumbers")}
					</div>
					<Toggle
						checked={settings.lineNumbers}
						onChange={(value) => handleChange("lineNumbers", value)}
					/>
				</div>

				<div className={cx("setting-item")}>
					<div className={cx("setting-title-label")}>
						{t("settingsPage.editorSettingsTab.minimap")}
					</div>
					<Toggle
						checked={settings.minimap}
						onChange={(value) => handleChange("minimap", value)}
					/>
				</div>

				<div className={cx("setting-item")}>
					<div className={cx("setting-title-label")}>
						{t("settingsPage.editorSettingsTab.autoCloseBrackets")}
					</div>
					<Toggle
						checked={settings.autoCloseBrackets}
						onChange={(value) =>
							handleChange("autoCloseBrackets", value)
						}
					/>
				</div>

				<div className={cx("setting-item")}>
					<div className={cx("setting-title-label")}>
						{t("settingsPage.editorSettingsTab.formatOnPaste")}
					</div>
					<Toggle
						checked={settings.formatOnPaste}
						onChange={(value) =>
							handleChange("formatOnPaste", value)
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditorSettingsTab;
