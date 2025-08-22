import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames/bind";
import styles from "./DropDown.module.scss";

const cx = classNames.bind(styles);

const DropDown = ({items, onSelect, children, align = "right"}) => {
	const [open, setOpen] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setOpen(false);
			}
		};
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<div className={cx("dropdownWrapper")} ref={ref}>
			<div
				onClick={() => setOpen((v) => !v)}
				className={cx("dropdownTrigger")}
			>
				{children}
			</div>
			{open && (
				<div
					className={cx(
						"dropdownMenu",
						align === "left" ? "left" : "right"
					)}
				>
					{items.map((item, idx) => (
						<div
							key={idx}
							className={cx(
								"dropdownItem",
								item.danger && "danger"
							)}
							onClick={() => {
								setOpen(false);
								setTimeout(() => {
									item.onClick && item.onClick();
									onSelect && onSelect(item);
								}, 100);
							}}
						>
							{item.icon && (
								<span className={cx("dropdownIcon")}>
									{item.icon}
								</span>
							)}
							<span>{item.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DropDown;
