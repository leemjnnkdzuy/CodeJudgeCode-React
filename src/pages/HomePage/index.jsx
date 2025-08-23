import React from "react";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import {BadgesSection, ProfileStats} from "./components/";
import {useAuth} from "../../hooks/useAuth";

const cx = classNames.bind(styles);

function HomePage() {
	const {user} = useAuth();

	const userBadges = user?.badges || [];

	const getLevelProgress = (rating) => {
		return 12;
	};

	return (
		<div className={cx("profile-container")}>
			<ProfileStats
				user={user}
				userBadges={userBadges}
				getLevelProgress={getLevelProgress}
			/>
			<BadgesSection userBadges={userBadges} />
		</div>
	);
}

export default HomePage;
