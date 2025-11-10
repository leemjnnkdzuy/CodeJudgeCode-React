import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileStats.module.scss";
import RANK from "../../../../config/rankingConfig";
import {useLanguages} from "../../../../hooks/useLanguages";

const cx = classNames.bind(styles);

export default function ProfileStats({user, userBadges = []}) {
	const {t, getConfigValue} = useLanguages();

	const getLevelProgress = (rating) => {
		if (typeof rating !== "number" || rating === -1)
			return {percent: 0, label: t("homePage.noRank")};

		const ranks = Object.values(RANK)
			.filter((r) => typeof r.order === "number")
			.sort((a, b) => a.order - b.order);

		let current = ranks.find(
			(r) => rating >= r.min_rating && rating <= r.max_rating
		);

		if (!current) {
			if (rating < ranks[0].min_rating) {
				return {
					percent: 0,
					label: t("homePage.toRank", {
						rank: getConfigValue(ranks[0], "name"),
					}),
				};
			}
			const last = ranks[ranks.length - 1];
			if (rating >= last.min_rating) {
				return {
					percent: 100,
					label: getConfigValue(last, "name"),
				};
			}
			return {percent: 0, label: t("homePage.noRank")};
		}

		const maxOrder = Math.max(...ranks.map((r) => r.order));
		if (current.order === maxOrder)
			return {percent: 100, label: getConfigValue(current, "name")};

		const next = ranks.find((r) => r.order === current.order + 1);
		if (!next)
			return {percent: 100, label: getConfigValue(current, "name")};

		const rangeStart = Math.max(current.min_rating, 0);
		const rangeEnd = Math.max(next.min_rating, rangeStart + 1);
		const denom = rangeEnd - rangeStart;
		const rawPercent =
			denom > 0 ? ((rating - rangeStart) / denom) * 100 : 100;
		const percent = Math.min(100, Math.max(0, Math.round(rawPercent)));

		return {
			percent,
			label: `${rating} - ${t("homePage.toRank", {
				rank: getConfigValue(next, "name"),
			})}`,
		};
	};

	const {percent, label} = getLevelProgress(user?.rating);

	return (
		<>
			<div className={cx("top-section")}>
				<div className={cx("welcome-header")}>
					<h1>
						{t("homePage.welcome")}
						<b>
							{user
								? `${user.first_name || ""} ${
										user.last_name || ""
								  }`.trim()
								: t("homePage.welcome")}
						</b>
						!
					</h1>
					<p className={cx("welcome-subtitle")}>
						{t("homePage.subWelcome")}
					</p>
				</div>

				<div className={cx("right-stats")}>
					<div className={cx("stat")}>
						<p>{t("homePage.loginStreak")}</p>
						<div className={cx("stat-score")}>
							{user?.login_streak ?? 0}
						</div>
						<br />
						<small>
							{t("homePage.day")}{" "}
							{user?.login_streak > 0 ? (
								<span className={cx("record-text")}>
									{t("homePage.excellent")}
								</span>
							) : (
								""
							)}
						</small>
					</div>

					<div className={cx("stat")}>
						<p>{t("homePage.levelProgress")}</p>
						<div
							className={cx("circle")}
							style={{"--progress": percent}}
						>
							<span className={cx("circle-text")}>
								{percent}%
							</span>
						</div>
						<small>{label}</small>
					</div>
				</div>
			</div>

			<div className={cx("bottom-stats")}>
				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-code-alt'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>{t("homePage.problems")}</p>
						<div className={cx("stat-connection")}>
							<strong>{user?.total_problems_solved ?? 0}</strong>
							<small>{t("homePage.solved")}</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-trophy'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>{t("homePage.contests")}</p>
						<div className={cx("stat-connection")}>
							<strong>0</strong>
							<small>{t("homePage.participated")}</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-send'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>{t("homePage.submissions")}</p>
						<div className={cx("stat-connection")}>
							<strong>{user?.total_submissions ?? 0}</strong>
							<small>{t("homePage.submitted")}</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-chat'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>{t("homePage.discussions")}</p>
						<div className={cx("stat-connection")}>
							<strong>0</strong>
							<small>{t("homePage.posted")}</small>
						</div>
					</div>
				</div>

				<div className={cx("stat")}>
					<div className={cx("stat-left-column")}>
						<div className={cx("stat-icon")}>
							<i className='bx bx-medal'></i>
						</div>
						<div className={cx("stat-bracket")}>
							<div className={cx("connection-line")}></div>
						</div>
					</div>
					<div className={cx("stat-right-column")}>
						<p>{t("homePage.badges")}</p>
						<div className={cx("stat-connection")}>
							<strong>{userBadges.length}</strong>
							<small>{t("homePage.earned")}</small>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
