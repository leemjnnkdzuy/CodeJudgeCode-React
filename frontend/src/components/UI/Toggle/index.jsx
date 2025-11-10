import React from "react";
import classNames from "classnames/bind";
import styles from "./Toggle.module.scss";

const cx = classNames.bind(styles);

function Toggle({checked, onChange, disabled = false, className}) {
	const handleToggle = () => {
		if (!disabled && onChange) {
			onChange(!checked);
		}
	};

	return (
		<div className={cx("toggle-container", className)}>
			<label className={cx("toggle-label")}>
				<input
					type='checkbox'
					checked={checked}
					onChange={handleToggle}
					disabled={disabled}
					className={cx("toggle-input")}
				/>
				<span className={cx("toggle-slider")}></span>
			</label>
		</div>
	);
}

export default Toggle;
