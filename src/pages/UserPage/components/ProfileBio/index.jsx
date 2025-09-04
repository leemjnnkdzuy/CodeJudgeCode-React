import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileBio.module.scss";

const cx = classNames.bind(styles);

const ProfileBio = ({user}) => {
	return (
		<div className={cx("profile-section")}>
			<h2 className={cx("section-title")}>Giới thiệu</h2>
			<div className={cx("bio-content")}>
				{user?.bio ? (
					<p>{user.bio}</p>
				) : (
					<p className={cx("no-content")}>
						Người dùng này chưa có giới thiệu.
					</p>
				)}
			</div>
		</div>
	);
};

export default ProfileBio;
