import React, {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProblemSubmitHeader.module.scss";
import {useAuth} from "../../../../hooks/useAuth";
import {Button, Tooltip, DropDown} from "../../../../components/UI";
import {base64ToImage} from "../../../../helper/avatarBase64Helper";
import PopupSetting from "../PopupSetting";

const cx = classNames.bind(styles);

function ProblemSubmitHeader({onBack, editorSettings, onEditorSettingsChange}) {
	const [userInfo, setUserInfo] = useState(null);
	const [showStopwatch, setShowStopwatch] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const [showSettings, setShowSettings] = useState(false);
	const intervalRef = useRef(null);
	const {logout} = useAuth();
	const navigate = useNavigate();

	const dropdownItems = [
		{
			label: "Hồ sơ",
			onClick: () => navigate("/profile"),
			icon: <i className='bx bx-user'></i>,
		},
		{
			label: "Cài đặt",
			onClick: () => navigate("/settings"),
			icon: <i className='bx bx-cog'></i>,
		},
		{
			label: "Đăng xuất",
			onClick: async () => {
				await logout();
				navigate("/");
			},
			icon: <i className='bx bx-log-out'></i>,
			danger: true,
		},
	];

	useEffect(() => {
		try {
			const stored = localStorage.getItem("userInfo");
			if (stored) {
				setUserInfo(JSON.parse(stored));
			}
		} catch (e) {
			setUserInfo(null);
		}
	}, []);

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = setInterval(() => {
				setElapsed((prev) => prev + 1);
			}, 1000);
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		return () => clearInterval(intervalRef.current);
	}, [isRunning]);

	const handleToggleStopwatch = () => setShowStopwatch((v) => !v);
	const handleStartStop = () => setIsRunning((r) => !r);
	const handleReset = () => {
		setElapsed(0);
		setIsRunning(false);
	};
	const handleToggleSettings = () => setShowSettings((v) => !v);
	const handleSettingsChange = (newSettings) => {
		onEditorSettingsChange?.(newSettings);
	};

	function formatTime(sec) {
		const m = Math.floor(sec / 60)
			.toString()
			.padStart(2, "0");
		const s = (sec % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	}

	return (
		<div className={cx("header-container")}>
			<Button
				className={cx("back-btn")}
				variant='outline'
				size='sm'
				icon={<i className='bx bx-arrow-back'></i>}
				onClick={onBack}
			>
				<span>Quay lại</span>
			</Button>
			<div className={cx("problem-content")}></div>
			<div className={cx("right-icons")}>
				<i
					className={cx("icon", "bx bx-cog")}
					onClick={handleToggleSettings}
					style={{cursor: "pointer"}}
				></i>
				<div
					className={cx("stopwatch-container", {
						expanded: showStopwatch,
					})}
					onClick={!showStopwatch ? handleToggleStopwatch : undefined}
				>
					{!showStopwatch &&
						(isRunning && elapsed > 0 ? (
							<Tooltip
								content={`${formatTime(elapsed)}`}
								className={cx("tooltip")}
								position='bottom'
							>
								<i
									className={cx("icon", "bx bx-time-five")}
								></i>
							</Tooltip>
						) : (
							<i className={cx("icon", "bx bx-time-five")}></i>
						))}
					{showStopwatch && (
						<div
							className={cx("stopwatch-expanded")}
							onClick={(e) => e.stopPropagation()}
						>
							<i
								className={cx("time-icon", "bx bx-time-five")}
								onClick={handleToggleStopwatch}
							></i>
							<span className={cx("time-display")}>
								{formatTime(elapsed)}
							</span>
							<button
								className={cx("start-stop-btn")}
								onClick={handleStartStop}
							>
								<i
									className={cx(
										"btn-icon",
										isRunning ? "bx bx-pause" : "bx bx-play"
									)}
								></i>
							</button>
							<button
								className={cx("reset-btn")}
								onClick={handleReset}
							>
								<i
									className={cx("btn-icon", "bx bx-refresh")}
								></i>
							</button>
						</div>
					)}
				</div>
				{userInfo?.avatar && (
					<DropDown items={dropdownItems} align='right'>
						<img
							src={base64ToImage(userInfo.avatar)}
							alt='avatar'
							className={cx("avatar-img")}
						/>
					</DropDown>
				)}
			</div>
			<PopupSetting
				isOpen={showSettings}
				onClose={() => setShowSettings(false)}
				settings={editorSettings}
				onSettingsChange={handleSettingsChange}
			/>
		</div>
	);
}

export default ProblemSubmitHeader;
