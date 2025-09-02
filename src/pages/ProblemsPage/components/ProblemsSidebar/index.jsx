import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./ProblemsSidebar.module.scss";
import TYPE_PROBLEM from "../../../../config/styleProblemConfig";
import {Button} from "../../../../components/UI";

const cx = classNames.bind(styles);

function ProblemsSidebar({
	difficulty,
	handleDifficultyChange,
	status,
	handleStatusChange,
	DIFFICULTY_LABELS,
	selectedTypes = [],
	handleTypeClick = () => {},
}) {
	const [showAllTypes, setShowAllTypes] = useState(false);
	const problemTypeEntries = Object.entries(TYPE_PROBLEM);

	return (
		<div className={cx("problems-sidebar")}>
			<div className={cx("problem-types-container")}>
				<h3>Loại Bài Toán</h3>
				<div className={cx("problem-types-list")}>
					{problemTypeEntries.length ? (
						problemTypeEntries.map(([key, type], idx) => {
							const isHidden = !showAllTypes && idx >= 10;
							const Icon = type.icon;
							return (
								<div
									className={cx("problem-type-item", {
										active: selectedTypes.includes(
											key.toLowerCase()
										),
										hidden: isHidden,
									})}
									data-type={key}
									key={key}
									onClick={() =>
										handleTypeClick(key.toLowerCase())
									}
									title={type.name}
								>
									{Icon ? (
										<Icon
											style={{
												fontSize: 18,
												marginRight: 6,
											}}
										/>
									) : (
										<i className='bx bx-code'></i>
									)}
									<span>
										{type.name || key.replace(/_/g, " ")}
									</span>
								</div>
							);
						})
					) : (
						<div className={cx("problem-type-item")}>
							<i className='bx bx-error'></i>
							<span>Không thể tải danh sách loại bài toán</span>
						</div>
					)}
				</div>
				<Button
					className={cx("toggle-types-btn")}
					onClick={() => setShowAllTypes((v) => !v)}
					type='button'
					variant='outline'
				>
					<span>{showAllTypes ? "Ẩn bớt" : "Xem nhiều hơn"}</span>
					<i
						className={`bx bx-chevron-${
							showAllTypes ? "up" : "down"
						}`}
					></i>
				</Button>
			</div>

			<div className={cx("difficulty-section")}>
				<h3>Độ Khó</h3>
				<div className={cx("difficulty-filters")}>
					{["easy", "medium", "hard"].map((key) => (
						<label className={cx("difficulty-filter")} key={key}>
							<input
								type='checkbox'
								checked={difficulty[key]}
								onChange={() => handleDifficultyChange(key)}
							/>
							<span className={cx("difficulty-label", key)}>
								{DIFFICULTY_LABELS[key]}
							</span>
						</label>
					))}
				</div>
			</div>

			<div className={cx("status-section")}>
				<h3>Trạng Thái</h3>
				<div className={cx("status-filters")}>
					{[
						{key: "all", label: "Tất cả"},
						{key: "solved", label: "Đã giải"},
						{key: "unsolved", label: "Chưa giải"},
					].map((s) => (
						<label className={cx("status-filter")} key={s.key}>
							<input
								type='checkbox'
								checked={status === s.key}
								onChange={() => handleStatusChange(s.key)}
							/>
							<span>{s.label}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProblemsSidebar;
