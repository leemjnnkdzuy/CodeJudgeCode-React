import React, {useState} from "react";
import assets from "../../assets";
import classNames from "classnames/bind";
import styles from "./WelcomePage.module.scss";
import {WelcomeFooter, WelcomeHeader} from "./components/";
import {Button} from "../../components/UI/";
import {FaArrowRight} from "react-icons/fa";
import {useAuth} from "../../hooks/useAuth";
import {useLanguages} from "../../hooks/useLanguages";

const cx = classNames.bind(styles);

const WelcomePage = () => {
	const {isAuthenticated} = useAuth();
	const {t} = useLanguages();
	const [seeMoreText, setSeeMoreText] = useState(
		t("welcomePage.about.seeMore")
	);

	const toggleAllFeatures = (button) => {
		const allFeatures = document.querySelectorAll(
			`.${cx("about-features")}`
		);

		const anyVisible = Array.from(allFeatures).some(
			(features) => features.style.display === "block"
		);

		if (anyVisible) {
			allFeatures.forEach((features) => {
				features.style.display = "none";
			});
			setSeeMoreText(t("welcomePage.about.seeMore"));
		} else {
			allFeatures.forEach((features) => {
				features.style.display = "block";
			});
			setSeeMoreText(t("welcomePage.about.seeLess"));
		}
	};

	return (
		<div>
			<WelcomeHeader />

			<section className={cx("hero-section")}>
				<div className={cx("container")}>
					<div className={cx("hero-content")}>
						<div className={cx("hero-text")}>
							<h1 className={cx("hero-title")}>
								{t("welcomePage.hero.title")}
							</h1>
							<p className={cx("hero-subtitle")}>
								{t("welcomePage.hero.subtitle")}
							</p>
							{!isAuthenticated ? (
								<div className={cx("hero-buttons")}>
									<Button to='/login' variant='primary-hero'>
										{t("welcomePage.hero.login")}
									</Button>
									<Button to='/register' variant='outline'>
										{t("welcomePage.hero.register")}
									</Button>
								</div>
							) : (
								<div className={cx("hero-buttons")}>
									<Button
										to='/home'
										variant='primary-hero'
										size='lg'
										className={cx("home-btn-animated")}
									>
										<span className={cx("home-btn-text")}>
											{t("welcomePage.hero.home")}
										</span>
										<span className={cx("home-btn-icon")}>
											<FaArrowRight size={16} />
										</span>
									</Button>
								</div>
							)}
						</div>
						<div className={cx("hero-image")}>
							<img
								src={assets.homePage.home_image_1}
								alt='Coding Community'
								className={cx("hero-img")}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className={cx("about-section")}>
				<div className={cx("container")}>
					<div className={cx("about-header")}>
						<div className={cx("about-header-content")}>
							<h2 className={cx("about-title")}>
								{t("welcomePage.about.title")}
							</h2>
							<button
								className={cx("see-more-btn-main")}
								onClick={(e) => toggleAllFeatures(e.target)}
							>
								{seeMoreText}
							</button>
						</div>
					</div>

					<div className={cx("about-grid")}>
						<div className={cx("about-card")}>
							<div className={cx("about-card-header")}>
								<div className={cx("about-text-section")}>
									<h3 className={cx("about-card-title")}>
										{t("welcomePage.about.students.title")}
									</h3>
									<p className={cx("about-card-description")}>
										{t(
											"welcomePage.about.students.description"
										)}
									</p>
								</div>
								<div className={cx("about-image")}>
									<img
										src={assets.homePage.home_image_3}
										alt='Students'
										className={cx("about-img")}
									/>
								</div>
							</div>

							<div
								className={cx("about-features")}
								style={{display: "none"}}
							>
								<h4 className={cx("features-title")}>
									{t(
										"welcomePage.about.students.featuresTitle"
									)}
								</h4>
								<ul className={cx("features-list")}>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-medal'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.students.features.contests"
											)}
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-book-open'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.students.features.guides"
											)}
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-folder'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.students.features.exercises"
											)}
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className={cx("about-card")}>
							<div className={cx("about-card-header")}>
								<div className={cx("about-text-section")}>
									<h3 className={cx("about-card-title")}>
										{t(
											"welcomePage.about.developers.title"
										)}
									</h3>
									<p className={cx("about-card-description")}>
										{t(
											"welcomePage.about.developers.description"
										)}
									</p>
								</div>
								<div className={cx("about-image")}>
									<img
										src={assets.homePage.home_image_2}
										alt='Developers'
										className={cx("about-img")}
									/>
								</div>
							</div>

							<div
								className={cx("about-features")}
								style={{display: "none"}}
							>
								<h4 className={cx("features-title")}>
									{t(
										"welcomePage.about.developers.featuresTitle"
									)}
								</h4>
								<ul className={cx("features-list")}>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-code-alt'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.developers.features.languages"
											)}
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-timer'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.developers.features.timed"
											)}
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-bar-chart'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.developers.features.analytics"
											)}
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className={cx("about-card")}>
							<div className={cx("about-card-header")}>
								<div className={cx("about-text-section")}>
									<h3 className={cx("about-card-title")}>
										{t("welcomePage.about.companies.title")}
									</h3>
									<p className={cx("about-card-description")}>
										{t(
											"welcomePage.about.companies.description"
										)}
									</p>
								</div>
								<div className={cx("about-image")}>
									<img
										src={assets.homePage.home_image_4}
										alt='Companies'
										className={cx("about-img")}
									/>
								</div>
							</div>

							<div
								className={cx("about-features")}
								style={{display: "none"}}
							>
								<h4 className={cx("features-title")}>
									{t(
										"welcomePage.about.companies.featuresTitle"
									)}
								</h4>
								<ul className={cx("features-list")}>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-trophy'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.companies.features.custom"
											)}
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-user-check'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.companies.features.recruitment"
											)}
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-pie-chart'></i>
										</span>
										<span className={cx("feature-text")}>
											{t(
												"welcomePage.about.companies.features.reports"
											)}
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={cx("languages-section")}>
				<div className={cx("container")}>
					<div className={cx("section-header")}>
						<h2 className={cx("section-title")}>
							{t("welcomePage.languages.title")}
						</h2>
						<p className={cx("section-subtitle")}>
							{t("welcomePage.languages.subtitle")}
						</p>
					</div>

					<div className={cx("languages-grid")}>
						<div className={cx("language-card")}>
							<div className={cx("language-icon")}>
								<img
									src={assets.icon.python_logo}
									alt='Python'
									className={cx("language-logo")}
								/>
							</div>
							<div className={cx("language-info")}>
								<h3 className={cx("language-name")}>
									{t("welcomePage.languages.python.name")}
								</h3>
								<p className={cx("language-description")}>
									{t(
										"welcomePage.languages.python.description"
									)}
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.python.features.0"
										)}
									</span>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.python.features.1"
										)}
									</span>
								</div>
							</div>
						</div>

						<div className={cx("language-card")}>
							<div className={cx("language-icon")}>
								<img
									src={assets.icon["javascript-logo"]}
									alt='JavaScript'
									className={cx("language-logo")}
								/>
							</div>
							<div className={cx("language-info")}>
								<h3 className={cx("language-name")}>
									{t("welcomePage.languages.javascript.name")}
								</h3>
								<p className={cx("language-description")}>
									{t(
										"welcomePage.languages.javascript.description"
									)}
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.javascript.features.0"
										)}
									</span>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.javascript.features.1"
										)}
									</span>
								</div>
							</div>
						</div>

						<div className={cx("language-card")}>
							<div className={cx("language-icon")}>
								<img
									src={assets.icon["c_c++_logo"]}
									alt='C/C++'
									className={cx("language-logo")}
								/>
							</div>
							<div className={cx("language-info")}>
								<h3 className={cx("language-name")}>
									{t("welcomePage.languages.cpp.name")}
								</h3>
								<p className={cx("language-description")}>
									{t("welcomePage.languages.cpp.description")}
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.cpp.features.0"
										)}
									</span>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.cpp.features.1"
										)}
									</span>
								</div>
							</div>
						</div>

						<div className={cx("language-card")}>
							<div className={cx("language-icon")}>
								<img
									src={assets.icon.java_logo}
									alt='Java'
									className={cx("language-logo")}
								/>
							</div>
							<div className={cx("language-info")}>
								<h3 className={cx("language-name")}>
									{t("welcomePage.languages.java.name")}
								</h3>
								<p className={cx("language-description")}>
									{t(
										"welcomePage.languages.java.description"
									)}
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.java.features.0"
										)}
									</span>
									<span className={cx("feature-tag")}>
										{t(
											"welcomePage.languages.java.features.1"
										)}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className={cx("languages-footer")}>
						<p className={cx("languages-note")}>
							<i className='bx bx-info-circle'></i>
							{t("welcomePage.languages.note")}
						</p>
						<Button to='/languages' variant='outline'>
							{t("welcomePage.languages.viewAll")}
						</Button>
					</div>
				</div>
			</section>

			<section className={cx("cta-section")}>
				<div className={cx("container")}>
					<div className={cx("cta-content")}>
						<h2 className={cx("cta-title")}>
							{t("welcomePage.cta.title")}
						</h2>
						<p className={cx("cta-text")}>
							{t("welcomePage.cta.text")}
						</p>
						<div
							style={{
								display: "flex",
								gap: "1rem",
								justifyContent: "center",
								flexWrap: "wrap",
							}}
						>
							{!isAuthenticated ? (
								<Button
									to='/register'
									variant='primary'
									size='lg'
								>
									{t("welcomePage.cta.createAccount")}
								</Button>
							) : (
								<Button
									to='/profile'
									variant='primary'
									size='lg'
								>
									{t("welcomePage.cta.viewProfile")}
								</Button>
							)}
							<Button to='/home' variant='outline' size='lg'>
								{t("welcomePage.cta.browseProblems")}
							</Button>
						</div>
					</div>
				</div>
			</section>

			<WelcomeFooter />
		</div>
	);
};

export default WelcomePage;
