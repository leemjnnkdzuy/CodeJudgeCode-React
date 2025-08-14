import React from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./WelcomeFooter.module.scss";

const cx = classNames.bind(styles);

const WelcomeFooter = () => {
	const navigate = useNavigate();
	const handleNavigation = (path) => {
		window.open(path, "_blank");
	};
	return (
		<footer className={cx("welcomeFooter")}>
			<div className={cx("container")}>
				<div className={cx("footerContent")}>
					<div className={cx("footerBrand")}>
						<h5>
							<span className={cx("logoText")}>CodeJudge</span>
						</h5>
						<p className={cx("footerDescription")}>
							Thực hành các bài toán lập trình và cải thiện kỹ
							năng lập trình của bạn với hệ thống chấm tự động.
						</p>
						<div className={cx("footerSocial")}>
							<div
								className={cx("footerSocialIcon")}
								onClick={() =>
									handleNavigation(
										"https://www.facebook.com/leemjnnkdzuy"
									)
								}
							>
								<i className='bx bxl-facebook-circle'></i>
							</div>
							<div
								className={cx("footerSocialIcon")}
								onClick={() =>
									handleNavigation(
										"https://discord.gg/aagSgZpe"
									)
								}
							>
								<i className='bx bxl-discord-alt'></i>
							</div>
							<div
								className={cx("footerSocialIcon")}
								onClick={() =>
									handleNavigation(
										"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
									)
								}
							>
								<i className='bx bxl-youtube'></i>
							</div>
							<div
								className={cx("footerSocialIcon")}
								onClick={() =>
									handleNavigation(
										"https://github.com/leemjnnkdzuy/CodeJubge"
									)
								}
							>
								<i className='bx bxl-github'></i>
							</div>
						</div>
					</div>

					<div className={cx("footerSection")}>
						<h6>Nền Tảng</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/problems");
									}}
								>
									Bài Toán
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/submissions");
									}}
								>
									Bài Nộp
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/leaderboard");
									}}
								>
									Bảng Xếp Hạng
								</div>
							</li>
						</ul>
					</div>

					<div className={cx("footerSection")}>
						<h6>Cộng Đồng</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/discussions");
									}}
								>
									Diễn Đàn
								</div>
							</li>
						</ul>
					</div>

					<div className={cx("footerSection")}>
						<h6>Hỗ Trợ</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/help");
									}}
								>
									Trung Tâm Trợ Giúp
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/contact");
									}}
								>
									Liên Hệ
								</div>
							</li>
						</ul>
					</div>

					<div className={cx("footerSection")}>
						<h6>Pháp Lý</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/privacy");
									}}
								>
									Bảo Mật
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/terms");
									}}
								>
									Điều Khoản
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/cookies");
									}}
								>
									Cookies
								</div>
							</li>
						</ul>
					</div>
				</div>

				<hr className={cx("footerDivider")} />

				<div className={cx("footerBottom")}>
					<p className={cx("footerCopyright")}>
						© 2025 CodeJudge. Tất cả quyền được bảo lưu. Được xây
						dựng với ❤️ cho các lập trình viên.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default WelcomeFooter;
