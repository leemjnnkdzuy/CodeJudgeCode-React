import React from "react";
import classNames from "classnames/bind";
import styles from "./ProblemsHeader.module.scss";
import {SearchBar} from "../../../../components/UI";

const cx = classNames.bind(styles);

const ProblemsHeader = ({setSearch, setPage}) => (
	<div className={cx("problems-header-sticky")}>
		<div className={cx("problems-header-content")}>
			<div className={cx("problems-header-text")}>
				<h1>Bài Tập</h1>
				<p>
					Luyện tập các bài toán lập trình để nâng cao kỹ năng của bạn
				</p>
			</div>
			<div className={cx("problems-header-search")}>
				<SearchBar
					placeholder='Tìm kiếm bài toán...'
					onSearch={(val) => {
						setSearch(val);
						setPage(1);
					}}
					className={cx("search-container")}
					size='lg'
				/>
			</div>
		</div>
	</div>
);

export default ProblemsHeader;
