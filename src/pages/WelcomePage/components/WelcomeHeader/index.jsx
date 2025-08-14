import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./WelcomeHeader.module.scss";
import Button from "../../../../components/UI/Button";
import SearchBar from "../../../../components/UI/SearchBar";

const cx = classNames.bind(styles);

const WelcomeHeader = () => {
	const isLoggedIn = false;

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
						{isLoggedIn ? (
							<>
								<Button
									to='/profile'
									className={cx("profileBtn")}
									size='sm'
								>
									Hồ Sơ
								</Button>
								<Button
									to='/logout'
									className={cx("logoutBtn")}
									size='sm'
									variant='secondary'
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
