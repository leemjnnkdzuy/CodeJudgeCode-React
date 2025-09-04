import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./UserPage.module.scss";
import {Loading} from "../../components/UI";
import {useAuth} from "../../hooks/useAuth";
import {useGlobalNotificationPopup} from "../../hooks/useGlobalNotificationPopup";
import request from "../../utils/request";
import {
	ProfileHeader,
	ProfileBio,
	ProfileLinks,
	ProfileStats,
	ProfileBadges,
	ProfileSubmissions,
} from "./components";

const cx = classNames.bind(styles);

function UserPage() {
	const {username} = useParams();
	const {user: currentUser, token} = useAuth();
	const navigate = useNavigate();
	const {showError} = useGlobalNotificationPopup();

	const [viewingUser, setViewingUser] = useState(null);
	const [userBadges, setUserBadges] = useState([]);
	const [stats, setStats] = useState(null);
	const [recentSubmissions, setRecentSubmissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const isOwnProfile =
		currentUser &&
		(username === currentUser.username || (!username && currentUser));

	useEffect(() => {
		let mounted = true;

		const fetchUserData = async () => {
			if (!token) {
				setError("Bạn cần đăng nhập để xem trang này");
				setLoading(false);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const targetUsername = username || currentUser?.username;
				if (!targetUsername) {
					setError("Không thể xác định người dùng");
					setLoading(false);
					return;
				}

				const apiResponse = await request.userData(targetUsername);
				const userData = apiResponse.data;
				const user = userData.data || userData;

				setViewingUser(user);

				if (user.badges && Array.isArray(user.badges)) {
					setUserBadges(
						user.badges.map((badge) => badge.id || badge)
					);
				} else {
					setUserBadges([]);
				}

				if (user.stats) {
					setStats(user.stats);
				} else {
					setStats(null);
				}

				if (user.submissions) {
					setRecentSubmissions(user.submissions);
				} else {
					setRecentSubmissions([]);
				}
			} catch (err) {
				if (mounted) {
					setError(err.message || "Không thể tải dữ liệu người dùng");
					showError(
						err.message || "Không thể tải dữ liệu người dùng"
					);
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		};

		fetchUserData();

		return () => {
			mounted = false;
		};
	}, [username, currentUser, token, showError]);

	const handleEditProfile = () => {
		navigate("/settings");
	};

	if (loading) {
		return (
			<div className={cx("profile-container")}>
				<div className={cx("loading-container")}>
					<Loading size='20px' />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={cx("profile-container")}>
				<div className={cx("error-text")}>{error}</div>
			</div>
		);
	}

	if (!viewingUser) {
		return (
			<div className={cx("profile-container")}>
				<div className={cx("error-text")}>
					Không tìm thấy người dùng
				</div>
			</div>
		);
	}

	return (
		<div className={cx("profile-container")}>
			<ProfileHeader
				user={viewingUser}
				userBadges={userBadges}
				isOwnProfile={isOwnProfile}
				onEditProfile={handleEditProfile}
			/>

			<div className={cx("profile-content")}>
				<ProfileBio user={viewingUser} />

				<ProfileLinks user={viewingUser} />

				<ProfileStats stats={stats} />

				<ProfileBadges userBadges={userBadges} />

				<ProfileSubmissions submissions={recentSubmissions} />
			</div>
		</div>
	);
}

export default UserPage;
