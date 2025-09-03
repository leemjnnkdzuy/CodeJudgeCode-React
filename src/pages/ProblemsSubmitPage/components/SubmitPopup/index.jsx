import React from "react";
import classNames from "classnames/bind";
import styles from "./SubmitPopup.module.scss";
import {Button} from "../../../../components/UI";

const cx = classNames.bind(styles);

function SubmitPopup({
	show,
	problem,
	selectedLanguage,
	codeLineCount,
	onConfirm,
	onCancel,
	isSubmitting,
}) {
	if (!show) return null;

	const getLanguageDisplayName = (language) => {
		switch (language) {
			case "python":
				return "Python 3";
			case "javascript":
				return "JavaScript";
			case "cpp":
				return "C/C++";
			case "java":
				return "Java";
			default:
				return language;
		}
	};

	return (
		<div className={cx("submit-popup-overlay", {show})}>
			<div className={cx("submit-popup")}>
				<div className={cx("submit-popup-header")}>
					<h3 className={cx("submit-popup-title")}>
						<i className='bx bx-code-alt'></i>
						Xác nhận nộp bài
					</h3>
					<button
						className={cx("submit-popup-close")}
						onClick={onCancel}
					>
						<i className='bx bx-x'></i>
					</button>
				</div>

				<div className={cx("submit-popup-body")}>
					<div className={cx("submit-popup-icon")}>
						<i className='bx bx-code-alt'></i>
					</div>

					<p className={cx("submit-popup-message")}>
						Bạn có chắc chắn muốn nộp bài giải cho bài tập{" "}
						<strong>{problem?.title}</strong> không?
					</p>

					<div className={cx("submit-popup-info")}>
						<div className={cx("submit-info-item")}>
							<i className='bx bx-code'></i>
							<span>
								Ngôn ngữ:{" "}
								<span>
									{getLanguageDisplayName(selectedLanguage)}
								</span>
							</span>
						</div>
						<div className={cx("submit-info-item")}>
							<i className='bx bx-file-blank'></i>
							<span>
								Số dòng code: <span>{codeLineCount}</span>
							</span>
						</div>
						<div className={cx("submit-info-item")}>
							<i className='bx bx-info-circle'></i>
							<span className={cx("submit-warning")}>
								Lưu ý: Sau khi nộp bài, bạn vẫn có thể nộp lại
								nhiều lần.
							</span>
						</div>
					</div>
				</div>

				<div className={cx("submit-popup-footer")}>
					<Button
						onClick={onCancel}
						variant='outline'
						disabled={isSubmitting}
					>
						<i className='bx bx-x'></i>
						Hủy bỏ
					</Button>
					<Button onClick={onConfirm} disabled={isSubmitting}>
						<i className='bx bx-send'></i>
						{isSubmitting ? "Đang nộp..." : "Xác nhận nộp bài"}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SubmitPopup;
