import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

function Loading({size}) {
	const style = {};

	if (typeof size === "string") {
		style.width = size;
		style.height = size;
		style.minHeight = size;
	}

	return (
		<div
			className={cx("loading", {
				size: typeof size === "boolean" ? size : false,
			})}
			style={style}
		/>
	);
}

export default Loading;
