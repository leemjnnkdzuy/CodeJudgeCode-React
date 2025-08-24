import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileStats.module.scss";
import RANK from "../../../../config/rankingConfig";

const cx = classNames.bind(styles);

export default function ProfileStats({user, userBadges = []}) {
	// Tính tiến trình level dựa trên rating
	const getLevelProgress = (rating) => {
		if (typeof rating !== "number" || rating === -1)
			return {percent: 0, label: "Chưa có xếp hạng"};

		const ranks = Object.values(RANK)
			.filter((r) => typeof r.order === "number")
			.sort((a, b) => a.order - b.order);

		// rank hiện tại
		let current = ranks.find(
			(r) => rating >= r.min_rating && rating <= r.max_rating
		);

		if (!current) {
			// thấp hơn rank đầu
			if (rating < ranks[0].min_rating) {
				return {percent: 0, label: `đến ${ranks[0].name}`};
			}
			// cao hơn rank cuối
			const last = ranks[ranks.length - 1];
			if (rating >= last.min_rating) {
				return {percent: 100, label: last.name};
			}
			return {percent: 0, label: "Chưa có xếp hạng"};
		}

		// nếu rank cao nhất
		const maxOrder = Math.max(...ranks.map((r) => r.order));
		if (current.order === maxOrder)
			return {percent: 100, label: current.name};

		// tiến trình tới rank tiếp theo
		const next = ranks.find((r) => r.order === current.order + 1);
		if (!next) return {percent: 100, label: current.name};

		const rangeStart = Math.max(current.min_rating, 0);
		const rangeEnd = Math.max(next.min_rating, rangeStart + 1);
		const denom = rangeEnd - rangeStart;
		const rawPercent =
			denom > 0 ? ((rating - rangeStart) / denom) * 100 : 100;
		const percent = Math.min(100, Math.max(0, Math.round(rawPercent)));

		return {percent, label: `${rating} - đến ${next.name}`};
	};

	const {percent, label} = getLevelProgress(user?.rating);

	return (
		<>
			<div className={cx("top-section")}>
				<div className={cx("welcome-header")}>
					<h1>
						Chào mừng,{" "}
						<b>
							{user
								? `${user.first_name || ""} ${
										user.last_name || ""
								  }`.trim()
								: "Người dùng"}
						</b>{" "}
						!
					</h1>
					<p className={cx("welcome-subtitle")}>
						Bạn đang làm rất tốt! Hãy tiếp tục hoặc bắt đầu điều gì
						đó mới.
					</p>
				</div>

				<div className={cx("right-stats")}>
					<div className={cx("stat")}>
						<p>Chuỗi Đăng Nhập</p>
						<div className={cx("stat-score")}>
							{user?.login_streak ?? 0}
						</div>
						<br />
						<small>
							ngày{" "}
							{user?.login_streak > 0 ? (
								<span className={cx("record-text")}>
									– tuyệt vời!
								</span>
							) : (
								""
							)}
						</small>
					</div>

					<div className={cx("stat")}>
						<p>Tiến Trình Cấp Độ</p>
						<div
							className={cx("circle")}
							style={{"--progress": percent}}
						>
							<span className={cx("circle-text")}>
								{percent}%
							</span>
						</div>
						<small>{label}</small>
					</div>
				</div>
			</div>

			<div className={cx("bottom-stats")}>
				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-code-alt'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>Bài Tập</p>
						<div className={cx("stat-connection")}>
							<strong>{user?.total_problems_solved ?? 0}</strong>
							<small>đã giải quyết</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-trophy'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>Cuộc Thi</p>
						<div className={cx("stat-connection")}>
							<strong>0</strong>
							<small>đã tham gia</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-send'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>Bài Nộp</p>
						<div className={cx("stat-connection")}>
							<strong>{user?.total_submissions ?? 0}</strong>
							<small>đã gửi</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-chat'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>Thảo Luận</p>
						<div className={cx("stat-connection")}>
							<strong>0</strong>
							<small>đã đăng</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-medal'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>Thành Tích</p>
						<div className={cx("stat-connection")}>
							<strong>{userBadges.length}</strong>
							<small>đã đạt được</small>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
