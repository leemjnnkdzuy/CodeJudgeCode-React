import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SearchBar.module.scss";

const cx = classNames.bind(styles);

const SearchBar = ({
	placeholder = "Tìm kiếm bài toán...",
	onSearch,
	searchPath = "/search",
	className = "",
	size = "md",
	...props
}) => {
	const [searchValue, setSearchValue] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchValue.trim()) {
			if (onSearch) {
				onSearch(searchValue.trim());
			} else {
				navigate(
					`${searchPath}?q=${encodeURIComponent(searchValue.trim())}`
				);
			}
		}
	};

	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	};

	return (
		<div
			className={cx("searchBar", `searchBar-${size}`, className)}
			{...props}
		>
			<div className={cx("searchContainer")}>
				<input
					type='text'
					placeholder={placeholder}
					className={cx("searchInput")}
					value={searchValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				<button
					type='button'
					className={cx("searchBtn")}
					onClick={handleSubmit}
					aria-label='Tìm kiếm'
				>
					<svg
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
					>
						<circle cx='11' cy='11' r='8'></circle>
						<path d='m21 21-4.35-4.35'></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
