import React, {useState, useRef, useEffect} from "react";
import {createPopper} from "@popperjs/core";
import classNames from "classnames/bind";
import styles from "./DropDown.module.scss";

const cx = classNames.bind(styles);

const DropDown = ({items, onSelect, children}) => {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef();
	const menuRef = useRef();
	const popperInstance = useRef();

	useEffect(() => {
		if (open && triggerRef.current && menuRef.current) {
			popperInstance.current = createPopper(
				triggerRef.current,
				menuRef.current,
				{
					placement: "bottom-end", // mặc định như MUI Menu
					modifiers: [
						{
							name: "flip",
							options: {
								fallbackPlacements: [
									"top-end",
									"bottom-start",
									"top-start",
								],
							},
						},
						{
							name: "preventOverflow",
							options: {
								padding: 8,
							},
						},
					],
				}
			);
		}
		return () => {
			if (popperInstance.current) {
				popperInstance.current.destroy();
				popperInstance.current = null;
			}
		};
	}, [open]);

	// đóng khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				triggerRef.current &&
				!triggerRef.current.contains(event.target) &&
				menuRef.current &&
				!menuRef.current.contains(event.target)
			) {
				setOpen(false);
			}
		};
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<div className={cx("dropdownWrapper")}>
			<div
				ref={triggerRef}
				onClick={() => setOpen((v) => !v)}
				className={cx("dropdownTrigger")}
			>
				{children}
			</div>

			{open && (
				<div ref={menuRef} className={cx("dropdownMenu")}>
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
