import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./WelcomeHeader.module.scss";
import {Button, SearchBar} from "../../../../components/UI/";
import {useAuth} from "../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(styles);

const WelcomeHeader = () => {
	const {isAuthenticated, logout} = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	return (
		<header className={cx("welcomeHeader")}>
			<nav className={cx("welcomeNavbar")}>
				<div className={cx("container")}>
					<div className={cx("navbarLogo")}>
						<Link to='/' className={cx("logoLink")}>
							<span className={cx("logoText")}>CodeJudge</span>
						</Link>
					</div>

					<div className={cx("navbarNav")}>
						<Link to='/competitions' className={cx("navItem")}>
							Cuộc Thi
						</Link>
						<Link to='/problems' className={cx("navItem")}>
							Bài Toán
						</Link>
						<Link to='/leaderboard' className={cx("navItem")}>
							Xếp Hạng
						</Link>
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
							<>
								<Button
									to='/profile'
									className={cx("profileBtn")}
									size='md'
								>
									Hồ Sơ
								</Button>
								<Button
									as='button'
									type='button'
									className={cx("logoutBtn")}
									size='md'
									variant='secondary'
									onClick={handleLogout}
								>
									Đăng Xuất
								</Button>
							</>
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
