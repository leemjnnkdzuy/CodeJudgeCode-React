import React from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

const Input = ({
	type = "text",
	placeholder,
	value,
	onChange,
	required,
	className,
	...rest
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			required={required}
			className={cx("input", className)}
			{...rest}
		/>
	);
};

export default Input;
