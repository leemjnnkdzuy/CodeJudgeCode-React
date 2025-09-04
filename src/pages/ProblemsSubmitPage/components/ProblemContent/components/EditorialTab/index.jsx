import React, {useState, useEffect} from "react";
import classNames from "classnames/bind";
import styles from "./EditorialTab.module.scss";
import request from "../../../../../../utils/request";

const cx = classNames.bind(styles);

function EditorialTab({problemId, token, solution: propSolution}) {
	const [localSolution, setLocalSolution] = useState(propSolution);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLocalSolution(propSolution);
	}, [propSolution]);

	useEffect(() => {
		if (!localSolution && problemId && token) {
			const fetchSolution = async () => {
				setLoading(true);
				setError(null);

				try {
					const response = await request.getProblemSolution(
						problemId,
						token
					);

					if (response) {
						setLocalSolution(response);
					} else {
						setLocalSolution(null);
					}
				} catch (err) {
					setError(err.message || "Không thể tải lời giải");
					setLocalSolution(null);
				} finally {
					setLoading(false);
				}
			};

			fetchSolution();
		}
	}, [problemId, token, localSolution]);

	if (loading) {
		return (
			<div className={cx("problem-section")}>
				<div className={cx("problem-description")}>
					<div className={cx("loading-state")}>
						<i className='bx bx-loader-alt bx-spin'></i>
						<p>Đang tải lời giải...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={cx("problem-section")}>
				<div className={cx("problem-description")}>
					<div className={cx("error-state")}>
						<i className='bx bx-error-circle'></i>
						<p>{error}</p>
					</div>
				</div>
			</div>
		);
	}

	if (localSolution.pass !== "true") {
		return (
			<div className={cx("problem-section")}>
				<div className={cx("problem-description")}>
					<div className={cx("empty-state")}>
						<i className='bx bx-lock-alt'></i>
						<p>Hãy thử giải bài toán trước khi xem lời giải!</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={cx("problem-section")}>
			<div className={cx("section-title")}>
				<i className='bx bx-bulb'></i>
				Lời giải
			</div>

			<div className={cx("problem-description")}>
				<div className={cx("solution-content")}>
					<div className={cx("solution-text")}>
						<h3>Giải thích</h3>
						<div
							dangerouslySetInnerHTML={{
								__html: localSolution.solution
									? localSolution.solution.replace(
											/\n/g,
											"<br />"
									  )
									: "Không có nội dung giải thích",
							}}
						/>
					</div>

					{localSolution.source && (
						<div className={cx("solution-code")}>
							<h3>Mã nguồn ({localSolution.language})</h3>
							<pre>
								<code>{localSolution.source}</code>
							</pre>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default EditorialTab;
