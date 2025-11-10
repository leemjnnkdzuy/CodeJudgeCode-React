import React, {useState} from "react";
import classNames from "classnames/bind";
import TYPE_PROBLEM from "../../../../../../config/styleProblemConfig";
import DIFFICULTY_LEVELS from "../../../../../../config/difficultyConfig";
import {useLanguages} from "../../../../../../hooks/useLanguages";
import styles from "./DescriptionTab.module.scss";

const cx = classNames.bind(styles);

function DescriptionTab({problem}) {
	const {getConfigValue} = useLanguages();
	const [expandedHints, setExpandedHints] = useState({});

	const toggleHint = (index) => {
		setExpandedHints((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};
	if (!problem) {
		console.log("No problem data received");
		return <div>No problem data available</div>;
	}

	const getDifficultyConfig = (difficulty) => {
		const diffKey = difficulty?.toLowerCase();
		return DIFFICULTY_LEVELS[diffKey] || DIFFICULTY_LEVELS.medium;
	};

	const difficultyConfig = getDifficultyConfig(problem.difficulty);

	const getDifficultyClass = (difficulty) => {
		switch (difficulty?.toLowerCase()) {
			case "easy":
				return "difficulty-easy";
			case "medium":
				return "difficulty-medium";
			case "hard":
				return "difficulty-hard";
			default:
				return "difficulty-medium";
		}
	};

	return (
		<>
			<div className={cx("problem-header")}>
				<h1 className={cx("problem-title")}>
					{problem.title || "No title"}
				</h1>

				<div className={cx("problem-meta")}>
					<span
						className={cx(
							"difficulty-badge",
							getDifficultyClass(problem.difficulty)
						)}
						style={{
							backgroundColor: difficultyConfig?.color,
							color:
								difficultyConfig?.color === "#fdcb6e"
									? "#333"
									: "white",
							border: `1px solid ${difficultyConfig?.color}`,
						}}
					>
						{getConfigValue(difficultyConfig, "name") ||
							problem.difficulty ||
							"Trung bình"}
					</span>
					{problem.topicTags &&
						Array.isArray(problem.topicTags) &&
						problem.topicTags.map((tag, index) => (
							<span key={index} className={cx("problem-tag")}>
								{getConfigValue(TYPE_PROBLEM[tag], "name") ||
									tag}
							</span>
						))}
					<div className={cx("stat-item", "stat-item-time")}>
						<i className='bx bx-time'></i>
						<span>{problem.timeLimit}ms</span>
					</div>
					<div className={cx("stat-item", "stat-item-memory")}>
						<i className='bx bx-memory-card'></i>
						<span>{problem.memoryLimit}MB</span>
					</div>
				</div>
			</div>

			<div className={cx("problem-section")}>
				<div className={cx("problem-description")}>
					{problem.content ? (
						<div
							dangerouslySetInnerHTML={{
								__html: problem.content,
							}}
						/>
					) : (
						<p>Chưa có mô tả</p>
					)}
				</div>
			</div>

			{problem.hints && problem.hints.length > 0 && (
				<div className={cx("problem-section")}>
					<h2 className={cx("section-title")}>Gợi ý</h2>
					<div className={cx("hint-container")}>
						{problem.hints.map((hint, index) => (
							<div key={index} className={cx("accordion-item")}>
								<button
									className={cx("accordion-header")}
									onClick={() => toggleHint(index)}
								>
									Gợi ý {index + 1}
									<i
										className={`bx ${
											expandedHints[index]
												? "bx-chevron-up"
												: "bx-chevron-down"
										}`}
									></i>
								</button>
								{expandedHints[index] && (
									<div
										className={cx("accordion-content", {
											open: expandedHints[index],
										})}
									>
										<div
											dangerouslySetInnerHTML={{
												__html: hint,
											}}
										/>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default DescriptionTab;
