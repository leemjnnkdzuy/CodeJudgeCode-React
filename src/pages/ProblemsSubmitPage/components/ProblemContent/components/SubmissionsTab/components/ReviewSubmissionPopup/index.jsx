import React, {useCallback} from "react";
import classNames from "classnames/bind";
import styles from "./ReviewSubmissionPopup.module.scss";
import Editor from "@monaco-editor/react";
import {useTheme} from "../../../../../../../../hooks/useTheme";

const cx = classNames.bind(styles);

function getMonacoLanguage(language) {
	switch (language) {
		case "python":
			return "python";
		case "javascript":
			return "javascript";
		case "c/c++":
			return "cpp";
		case "java":
			return "java";
		default:
			return "plaintext";
	}
}

function ReviewSubmissionPopup({submission, isOpen, onClose, editorSettings}) {
	const {isDarkMode} = useTheme();

	const getEditorTheme = useCallback(() => {
		if (!editorSettings?.theme) return "vs-light";

		if (editorSettings.theme === "sync") {
			return isDarkMode ? "vs-dark" : "vs-light";
		}

		return editorSettings.theme;
	}, [editorSettings?.theme, isDarkMode]);
	if (!isOpen || !submission) return null;

	return (
		<div className={cx("popup-overlay")} onClick={onClose}>
			<div
				className={cx("popup-content")}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={cx("popup-header")}>
					<h3>Chi tiết Submission</h3>
					<button className={cx("close-btn")} onClick={onClose}>
						<i className='bx bx-x'></i>
					</button>
				</div>
				<div className={cx("popup-body")}>
					{submission.username && (
						<div className={cx("detail-row")}>
							<span className={cx("label")}>Người nộp:</span>
							<span className={cx("value")}>
								{submission.username}
							</span>
						</div>
					)}
					<div className={cx("detail-row")}>
						<span className={cx("label")}>Thời gian nộp:</span>
						<span className={cx("value")}>
							{new Date(submission.submittedAt).toLocaleString(
								"vi-VN"
							)}
						</span>
					</div>
					<div className={cx("detail-row")}>
						<span className={cx("label")}>Ngôn ngữ:</span>
						<span className={cx("value")}>
							{submission.language}
						</span>
					</div>
					<div className={cx("detail-row")}>
						<span className={cx("label")}>Kết quả:</span>
						<span className={cx("value")}>
							{submission.status
								.replace(/_/g, " ")
								.replace(/\b\w/g, (l) => l.toUpperCase())}
						</span>
					</div>
					{submission.test_cases_passed &&
						submission.total_test_cases && (
							<div className={cx("detail-row")}>
								<span className={cx("label")}>Test cases:</span>
								<span className={cx("value")}>
									{submission.test_cases_passed}/
									{submission.total_test_cases}
								</span>
							</div>
						)}
					{submission.execution_time && (
						<div className={cx("detail-row")}>
							<span className={cx("label")}>
								Thời gian thực thi:
							</span>
							<span className={cx("value")}>
								{submission.execution_time}ms
							</span>
						</div>
					)}
					{submission.memory_usage && (
						<div className={cx("detail-row")}>
							<span className={cx("label")}>Bộ nhớ sử dụng:</span>
							<span className={cx("value")}>
								{Number(submission.memory_usage).toFixed(2)} MB
							</span>
						</div>
					)}
					{submission.error_message && (
						<div className={cx("detail-row")}>
							<span className={cx("label")}>Lỗi:</span>
							<span className={cx("value", "error")}>
								{submission.error_message}
							</span>
						</div>
					)}
					{submission.code && (
						<div className={cx("detail-row", "code-row")}>
							<span className={cx("label")}>Code:</span>
							<div className={cx("code-editor-container")}>
								<Editor
									height='450px'
									language={getMonacoLanguage(
										submission.language
									)}
									value={submission.code}
									theme={getEditorTheme()}
									options={{
										readOnly: true,
										scrollBeyondLastLine: false,
										automaticLayout: true,
										minimap: {
											enabled:
												editorSettings?.minimap ||
												false,
										},
										lineNumbers: editorSettings?.lineNumbers
											? "on"
											: "off",
										fontSize:
											editorSettings?.fontSize || 14,
										fontFamily:
											editorSettings?.fontFamily ||
											"'Consolas', monospace",
										tabSize: editorSettings?.tabSize || 4,
										insertSpaces: true,
										wordWrap: editorSettings?.wordWrap
											? "on"
											: "off",
										renderWhitespace: "selection",
										quickSuggestions: false,
										parameterHints: {enabled: false},
										suggestOnTriggerCharacters: false,
										acceptSuggestionOnEnter: "off",
										tabCompletion: "off",
										wordBasedSuggestions: false,
										semanticHighlighting: {enabled: false},
										"semanticTokens.enabled": false,
									}}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ReviewSubmissionPopup;
