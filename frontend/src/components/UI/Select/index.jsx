import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames/bind";
import styles from "./Select.module.scss";
import {BiChevronDown, BiChevronUp} from "react-icons/bi";

const cx = classNames.bind(styles);

const Select = ({items, onSelect, children, className, selectedValue}) => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				setOpen(false);
			}
		};
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	const handleItemClick = (item) => {
		setOpen(false);
		item.onClick && item.onClick();
		onSelect && onSelect(item);
	};

	return (
		<div className={cx("selectWrapper", className)} ref={wrapperRef}>
			<div
				className={cx("selectTrigger", {open})}
				onClick={() => setOpen(!open)}
			>
				{typeof children === "function" ? children(open) : children}
				{open ? <BiChevronUp /> : <BiChevronDown />}
			</div>

			{open && (
				<div className={cx("selectMenu")}>
					{items.map((item, idx) => (
						<div
							key={idx}
							className={cx("selectItem", {
								active:
									selectedValue &&
									item.value === selectedValue,
							})}
							onClick={() => handleItemClick(item)}
						>
							{item.icon && (
								<span className={cx("selectIcon")}>
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

export default Select;
