import classNames from "classnames/bind";
import styles from "./BadgesSection.module.scss";
import badgesConfig from "../../../../config/badgesConfig";
import {Tooltip} from "../../../../components/UI";
import {useLanguages} from "../../../../hooks/useLanguages";

const cx = classNames.bind(styles);

function BadgesSection({userBadges = []}) {
	const {t, getConfigValue} = useLanguages();

	return (
		<div className={cx("badges-stats")}>
			<div className={cx("badges-header")}>
				<h2>{t("homePage.badgesTitle")}</h2>
				<p>{t("homePage.badgesSubtitle")}</p>
			</div>

			<ul className={cx("badges-list")}>
				{Object.entries(badgesConfig).map(([badgeKey, badge]) => {
					const isEarned = userBadges.includes(badgeKey);
					const badgeImgPath = badge?.File ?? "";

					return (
						<li
							className={cx("badge-item", {
								earned: isEarned,
								unearned: !isEarned,
							})}
							key={badgeKey}
						>
							<div className={cx("badge-wrapper")}>
								<Tooltip
									content={
										<div className={cx("badge-tooltip")}>
											<strong>
												{getConfigValue(badge, "title")}
											</strong>
											<br />
											{getConfigValue(
												badge,
												"description"
											)}
											{!isEarned && (
												<>
													<br />
													<em
														className={cx(
															"badge-tooltip-unearned"
														)}
													>
														{t(
															"homePage.notEarned"
														)}
													</em>
												</>
											)}
										</div>
									}
								>
									<button
										aria-haspopup='true'
										aria-label={`${getConfigValue(
											badge,
											"title"
										)} Badge`}
										className={cx("badge-button")}
									>
										<div
											className={cx("badge-img-wrapper")}
										>
											{badgeImgPath && (
												<img
													src={badgeImgPath}
													alt={getConfigValue(
														badge,
														"title"
													)}
													className={cx("badge-img")}
												/>
											)}
										</div>
									</button>
								</Tooltip>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default BadgesSection;
