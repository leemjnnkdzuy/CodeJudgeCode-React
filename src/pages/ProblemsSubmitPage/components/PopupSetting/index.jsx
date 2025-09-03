import React, {useState, useEffect, useRef} from "react";
import classNames from "classnames/bind";
import styles from "./PopupSetting.module.scss";
import {Button, Toggle} from "../../../../components/UI";
import {useTheme} from "../../../../hooks/useTheme";

const cx = classNames.bind(styles);

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

function PopupSetting({isOpen, onClose, settings, onSettingsChange}) {
	const popupRef = useRef(null);
	const {isDarkMode} = useTheme();

	const [localSettings, setLocalSettings] = useState(() => {
		return {
			fontFamily: "'Consolas', monospace",
			fontSize: 14,
			theme: "sync",
			tabSize: 4,
			wordWrap: true,
			lineNumbers: true,
			minimap: false,
			autoCloseBrackets: true,
			formatOnPaste: true,
			...settings,
		};
	});

	useEffect(() => {
		if (isOpen) {
			setLocalSettings({
				fontFamily: "'Consolas', monospace",
				fontSize: 14,
				theme: settings?.theme || "sync",
				tabSize: 4,
				wordWrap: true,
				lineNumbers: true,
				minimap: false,
				autoCloseBrackets: true,
				formatOnPaste: true,
				...settings,
			});
		}
	}, [isOpen, settings, isDarkMode]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				onClose();
			}
		};

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	const handleSettingChange = (key, value) => {
		setLocalSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleApply = () => {
		onSettingsChange(localSettings);
		onClose();
	};

	const handleReset = () => {
		const defaultSettings = {
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
		setLocalSettings(defaultSettings);
	};

	if (!isOpen) return null;

	return (
		<div className={cx("popup-overlay")}>
			<div ref={popupRef} className={cx("popup-container")}>
				<div className={cx("popup-header")}>
					<h3 className={cx("popup-title")}>Cài đặt</h3>
					<button className={cx("close-btn")} onClick={onClose}>
						<i className='bx bx-x'></i>
					</button>
				</div>

				<div className={cx("popup-content")}>
					<div className={cx("settings-section")}>
						<h4 className={cx("section-title")}>Giao diện</h4>

						<div className={cx("setting-item")}>
							<label className={cx("setting-label")}>
								Font chữ:
							</label>
							<select
								className={cx("setting-select")}
								value={localSettings.fontFamily}
								onChange={(e) =>
									handleSettingChange(
										"fontFamily",
										e.target.value
									)
								}
							>
								{FONT_OPTIONS.map((font) => (
									<option key={font.value} value={font.value}>
										{font.label}
									</option>
								))}
							</select>
						</div>

						<div className={cx("setting-item")}>
							<label className={cx("setting-label")}>
								Kích thước chữ:
							</label>
							<select
								className={cx("setting-select")}
								value={localSettings.fontSize}
								onChange={(e) =>
									handleSettingChange(
										"fontSize",
										parseInt(e.target.value)
									)
								}
							>
								{FONT_SIZE_OPTIONS.map((size) => (
									<option key={size.value} value={size.value}>
										{size.label}
									</option>
								))}
							</select>
						</div>

						<div className={cx("setting-item")}>
							<label className={cx("setting-label")}>
								Theme:
							</label>
							<select
								className={cx("setting-select")}
								value={localSettings.theme}
								onChange={(e) =>
									handleSettingChange("theme", e.target.value)
								}
							>
								{THEME_OPTIONS.map((theme) => (
									<option
										key={theme.value}
										value={theme.value}
									>
										{theme.label}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className={cx("settings-section")}>
						<h4 className={cx("section-title")}>Định dạng</h4>

						<div className={cx("setting-item")}>
							<label className={cx("setting-label")}>
								Tab size:
							</label>
							<select
								className={cx("setting-select")}
								value={localSettings.tabSize}
								onChange={(e) =>
									handleSettingChange(
										"tabSize",
										parseInt(e.target.value)
									)
								}
							>
								{TAB_SIZE_OPTIONS.map((tab) => (
									<option key={tab.value} value={tab.value}>
										{tab.label}
									</option>
								))}
							</select>
						</div>

						<div className={cx("setting-item")}>
							<div className={cx("setting-title-label")}>
								Xuống dòng tự động
							</div>
							<Toggle
								checked={localSettings.wordWrap}
								onChange={(value) =>
									handleSettingChange("wordWrap", value)
								}
							/>
						</div>

						<div className={cx("setting-item")}>
							<div className={cx("setting-title-label")}>
								Hiển thị số dòng
							</div>
							<Toggle
								checked={localSettings.lineNumbers}
								onChange={(value) =>
									handleSettingChange("lineNumbers", value)
								}
							/>
						</div>

						<div className={cx("setting-item")}>
							<div className={cx("setting-title-label")}>
								Hiển thị minimap
							</div>
							<Toggle
								checked={localSettings.minimap}
								onChange={(value) =>
									handleSettingChange("minimap", value)
								}
								label=''
							/>
						</div>

						<div className={cx("setting-item")}>
							<div className={cx("setting-title-label")}>
								Tự động đóng ngoặc
							</div>
							<Toggle
								checked={localSettings.autoCloseBrackets}
								onChange={(value) =>
									handleSettingChange(
										"autoCloseBrackets",
										value
									)
								}
							/>
						</div>

						<div className={cx("setting-item")}>
							<div className={cx("setting-title-label")}>
								Định dạng khi paste
							</div>
							<Toggle
								checked={localSettings.formatOnPaste}
								onChange={(value) =>
									handleSettingChange("formatOnPaste", value)
								}
							/>
						</div>
					</div>
				</div>

				<div className={cx("popup-footer")}>
					<Button
						variant='outline'
						size='sm'
						icon={<i className='bx bx-refresh'></i>}
						onClick={handleReset}
						className={cx("reset-btn")}
					>
						Đặt lại mặc định
					</Button>
					<div className={cx("action-buttons")}>
						<Button variant='outline' size='sm' onClick={onClose}>
							Hủy
						</Button>
						<Button size='sm' onClick={handleApply}>
							Áp dụng
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PopupSetting;
