import React from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./WelcomeFooter.module.scss";
import {useLanguages} from "../../../../hooks/useLanguages";

const cx = classNames.bind(styles);

const WelcomeFooter = () => {
	const navigate = useNavigate();
	const {t} = useLanguages();
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
							{t("welcomeFooter.description")}
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
						<h6>{t("welcomeFooter.sections.platform.title")}</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/problems");
									}}
								>
									{t(
										"welcomeFooter.sections.platform.problems"
									)}
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/submissions");
									}}
								>
									{t(
										"welcomeFooter.sections.platform.submissions"
									)}
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/leaderboard");
									}}
								>
									{t(
										"welcomeFooter.sections.platform.leaderboard"
									)}
								</div>
							</li>
						</ul>
					</div>

					<div className={cx("footerSection")}>
						<h6>{t("welcomeFooter.sections.community.title")}</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/discussions");
									}}
								>
									{t(
										"welcomeFooter.sections.community.discussions"
									)}
								</div>
							</li>
						</ul>
					</div>

					<div className={cx("footerSection")}>
						<h6>{t("welcomeFooter.sections.support.title")}</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/help");
									}}
								>
									{t("welcomeFooter.sections.support.help")}
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/contact");
									}}
								>
									{t(
										"welcomeFooter.sections.support.contact"
									)}
								</div>
							</li>
						</ul>
					</div>

					<div className={cx("footerSection")}>
						<h6>{t("welcomeFooter.sections.legal.title")}</h6>
						<ul className={cx("footerLinks")}>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/privacy");
									}}
								>
									{t("welcomeFooter.sections.legal.privacy")}
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/terms");
									}}
								>
									{t("welcomeFooter.sections.legal.terms")}
								</div>
							</li>
							<li>
								<div
									onClick={(e) => {
										e.preventDefault();
										navigate("/docs/cookies");
									}}
								>
									{t("welcomeFooter.sections.legal.cookies")}
								</div>
							</li>
						</ul>
					</div>
				</div>

				<hr className={cx("footerDivider")} />

				<div className={cx("footerBottom")}>
					<p className={cx("footerCopyright")}>
						{t("welcomeFooter.copyright")}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default WelcomeFooter;
