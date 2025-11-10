import {useLocation} from "react-router-dom";
import classNames from "classnames/bind";
import style from "./ContactForm.module.scss";
import {
	FaEnvelope,
	FaBriefcase,
	FaBug,
	FaLightbulb,
	FaPaperPlane,
	FaQuestionCircle,
} from "react-icons/fa";

const cx = classNames.bind(style);

const ContactForm = () => {
	const location = useLocation();

	if (location.pathname !== "/docs/contact") {
		return null;
	}

	return (
		<section className={cx("contact-section")}>
			<div className={cx("container")}>
				<div className={cx("contact-header")}>
					<div className={cx("contact-icon")}></div>
					<h1 className={cx("contact-title")}>
						Liên Hệ Với Chúng Tôi
					</h1>
					<p className={cx("contact-subtitle")}>
						Chúng tôi luôn sẵn sàng hỗ trợ bạn! Hãy liên hệ với
						chúng tôi qua các kênh dưới đây hoặc gửi tin nhắn trực
						tiếp để được hỗ trợ nhanh nhất.
					</p>
				</div>

				<div className={cx("contact-content")}>
					<div className={cx("contact-methods")}>
						<h2>Thông Tin Liên Hệ</h2>
						<div className={cx("contact-items")}>
							<div className={cx("contact-item")}>
								<FaEnvelope />
								<div>
									<h3>Email Hỗ Trợ</h3>
									<p>support@codejudge.com</p>
									<p>Thời gian phản hồi: 24-48 giờ</p>
								</div>
							</div>
							<div className={cx("contact-item")}>
								<FaBriefcase />
								<div>
									<h3>Email Doanh Nghiệp</h3>
									<p>business@codejudge.com</p>
									<p>Cho các đối tác và hợp tác kinh doanh</p>
								</div>
							</div>
							<div className={cx("contact-item")}>
								<FaBug />
								<div>
									<h3>Báo Lỗi</h3>
									<p>bugs@codejudge.com</p>
									<p>
										Báo cáo lỗi kỹ thuật và vấn đề hệ thống
									</p>
								</div>
							</div>
							<div className={cx("contact-item")}>
								<FaLightbulb />
								<div>
									<h3>Ý Tưởng</h3>
									<p>ideas@codejudge.com</p>
									<p>
										Chúng tôi luôn lắng nghe ý kiến của bạn!
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className={cx("contact-form-section")}>
						<h2>Gửi Tin Nhắn</h2>
						<form className={cx("contact-form")}>
							<div className={cx("form-group")}>
								<label htmlFor='name'>Họ và Tên *</label>
								<input
									type='text'
									id='name'
									name='name'
									required
									placeholder='Nhập họ và tên của bạn'
								/>
							</div>
							<div className={cx("form-group")}>
								<label htmlFor='email'>Email *</label>
								<input
									type='email'
									id='email'
									name='email'
									required
									placeholder='Nhập địa chỉ email của bạn'
								/>
							</div>
							<div className={cx("form-group")}>
								<label htmlFor='subject'>Chủ Đề *</label>
								<select id='subject' name='subject' required>
									<option value=''>Chọn chủ đề</option>
									<option value='support'>
										Hỗ trợ kỹ thuật
									</option>
									<option value='bug'>Báo lỗi</option>
									<option value='feature'>
										Đề xuất tính năng
									</option>
									<option value='business'>
										Hợp tác kinh doanh
									</option>
									<option value='other'>Khác</option>
								</select>
							</div>
							<div className={cx("form-group")}>
								<label htmlFor='message'>Nội Dung *</label>
								<textarea
									id='message'
									name='message'
									rows='6'
									required
									placeholder='Mô tả chi tiết vấn đề hoặc yêu cầu của bạn...'
								></textarea>
							</div>
							<button
								type='submit'
								className={cx("btn", "btn-primary")}
							>
								<FaPaperPlane />
								Gửi Tin Nhắn
							</button>
						</form>
					</div>

					<div className={cx("faq-section")}>
						<h2>Câu Hỏi Thường Gặp</h2>
						<div className={cx("faq-items")}>
							<div className={cx("faq-item")}>
								<h3>
									<FaQuestionCircle /> Làm thế nào để reset
									mật khẩu?
								</h3>
								<p>
									Truy cập trang đăng nhập và nhấn "Quên mật
									khẩu", sau đó làm theo hướng dẫn gửi về
									email.
								</p>
							</div>
							<div className={cx("faq-item")}>
								<h3>
									<FaQuestionCircle /> Tại sao tôi không thể
									nộp bài?
								</h3>
								<p>
									Kiểm tra kết nối internet, đảm bảo code
									không có lỗi cú pháp và thử làm mới trang.
								</p>
							</div>
							<div className={cx("faq-item")}>
								<h3>
									<FaQuestionCircle /> Làm thế nào để liên hệ
									với admin?
								</h3>
								<p>
									Gửi email trực tiếp tới
									support@codejudge.com hoặc sử dụng form liên
									hệ trên trang này.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className={cx("last-updated")}>
					<p>
						<em>Cập nhật lần cuối: 15 tháng 8, 2025</em>
					</p>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
