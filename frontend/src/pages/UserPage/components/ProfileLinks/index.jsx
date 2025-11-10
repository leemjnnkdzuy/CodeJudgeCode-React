import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileLinks.module.scss";

const cx = classNames.bind(styles);

const ProfileLinks = ({user}) => {
	const links = [
		{
			key: "github_url",
			label: "GitHub",
			icon: "bx bxl-github",
			url: user?.github_url,
		},
		{
			key: "linkedin_url",
			label: "LinkedIn",
			icon: "bx bxl-linkedin",
			url: user?.linkedin_url,
		},
		{
			key: "website_url",
			label: "Website",
			icon: "bx bx-link",
			url: user?.website_url,
		},
		{
			key: "youtube_url",
			label: "YouTube",
			icon: "bx bxl-youtube",
			url: user?.youtube_url,
		},
		{
			key: "facebook_url",
			label: "Facebook",
			icon: "bx bxl-facebook",
			url: user?.facebook_url,
		},
		{
			key: "instagram_url",
			label: "Instagram",
			icon: "bx bxl-instagram",
			url: user?.instagram_url,
		},
	];

	const validLinks = links.filter((link) => link.url && link.url.trim());

	if (validLinks.length === 0) {
		return null;
	}

	return (
		<div className={cx("profile-section")}>
			<h2 className={cx("section-title")}>Liên kết</h2>
			<div className={cx("links-container")}>
				{validLinks.map((link) => (
					<div
						key={link.key}
						onClick={() => window.open(link.url, "_blank")}
						className={cx("link-item")}
					>
						<i className={link.icon}></i>
						<span>{link.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProfileLinks;
