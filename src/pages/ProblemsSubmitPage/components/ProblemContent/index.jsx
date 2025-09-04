import React from "react";
import classNames from "classnames/bind";
import styles from "./ProblemContent.module.scss";
import {
	SubmissionsTab,
	DescriptionTab,
	EditorialTab,
	SimilarQuestionsTab,
} from "./components";
import {useAuth} from "../../../../hooks/useAuth";

const cx = classNames.bind(styles);

function ProblemContent({
	problem,
	activeTab,
	userSubmissions,
	allSubmissions,
	submissionsView,
	onSubmissionsViewChange,
	solution,
	editorSettings,
}) {
	const {token} = useAuth();

	return (
		<div className={cx("problem-content")}>
			<div
				className={cx("tab-content", {
					active: activeTab === "description",
				})}
			>
				<DescriptionTab problem={problem} />
			</div>

			<div
				className={cx("tab-content", {
					active: activeTab === "editorial",
				})}
			>
				<EditorialTab
					problemId={problem?.id}
					token={token}
					solution={solution}
				/>
			</div>

			<div
				className={cx("tab-content", "submissions", {
					active: activeTab === "submissions",
				})}
			>
				<SubmissionsTab
					userSubmissions={userSubmissions}
					allSubmissions={allSubmissions}
					submissionsView={submissionsView}
					onSubmissionsViewChange={onSubmissionsViewChange}
					editorSettings={editorSettings}
				/>
			</div>

			<div
				className={cx("tab-content", {
					active: activeTab === "similar",
				})}
			>
				<SimilarQuestionsTab problem={problem} />
			</div>
		</div>
	);
}

export default ProblemContent;
