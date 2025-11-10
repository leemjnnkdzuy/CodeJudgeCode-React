import React from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import {BiTime, BiPlay, BiCheck, BiX} from "react-icons/bi";
import styles from "./ProblemsItem.module.scss";

const cx = classNames.bind(styles);

function ProblemsItem({
	problem,
	problemTypes,
	difficultyLabels,
	formatSolvedCount,
}) {
	const navigate = useNavigate();
	const getType = (type) => problemTypes.find((t) => t.key === type);
	return (
		<div
			className={cx("problem-item")}
			data-id={problem.id}
			data-slug={problem.slug}
			onClick={() => {
				if (problem.slug) {
					navigate(`/problems/${problem.slug}`);
				}
			}}
			role='button'
			tabIndex={0}
			onKeyPress={(e) => {
				if ((e.key === "Enter" || e.key === " ") && problem.slug) {
					navigate(`/problems/${problem.slug}`);
				}
			}}
		>
			<div className={cx("problem-info")}>
				<h3 className={cx("problem-title")}>{problem.title}</h3>
				<div className={cx("problem-tags")}>
					{problem.problem_types.slice(0, 4).map((type) => {
						const t = getType(type);
						if (!t) return null;
						return (
							<span
								className={cx("tag")}
								title={t.name}
								key={type}
							>
								<i className={`bx ${t.icon}`}></i>
								{t.name}
							</span>
						);
					})}
				</div>
			</div>
			<div className={cx("problem-meta")}>
				<span className={cx("difficulty", problem.difficulty)}>
					{difficultyLabels[problem.difficulty] || problem.difficulty}
				</span>
				<span className={cx("solved-count")}>
					{formatSolvedCount(problem.solved_count)} đã giải
				</span>
				{problem.user_status && problem.user_status !== "none" && (
					<span className={cx("status-badge", problem.user_status)}>
						{problem.user_status === "pending" && (
							<>
								<BiTime className={cx("status-icon")} />
								Đang chờ
							</>
						)}
						{problem.user_status === "running" && (
							<>
								<BiPlay className={cx("status-icon")} />
								Đang chạy
							</>
						)}
						{problem.user_status === "accepted" && (
							<>
								<BiCheck className={cx("status-icon")} />
								Đã giải
							</>
						)}
						{problem.user_status === "wrong_answer" && (
							<>
								<BiX className={cx("status-icon")} />
								Sai đáp án
							</>
						)}
						{problem.user_status === "time_limit_exceeded" && (
							<>
								<BiTime className={cx("status-icon")} />
								Quá thời gian
							</>
						)}
					</span>
				)}
			</div>
		</div>
	);
}

export default ProblemsItem;
