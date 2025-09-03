import React from "react";
import classNames from "classnames/bind";
import styles from "./SubmissionsTab.module.scss";
import {DropDown} from "../../../../../components/UI";

const cx = classNames.bind(styles);

function SubmissionsTab({
	userSubmissions,
	allSubmissions,
	submissionsView,
	onSubmissionsViewChange,
}) {
	const handleViewChange = (view) => {
		onSubmissionsViewChange(view);
	};

	const submissionsItems = [
		{
			label: "Bài nộp của bạn",
			value: "my-submissions",
			onClick: () => handleViewChange("my-submissions"),
		},
		{
			label: "Tất cả bài nộp",
			value: "all-submissions",
			onClick: () => handleViewChange("all-submissions"),
		},
	];

	const getStatusClass = (status) => {
		const normalizedStatus = status?.toLowerCase().replace(/[_\s]/g, "_");
		switch (normalizedStatus) {
			case "accepted":
				return "status-accepted";
			case "wrong_answer":
				return "status-wrong_answer";
			case "time_limit_exceeded":
				return "status-time_limit_exceeded";
			case "memory_limit_exceeded":
				return "status-memory_limit_exceeded";
			case "runtime_error":
				return "status-runtime_error";
			case "compilation_error":
				return "status-compilation_error";
			default:
				return "status-failed";
		}
	};

	const getLanguageColor = (language) => {
		switch (language?.toLowerCase()) {
			case "python":
				return "language-python";
			case "javascript":
				return "language-javascript";
			case "c/c++":
			case "cpp":
			case "c++":
				return "language-cpp";
			case "java":
				return "language-java";
			default:
				return "";
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return (
			date.toLocaleDateString("vi-VN") +
			" " +
			date.toLocaleTimeString("vi-VN")
		);
	};

	const renderSubmissionItem = (submission, isPublic = false) => (
		<div
			key={submission.id}
			className={cx("submission-item", getStatusClass(submission.status))}
		>
			<div className={cx("submission-header")}>
				<div className={cx("submission-status")}>
					<span className={cx("status-text")}>
						{submission.status
							.replace(/_/g, " ")
							.replace(/\b\w/g, (l) => l.toUpperCase())}
					</span>
				</div>
				<div className={cx("submission-meta")}>
					{isPublic && submission.username && (
						<span className={cx("submission-user")}>
							<i className='bx bx-user'></i>
							{submission.username}
						</span>
					)}
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
					<span className={cx("detail-label")}>Độ khó:</span>
					<span
						className={cx(
							"detail-value",
							`difficulty-${submission.problemDifficulty?.toLowerCase()}`
						)}
					>
						{submission.problemDifficulty}
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

	return (
		<>
			<div className={cx("submissions-global-header")}>
				<div className={cx("submissions-toggle")}>
					<DropDown
						className={cx("submissions-select")}
						items={submissionsItems}
						onSelect={(item) => handleViewChange(item.value)}
					>
						{(open) => (
							<span>
								<i
									className={
										submissionsView === "my-submissions"
											? "bx bx-user"
											: "bx bx-globe"
									}
								></i>
								{submissionsView === "my-submissions"
									? "Bài nộp của bạn"
									: "Tất cả bài nộp"}
								<i
									className={
										open
											? "bx bx-chevron-up"
											: "bx bx-chevron-down"
									}
								></i>
							</span>
						)}
					</DropDown>
				</div>
			</div>

			<div className={cx("submissions-view-container")}>
				{submissionsView === "my-submissions" ? (
					<div className={cx("problem-section", "submissions-view")}>
						{userSubmissions?.length > 0 ? (
							<div className={cx("submissions-container")}>
								{userSubmissions.map((submission) =>
									renderSubmissionItem(submission)
								)}
							</div>
						) : (
							<div className={cx("empty-state")}>
								<i className='bx bx-code-alt'></i>
								<p>Bạn chưa nộp bài nào cho bài tập này.</p>
								<p>Hãy viết code và nộp bài để xem kết quả!</p>
							</div>
						)}
					</div>
				) : (
					<div className={cx("problem-section", "submissions-view")}>
						<div
							className={cx(
								"submissions-container",
								"all-submissions"
							)}
						>
							{allSubmissions?.length > 0 ? (
								allSubmissions.map((submission) =>
									renderSubmissionItem(submission, true)
								)
							) : (
								<div className={cx("empty-state")}>
									<i className='bx bx-code-alt'></i>
									<p>Chưa có submission nào cho bài này.</p>
									<p>
										Hãy thử giải bài để trở thành người đầu
										tiên!
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default SubmissionsTab;
