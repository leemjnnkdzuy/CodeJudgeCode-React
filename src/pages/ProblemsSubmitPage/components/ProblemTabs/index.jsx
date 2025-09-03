import React from "react";
import classNames from "classnames/bind";
import styles from "./ProblemTabs.module.scss";

const cx = classNames.bind(styles);

function ProblemTabs({activeTab, onTabChange, problem}) {
	const baseTabs = [
		{
			id: "description",
			label: "Mô tả",
			icon: "bx bx-book-content",
		},
		{
			id: "editorial",
			label: "Lời giải",
			icon: "bx bx-bulb",
		},
		{
			id: "submissions",
			label: "Submissions",
			icon: "bx bx-history",
		},
	];

	const tabs = [
		...baseTabs,
		...(problem?.similarQuestions && problem.similarQuestions.length > 0
			? [
					{
						id: "similar",
						label: "Bài toán liên quan",
						icon: "bx bx-link",
					},
			  ]
			: []),
	];

	return (
		<div className={cx("problem-tabs")}>
			{tabs.map((tab) => (
				<div
					key={tab.id}
					className={cx("problem-tab", {
						active: activeTab === tab.id,
					})}
					onClick={() => onTabChange(tab.id)}
				>
					<i className={tab.icon}></i>
					<span>{tab.label}</span>
				</div>
			))}
		</div>
	);
}

export default ProblemTabs;
