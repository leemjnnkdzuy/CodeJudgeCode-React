import React from "react";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale-extreme.css";
import styles from "./Tooltip.module.scss";

const cx = classNames.bind(styles);

const Tooltip = ({
	content,
	children,
	placement = "top",
	theme = "light",
	arrow = true,
	className,
	...rest
}) => {
	return (
		<Tippy
			content={
				<div className={cx("tooltip-content", className)}>
					{content}
				</div>
			}
			placement={placement}
			theme={theme}
			arrow={arrow}
			{...rest}
		>
			{children}
		</Tippy>
	);
};

export default Tooltip;
