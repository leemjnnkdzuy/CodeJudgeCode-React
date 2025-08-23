import classNames from "classnames/bind";
import styles from "./WelcomeHeader.module.scss";
import {Button, SearchBar, DropDown} from "../../../../components/UI/";
import {useAuth} from "../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {base64ToImage} from "../../../../helper/avatarBase64Helper";

const cx = classNames.bind(styles);

const WelcomeHeader = () => {
	const {isAuthenticated, logout} = useAuth();
	const navigate = useNavigate();

	let avatarSrc = "";
	try {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		avatarSrc = base64ToImage(userInfo?.avatar);
	} catch (e) {
		avatarSrc = "";
	}

	const dropdownItems = [
		{
			label: "Hồ sơ",
			onClick: () => navigate("/profile"),
			icon: <i className='bx bx-user'></i>,
		},
		{
			label: "Cài đặt",
			onClick: () => navigate("/settings"),
			icon: <i className='bx bx-cog'></i>,
		},
		{
			label: "Đăng xuất",
			onClick: async () => {
				await logout();
				navigate("/");
			},
			icon: <i className='bx bx-log-out'></i>,
			danger: true,
		},
	];

	return (
		<header className={cx("welcomeHeader")}>
			<nav className={cx("welcomeNavbar")}>
				<div className={cx("container")}>
					<div
						className={cx("navbarLogo")}
						style={{cursor: "pointer"}}
						onClick={() => navigate("/")}
					>
						<span className={cx("logoText")}>CodeJudge</span>
					</div>

					<div className={cx("navbarNav")}>
						<div
							className={cx("navItem")}
							style={{cursor: "pointer"}}
							onClick={() => navigate("/competitions")}
						>
							Cuộc Thi
						</div>
						<div
							className={cx("navItem")}
							style={{cursor: "pointer"}}
							onClick={() => navigate("/problems")}
						>
							Bài Toán
						</div>
						<div
							className={cx("navItem")}
							style={{cursor: "pointer"}}
							onClick={() => navigate("/leaderboard")}
						>
							Xếp Hạng
						</div>
					</div>

					<div className={cx("navbarSearch")}>
						<SearchBar
							placeholder='Tìm kiếm bài toán...'
							size='md'
							searchPath='/problems'
							onSearch={(query) =>
								console.log("Searching for:", query)
							}
						/>
					</div>

					<div className={cx("navbarAuth")}>
						{isAuthenticated ? (
							<DropDown items={dropdownItems} align='right'>
								<div className={cx("avatarBtn")}>
									<img
										src={avatarSrc}
										alt='avatar'
										className={cx("avatarImg")}
									/>
								</div>
							</DropDown>
						) : (
							<>
								<Button to='/login' size='md'>
									Đăng Nhập
								</Button>
								<Button
									to='/register'
									size='md'
									variant='outline'
								>
									Đăng Ký
								</Button>
							</>
						)}
					</div>

					<div className={cx("mobileMenuToggle")}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default WelcomeHeader;
