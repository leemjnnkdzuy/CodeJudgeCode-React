import React from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

const Button = ({
	children,
	to,
	href,
	onClick,
	variant = "primary",
	size = "md",
	className = "",
	icon,
	openInNewTab = false,
	...props
}) => {
	const navigate = useNavigate();

	const btnClasses = cx(
		"primaryBtn",
		`primaryBtn-${variant}`,
		`primaryBtn-${size}`,
		className
	);

	const handleClick = (e) => {
		if (onClick) {
			onClick(e);
		}

		if (to) {
			if (openInNewTab) {
				window.open(to, "_blank");
			} else {
				navigate(to);
			}
		} else if (href) {
			if (openInNewTab) {
				window.open(href, "_blank");
			} else {
				window.location.href = href;
			}
		}
	};

	return (
		<button className={btnClasses} onClick={handleClick} {...props}>
			{icon && <span className={cx("btn-icon")}>{icon}</span>}
			<span className={cx("btn-text")}>{children}</span>
		</button>
	);
};

export default Button;
