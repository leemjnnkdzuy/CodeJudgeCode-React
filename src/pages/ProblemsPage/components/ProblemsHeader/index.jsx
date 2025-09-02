import React, {useState, useEffect, useCallback} from "react";
import classNames from "classnames/bind";
import styles from "./ProblemsHeader.module.scss";
import {SearchBar} from "../../../../components/UI";
import useDebounce from "../../../../hooks/useDebounce";

const cx = classNames.bind(styles);

const ProblemsHeader = ({setSearch}) => {
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearchTerm = useDebounce(searchInput, 1000);

	useEffect(() => {
		setSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm, setSearch]);

	const handleSearch = useCallback(
		(val) => {
			setSearchInput(val);
			if (!val.trim()) {
				setSearch("");
			}
		},
		[setSearch]
	);

	const handleSearchSubmit = useCallback(
		(val) => {
			setSearch(val);
		},
		[setSearch]
	);

	return (
		<div className={cx("problems-header-sticky")}>
			<div className={cx("problems-header-content")}>
				<div className={cx("problems-header-text")}>
					<h1>Bài Tập</h1>
					<p>
						Luyện tập các bài toán lập trình để nâng cao kỹ năng của
						bạn
					</p>
				</div>
				<div className={cx("problems-header-search")}>
					<SearchBar
						placeholder='Tìm kiếm bài toán...'
						onSearch={handleSearch}
						onSubmit={handleSearchSubmit}
						className={cx("search-container")}
						size='lg'
					/>
				</div>
			</div>
		</div>
	);
};

export default ProblemsHeader;
