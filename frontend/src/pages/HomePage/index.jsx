import React from "react";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import {BadgesSection, ProfileStats} from "./components/";
import {useAuth} from "../../hooks/useAuth";
import {useLanguages} from "../../hooks/useLanguages";
import {useEffect, useState} from "react";
import request from "../../utils/request";
import {Loading} from "../../components/UI";

const cx = classNames.bind(styles);

function HomePage() {
	const {t} = useLanguages();
	const {user, token} = useAuth();
	const [homeData, setHomeData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const userBadges = homeData?.badges ?? user?.badges ?? [];

	useEffect(() => {
		let mounted = true;
		const fetchHomeData = async () => {
			if (!token) return;
			setLoading(true);
			setError(null);
			try {
				const data = await request.homeData(token);
				if (mounted) setHomeData(data);
			} catch (err) {
				if (mounted) setError(err?.message || "Failed to load");
			} finally {
				if (mounted) setLoading(false);
			}
		};

		fetchHomeData();

		return () => {
			mounted = false;
		};
	}, [token]);

	return (
		<div className={cx("profile-container")}>
			{loading ? (
				<Loading size='20px' />
			) : error ? (
				<div className={cx("error-text")}>
					{t("settingsPage.personalInfoTab.generalError")}: {error}
				</div>
			) : (
				<>
					<ProfileStats
						user={{...user, ...homeData}}
						userBadges={userBadges}
					/>
					<BadgesSection userBadges={userBadges} />
				</>
			)}
		</div>
	);
}

export default HomePage;
