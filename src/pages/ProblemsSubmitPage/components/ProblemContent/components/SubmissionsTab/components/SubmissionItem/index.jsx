import React from "react";
import classNames from "classnames/bind";
import styles from "./SubmissionItem.module.scss";

const cx = classNames.bind(styles);

function SubmissionItem({
	submission,
	isPublic = false,
	getStatusClass,
	getLanguageColor,
	formatDate,
	onClick,
}) {
	return (
		<div
			className={cx("submission-item", getStatusClass(submission.status))}
			onClick={() => onClick(submission)}
		>
			<div className={cx("submission-header")}>
				<div className={cx("submission-meta")}>
					<span className={cx("submission-time")}>
						<i className='bx bx-time'></i>
						{formatDate(submission.submittedAt)}
					</span>
				</div>
			</div>
			<div className={cx("submission-details")}>
				<div className={cx("detail-item")}>
					<span className={cx("detail-label")}>Ngôn ngữ:</span>
					<span
						className={cx(
							"detail-value",
							getLanguageColor(submission.language)
						)}
					>
						{submission.language}
					</span>
				</div>
				<div className={cx("detail-item")}>
					<span className={cx("detail-label")}>Kết quả:</span>
					<span className={cx("status-text")}>
						{submission.status
							.replace(/_/g, " ")
							.replace(/\b\w/g, (l) => l.toUpperCase())}
					</span>
				</div>
				{submission.test_cases_passed &&
					submission.total_test_cases && (
						<div className={cx("detail-item")}>
							<span className={cx("detail-label")}>
								Test cases:
							</span>
							<span className={cx("detail-value")}>
								{submission.test_cases_passed}/
								{submission.total_test_cases}
							</span>
						</div>
					)}
				{submission.status === "accepted" &&
					(submission.execution_time > 0 ||
						submission.memory_usage > 0) && (
						<>
							{submission.execution_time && (
								<div className={cx("detail-item")}>
									<span className={cx("detail-label")}>
										Thời gian:
									</span>
									<span className={cx("detail-value")}>
										{submission.execution_time}ms
									</span>
								</div>
							)}
							{submission.memory_usage && (
								<div className={cx("detail-item")}>
									<span className={cx("detail-label")}>
										Bộ nhớ:
									</span>
									<span className={cx("detail-value")}>
										{Number(
											submission.memory_usage
										).toFixed(2)}
										MB
									</span>
								</div>
							)}
						</>
					)}
				{submission.error_message && (
					<div className={cx("detail-item", "error-message")}>
						<span className={cx("detail-label")}>Lỗi:</span>
						<span className={cx("detail-value")}>
							{submission.error_message}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default SubmissionItem;
