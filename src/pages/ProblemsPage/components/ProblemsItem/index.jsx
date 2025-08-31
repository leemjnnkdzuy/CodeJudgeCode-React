import React from "react";
import classNames from "classnames/bind";
import styles from "./ProblemsItem.module.scss";

const cx = classNames.bind(styles);

function ProblemsItem({
	problem,
	problemTypes,
	difficultyLabels,
	formatSolvedCount,
}) {
	const getType = (type) => problemTypes.find((t) => t.key === type);
	return (
		<div
			className={cx("problem-item")}
			data-id={problem.id}
			data-slug={problem.slug}
		>
			<div className={cx("problem-info")}>
				<h3 className={cx("problem-title")}>{problem.title}</h3>
				<p className={cx("problem-description")}>
					{problem.description.slice(0, 150)}...
				</p>
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
				{problem.user_status === "solved" && (
					<span className={cx("status-badge", "solved")}>
						✓ Đã giải
					</span>
				)}
				{problem.user_status === "attempted" && (
					<span className={cx("status-badge", "attempted")}>
						⟳ Đã thử
					</span>
				)}
			</div>
		</div>
	);
}

export default ProblemsItem;
