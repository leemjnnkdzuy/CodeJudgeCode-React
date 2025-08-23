import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileStats.module.scss";

const cx = classNames.bind(styles);

export default function ProfileStats({
	user,
	userBadges = [],
	getLevelProgress,
}) {
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
						<strong>{user?.login_streak ?? 0}</strong>
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
						{typeof user?.rating === "number" &&
						user.rating !== -1 ? (
							<div className={cx("circle")}>
								{getLevelProgress(user.rating)}%
							</div>
						) : (
							<div className={cx("circle")}>0%</div>
						)}
						<small>
							{typeof user?.rating === "number" &&
							user.rating !== -1
								? "đến Chuyên Gia"
								: "Chưa có xếp hạng"}
						</small>
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
