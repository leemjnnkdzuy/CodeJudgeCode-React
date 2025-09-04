import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileBadges.module.scss";
import BADGES from "../../../../config/badgesConfig";

const cx = classNames.bind(styles);

const ProfileBadges = ({userBadges = []}) => {
	return (
		<div className={cx("profile-section")}>
			<h2 className={cx("section-title")}>Huy hiệu & Thành tích</h2>
			<div className={cx("badges-grid")}>
				{Object.entries(BADGES).map(([badgeKey, badge]) => {
					const isEarned = userBadges.includes(badgeKey);
					const badgeClass = isEarned ? "earned" : "unearned";

					return (
						<div
							key={badgeKey}
							className={cx("badge-item", badgeClass)}
							title={badge.description}
						>
							<img
								src={badge.File}
								alt={badge.title}
								className={cx("badge-icon")}
							/>
							<span className={cx("badge-title")}>
								{badge.title}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProfileBadges;
