import React from "react";
import classNames from "classnames/bind";
import {FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn} from "react-icons/fa";

import styles from "./SocialIcons.module.scss";

const cx = classNames.bind(styles);

function SocialIcons({onSocialLogin}) {
	return (
		<div className={cx("social-icons")}>
			<div onClick={() => onSocialLogin("google")} className={cx("icon")}>
				<FaGoogle />
			</div>
			<div
				onClick={() => onSocialLogin("facebook")}
				className={cx("icon")}
			>
				<FaFacebookF />
			</div>
			<div onClick={() => onSocialLogin("github")} className={cx("icon")}>
				<FaGithub />
			</div>
			<div
				onClick={() => onSocialLogin("linkedin")}
				className={cx("icon")}
			>
				<FaLinkedinIn />
			</div>
		</div>
	);
}

export default SocialIcons;
