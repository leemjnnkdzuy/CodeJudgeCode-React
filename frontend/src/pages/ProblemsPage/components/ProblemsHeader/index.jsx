import React, {useState, useEffect, useCallback} from "react";
import classNames from "classnames/bind";
import {useLanguages} from "../../../../hooks/useLanguages";
import styles from "./ProblemsHeader.module.scss";
import {SearchBar} from "../../../../components/UI";
import useDebounce from "../../../../hooks/useDebounce";

const cx = classNames.bind(styles);

const ProblemsHeader = ({setSearch}) => {
	const {t} = useLanguages();
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
					<h1>{t("problemsPage.header.title")}</h1>
					<p>{t("problemsPage.header.subtitle")}</p>
				</div>
				<div className={cx("problems-header-search")}>
					<SearchBar
						placeholder={t("problemsPage.header.searchPlaceholder")}
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
