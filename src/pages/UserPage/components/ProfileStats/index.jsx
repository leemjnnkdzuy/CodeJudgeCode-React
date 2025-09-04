import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileStats.module.scss";

const cx = classNames.bind(styles);

const ProfileStats = ({stats}) => {
	if (!stats || (!stats.difficulty && !stats.submissions)) {
		return (
			<div className={cx("profile-section")}>
				<h2 className={cx("section-title")}>Thống kê</h2>
				<p className={cx("no-content")}>Chưa có dữ liệu thống kê.</p>
			</div>
		);
	}

	return (
		<div className={cx("profile-section")}>
			<h2 className={cx("section-title")}>Thống kê</h2>
			<div className={cx("stats-grid")}>
				{stats.difficulty &&
					stats.difficulty.map((difficulty, index) => (
						<div key={index} className={cx("stat-card")}>
							<span className={cx("stat-value")}>
								{difficulty.solved_count}
							</span>
							<span className={cx("stat-desc")}>
								{difficulty.difficulty} solved
							</span>
						</div>
					))}

				{stats.submissions &&
					stats.submissions.map((submission, index) => (
						<div key={index} className={cx("stat-card")}>
							<span className={cx("stat-value")}>
								{submission.count}
							</span>
							<span className={cx("stat-desc")}>
								{submission.status}
							</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default ProfileStats;
