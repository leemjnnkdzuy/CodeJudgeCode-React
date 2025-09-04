import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileSubmissions.module.scss";

const cx = classNames.bind(styles);

const ProfileSubmissions = ({submissions = []}) => {
	if (!submissions || submissions.length === 0) {
		return null;
	}

	const formatDateTime = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("vi-VN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className={cx("profile-section")}>
			<h2 className={cx("section-title")}>Submissions gần đây</h2>
			<div className={cx("submissions-list")}>
				{submissions.map((submission, index) => (
					<div key={index} className={cx("submission-item")}>
						<div className={cx("submission-info")}>
							<span className={cx("problem-title")}>
								{submission.problemTitle}
							</span>
							<span
								className={cx(
									"submission-status",
									`status-${submission.status.toLowerCase()}`
								)}
							>
								{submission.status}
							</span>
						</div>
						<div className={cx("submission-meta")}>
							<span className={cx("language")}>
								{submission.language}
							</span>
							<span className={cx("time")}>
								{formatDateTime(submission.submittedAt)}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProfileSubmissions;
