import assets from "../../assets";
import classNames from "classnames/bind";
import styles from "./WelcomePage.module.scss";
import { WelcomeFooter, WelcomeHeader } from "./components/";
import Button from "../../components/UI/Button";

const cx = classNames.bind(styles);

const WelcomePage = () => {
	const isLoggedIn = false;

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
			button.textContent = "Xem thêm";
		} else {
			allFeatures.forEach((features) => {
				features.style.display = "block";
			});
			button.textContent = "Ẩn bớt";
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
								Nâng tầm với cộng đồng lập trình và chấm tự động
								lớn nhất
							</h1>
							<p className={cx("hero-subtitle")}>
								Tham gia cùng hơn 25 triệu lập trình viên và
								sinh viên để thực hành, chia sẻ và kiểm tra giải
								pháp của bạn. Luôn cập nhật với các thuật toán
								và công nghệ mới nhất. Khám phá thư viện khổng
								lồ các bài tập, giải pháp mẫu và hệ thống chấm
								tự động cho tất cả các dự án học tập của bạn.
							</p>
							{!isLoggedIn ? (
								<div className={cx("hero-buttons")}>
									<Button to='/login' variant='primary-hero'>
										Đăng Nhập
									</Button>
									<Button to='/register' variant='outline'>
										Đăng Ký
									</Button>
								</div>
							) : (
								<div className={cx("hero-buttons")}>
									<Button to='/home' variant='primary-hero'>
										Vào Trang Chủ
									</Button>
									<Button to='/profile' variant='outline'>
										Hồ Sơ Của Tôi
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
								Ai đang sử dụng CodeJudge?
							</h2>
							<button
								className={cx("see-more-btn-main")}
								onClick={(e) => toggleAllFeatures(e.target)}
							>
								Xem thêm
							</button>
						</div>
					</div>

					<div className={cx("about-grid")}>
						<div className={cx("about-card")}>
							<div className={cx("about-card-header")}>
								<div className={cx("about-text-section")}>
									<h3 className={cx("about-card-title")}>
										Sinh Viên
									</h3>
									<p className={cx("about-card-description")}>
										Thành thạo thuật toán và cấu trúc dữ
										liệu thông qua các lộ trình học tập có
										cấu trúc và thử thách lập trình.
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
									TÍNH NĂNG CHÍNH
								</h4>
								<ul className={cx("features-list")}>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-medal'></i>
										</span>
										<span className={cx("feature-text")}>
											Cuộc thi lập trình tương tác
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-book-open'></i>
										</span>
										<span className={cx("feature-text")}>
											Hướng dẫn từng bước
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-folder'></i>
										</span>
										<span className={cx("feature-text")}>
											Bộ bài tập thực hành
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className={cx("about-card")}>
							<div className={cx("about-card-header")}>
								<div className={cx("about-text-section")}>
									<h3 className={cx("about-card-title")}>
										Lập Trình Viên
									</h3>
									<p className={cx("about-card-description")}>
										Rèn luyện kỹ năng lập trình và chuẩn bị
										cho phỏng vấn kỹ thuật với các thử thách
										thực tế.
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
									TÍNH NĂNG CHÍNH
								</h4>
								<ul className={cx("features-list")}>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-code-alt'></i>
										</span>
										<span className={cx("feature-text")}>
											Nhiều ngôn ngữ lập trình
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-timer'></i>
										</span>
										<span className={cx("feature-text")}>
											Thử thách có thời gian
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-bar-chart'></i>
										</span>
										<span className={cx("feature-text")}>
											Phân tích hiệu suất
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className={cx("about-card")}>
							<div className={cx("about-card-header")}>
								<div className={cx("about-text-section")}>
									<h3 className={cx("about-card-title")}>
										Công Ty
									</h3>
									<p className={cx("about-card-description")}>
										Tổ chức cuộc thi lập trình và khám phá
										các lập trình viên tài năng cho đội ngũ
										của bạn.
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
									TÍNH NĂNG CHÍNH
								</h4>
								<ul className={cx("features-list")}>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-trophy'></i>
										</span>
										<span className={cx("feature-text")}>
											Tổ chức cuộc thi tùy chỉnh
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-user-check'></i>
										</span>
										<span className={cx("feature-text")}>
											Công cụ tuyển dụng nhân tài
										</span>
									</li>
									<li className={cx("feature-item")}>
										<span className={cx("feature-icon")}>
											<i className='bx bx-pie-chart'></i>
										</span>
										<span className={cx("feature-text")}>
											Báo cáo ứng viên chi tiết
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
							Ngôn Ngữ Lập Trình Được Hỗ Trợ
						</h2>
						<p className={cx("section-subtitle")}>
							Viết giải pháp bằng ngôn ngữ lập trình ưa thích của
							bạn với sự hỗ trợ toàn diện của chúng tôi
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
								<h3 className={cx("language-name")}>Python</h3>
								<p className={cx("language-description")}>
									Hoàn hảo cho thuật toán và khoa học dữ liệu
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										Cú pháp dễ
									</span>
									<span className={cx("feature-tag")}>
										Thư viện phong phú
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
									JavaScript
								</h3>
								<p className={cx("language-description")}>
									Linh hoạt và đa dụng cho mọi lĩnh vực
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										Linh hoạt
									</span>
									<span className={cx("feature-tag")}>
										Hiện đại
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
								<h3 className={cx("language-name")}>C/C++</h3>
								<p className={cx("language-description")}>
									Lập trình thi đấu hiệu năng cao
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										Nhanh
									</span>
									<span className={cx("feature-tag")}>
										Hiệu quả
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
								<h3 className={cx("language-name")}>Java</h3>
								<p className={cx("language-description")}>
									Lập trình hướng đối tượng cấp doanh nghiệp
								</p>
								<div className={cx("language-features")}>
									<span className={cx("feature-tag")}>
										Mạnh mẽ
									</span>
									<span className={cx("feature-tag")}>
										Có thể mở rộng
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className={cx("languages-footer")}>
						<p className={cx("languages-note")}>
							<i className='bx bx-info-circle'></i>
							Không thấy ngôn ngữ yêu thích của bạn? Chúng tôi
							liên tục thêm hỗ trợ cho nhiều ngôn ngữ lập trình
							hơn.
						</p>
						<Button to='/languages' variant='outline'>
							Xem Tất Cả Ngôn Ngữ
						</Button>
					</div>
				</div>
			</section>

			<section className={cx("cta-section")}>
				<div className={cx("container")}>
					<div className={cx("cta-content")}>
						<h2 className={cx("cta-title")}>
							Sẵn sàng Bắt Đầu Lập Trình?
						</h2>
						<p className={cx("cta-text")}>
							Tham gia cùng hàng nghìn lập trình viên đang cải
							thiện kỹ năng mỗi ngày. Bắt đầu giải quyết bài toán
							ngay!
						</p>
						<div
							style={{
								display: "flex",
								gap: "1rem",
								justifyContent: "center",
								flexWrap: "wrap",
							}}
						>
							{!isLoggedIn ? (
								<Button
									to='/register'
									variant='primary'
									size='lg'
								>
									Tạo Tài Khoản
								</Button>
							) : (
								<Button
									to='/profile'
									variant='primary'
									size='lg'
								>
									Xem Hồ Sơ
								</Button>
							)}
							<Button to='/home' variant='outline' size='lg'>
								Duyệt Bài Toán
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
