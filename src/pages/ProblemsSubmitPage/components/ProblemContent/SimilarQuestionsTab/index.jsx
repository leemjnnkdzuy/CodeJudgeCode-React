import React from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import DIFFICULTY_LEVELS from "../../../../../config/difficultyConfig";
import styles from "./SimilarQuestionsTab.module.scss";

const cx = classNames.bind(styles);

function SimilarQuestionsTab({problem}) {
	const navigate = useNavigate();

	if (
		!problem ||
		!problem.similarQuestions ||
		problem.similarQuestions.length === 0
	) {
		return <div>No similar questions available</div>;
	}

	const currentLanguage = localStorage.getItem("language") || "vi";

	const difficultyLabels = {
		easy: DIFFICULTY_LEVELS[currentLanguage]?.easy?.name || "Dễ",
		medium:
			DIFFICULTY_LEVELS[currentLanguage]?.medium?.name || "Trung bình",
		hard: DIFFICULTY_LEVELS[currentLanguage]?.hard?.name || "Khó",
	};

	return (
		<div className={cx("similar-questions-container")}>
			{problem.similarQuestions.map((question, index) => (
				<div
					key={index}
					className={cx("problem-item")}
					onClick={() => {
						if (question.titleSlug) {
							navigate(`/problems/${question.titleSlug}`);
						}
					}}
					role='button'
					tabIndex={0}
					onKeyPress={(e) => {
						if (
							(e.key === "Enter" || e.key === " ") &&
							question.titleSlug
						) {
							navigate(`/problems/${question.titleSlug}`);
						}
					}}
				>
					<div className={cx("problem-info")}>
						<span
							className={cx(
								"difficulty",
								question.difficulty?.toLowerCase()
							)}
						>
							{difficultyLabels[
								question.difficulty?.toLowerCase()
							] || question.difficulty}
						</span>
						<span className={cx("separator")}>|</span>
						<h3 className={cx("problem-title")}>
							{question.title}
						</h3>
					</div>
				</div>
			))}
		</div>
	);
}

export default SimilarQuestionsTab;
