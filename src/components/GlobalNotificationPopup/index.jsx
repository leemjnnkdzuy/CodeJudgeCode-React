import React from "react";
import classNames from "classnames/bind";
import styles from "./GlobalNotificationPopup.module.scss";
import {useTheme} from "../../hooks/useTheme";
import {AiFillCloseCircle} from "react-icons/ai";
import {BiErrorCircle} from "react-icons/bi";
import {BsCheckCircleFill} from "react-icons/bs";
import {IoWarning} from "react-icons/io5";

const cx = classNames.bind(styles);

const icons = {
	error: <BiErrorCircle />,
	success: <BsCheckCircleFill />,
	warning: <IoWarning />,
};

function PopupNotification({
	message,
	type = "error",
	onClose,
	duration = 3000,
}) {
	const {isDarkMode} = useTheme();
	return (
		<div className={cx("popup-container")}>
			<div
				className={cx("popup", type)}
				data-theme={isDarkMode ? "dark" : "light"}
			>
				<div className={cx("icon")}>{icons[type]}</div>
				<p className={cx("message")}>{message}</p>
				<button className={cx("close-button")} onClick={onClose}>
					<AiFillCloseCircle size={24} />
				</button>
			</div>
		</div>
	);
}

export default PopupNotification;
