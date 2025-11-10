import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileHeader.module.scss";
import RANK from "../../../../config/rankingConfig";
import defaultAvatar from "../../../../assets/default_avatar.png";
import {base64ToImage} from "../../../../helper/avatarBase64Helper";
import {Button} from "../../../../components/UI";

const cx = classNames.bind(styles);

const ProfileHeader = ({
	user,
	userBadges = [],
	isOwnProfile = false,
	onEditProfile,
}) => {
	const getUserRank = (rating) => {
		if (rating === -1 || rating < 0) {
			return RANK.Unranked;
		}

		for (const [, rankData] of Object.entries(RANK)) {
			if (
				rating >= rankData.min_rating &&
				rating <= rankData.max_rating
			) {
				return rankData;
			}
		}

		return RANK.Unranked;
	};

	const userRank = getUserRank(user?.rating ?? -1);
	const displayRating =
		user?.rating !== -1 && user?.rating >= 0
			? `${user.rating} CJP`
			: "Chưa có xếp hạng";

	return (
		<div className={cx("profile-header")}>
			<div className={cx("profile-main-info")}>
				<div className={cx("profile-avatar-section")}>
					<div className={cx("avatar-container")}>
						<img
							src={
								user?.avatar
									? base64ToImage(user.avatar)
									: defaultAvatar
							}
							alt='Avatar'
							className={cx("profile-avatar")}
						/>
					</div>
				</div>

				<div className={cx("profile-info")}>
					<h1 className={cx("profile-name")}>
						{user?.first_name && user?.last_name
							? `${user.first_name} ${user.last_name}`
							: user?.username || "Người dùng"}
					</h1>
					<p className={cx("profile-username")}>
						@{user?.username || "username"}
					</p>
					{isOwnProfile && (
						<Button
							variant='primary'
							size='sm'
							className={cx("edit-profile-btn")}
							onClick={onEditProfile}
						>
							Chỉnh sửa hồ sơ
						</Button>
					)}
				</div>
			</div>

			<div className={cx("rank-display")}>
				<div className={cx("rank-icon")}>
					<img
						src={userRank.icon}
						alt={userRank.name}
						className={cx("rank-image")}
					/>
				</div>
				<div className={cx("rank-info")}>
					<span
						className={cx("rank-name")}
						style={{color: userRank.color}}
					>
						{userRank.name}
					</span>
					<span className={cx("rank-rating")}>{displayRating}</span>
				</div>
			</div>

			<div className={cx("profile-stats")}>
				<div className={cx("stat-item")}>
					<span className={cx("stat-number")}>
						{user?.total_problems_solved ?? 0}
					</span>
					<span className={cx("stat-label")}>Bài giải</span>
				</div>
				<div className={cx("stat-item")}>
					<span className={cx("stat-number")}>
						{user?.login_streak ?? 0}
					</span>
					<span className={cx("stat-label")}>Streak</span>
				</div>
				<div className={cx("stat-item")}>
					<span className={cx("stat-number")}>
						{userBadges.length}
					</span>
					<span className={cx("stat-label")}>Badges</span>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
