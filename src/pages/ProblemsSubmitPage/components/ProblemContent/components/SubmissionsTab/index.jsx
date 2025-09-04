import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./SubmissionsTab.module.scss";
import {DropDown} from "../../../../../../components/UI";
import {
	SubmissionItem,
	ReviewSubmissionPopup,
	PublicSubmissionItem,
} from "./components/";

const cx = classNames.bind(styles);

function SubmissionsTab({
	userSubmissions,
	allSubmissions,
	submissionsView,
	onSubmissionsViewChange,
	editorSettings,
}) {
	const [selectedSubmission, setSelectedSubmission] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleViewChange = (view) => {
		onSubmissionsViewChange(view);
	};

	const handleSubmissionClick = (submission) => {
		setSelectedSubmission(submission);
		setIsPopupOpen(true);
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
								{userSubmissions.map((submission) => (
									<SubmissionItem
										key={submission.id}
										submission={submission}
										isPublic={false}
										getStatusClass={getStatusClass}
										getLanguageColor={getLanguageColor}
										formatDate={formatDate}
										onClick={handleSubmissionClick}
									/>
								))}
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
								allSubmissions.map((submission) => (
									<PublicSubmissionItem
										key={submission.id}
										submission={submission}
										isPublic={true}
										getStatusClass={getStatusClass}
										getLanguageColor={getLanguageColor}
										formatDate={formatDate}
										onClick={handleSubmissionClick}
									/>
								))
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
			<ReviewSubmissionPopup
				submission={selectedSubmission}
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				editorSettings={editorSettings}
			/>
		</>
	);
}

export default SubmissionsTab;
