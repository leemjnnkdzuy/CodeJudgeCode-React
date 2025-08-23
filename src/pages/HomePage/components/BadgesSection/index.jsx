import classNames from "classnames/bind";
import styles from "./BadgesSection.module.scss";
import badgesConfig from "../../../../config/badgesConfig";
import {Tooltip} from "../../../../components/UI";

const cx = classNames.bind(styles);

function BadgesSection({userBadges = []}) {
	return (
		<div className={cx("badges-stats")}>
			<div className={cx("badges-header")}>
				<h2>Thành Tích & Huy Hiệu</h2>
				<p>
					Khám phá và thu thập các huy hiệu bằng cách hoàn thành các
					thử thách
				</p>
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
											{/* reuse existing tooltip styles */}
											<strong>{badge.title}</strong>
											<br />
											{badge.description}
											{!isEarned && (
												<>
													<br />
													<em
														style={{
															color: "#ffd700",
														}}
													>
														Chưa đạt được
													</em>
												</>
											)}
										</div>
									}
								>
									<button
										aria-haspopup='true'
										aria-label={`${badge.title} Badge`}
										className={cx("badge-button")}
									>
										<div
											className={cx("badge-img-wrapper")}
										>
											{badgeImgPath && (
												<img
													src={badgeImgPath}
													alt={badge.title}
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
