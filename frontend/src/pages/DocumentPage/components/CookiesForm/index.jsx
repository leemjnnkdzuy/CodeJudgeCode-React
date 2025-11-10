import {useLocation} from "react-router-dom";
import classNames from "classnames/bind";
import style from "./CookiesForm.module.scss";
import {
	FaEnvelope,
	FaCookie,
	FaMapMarkerAlt,
	FaPhone,
	FaExclamationTriangle,
} from "react-icons/fa";

const cx = classNames.bind(style);

const CookiesForm = () => {
	const location = useLocation();

	if (location.pathname !== "/docs/cookies") {
		return null;
	}

	return (
		<section className={cx("cookies-section")}>
			<div className={cx("container")}>
				<div className={cx("cookies-header")}>
					<div className={cx("cookies-icon")}></div>
					<h1 className={cx("cookies-title")}>
						CHÍNH SÁCH COOKIE CỦA CODEJUDGE
					</h1>
					<p className={cx("cookies-subtitle")}>
						Chính sách này giải thích cách CodeJudge sử dụng cookie
						và các công nghệ tương tự để nhận diện bạn khi bạn truy
						cập vào nền tảng của chúng tôi tại codejudge.vn hoặc sử
						dụng bất kỳ dịch vụ nào liên quan đến nền tảng.
					</p>
				</div>

				<div className={cx("cookies-content")}>
					<div className={cx("cookies-article")}>
						<h2>COOKIE LÀ GÌ?</h2>
						<p>
							Cookie là các tệp văn bản nhỏ được đặt trên thiết bị
							của bạn (máy tính, điện thoại, máy tính bảng, v.v.)
							khi bạn truy cập một website. Cookie giúp trang web
							ghi nhớ thông tin về bạn để cải thiện trải nghiệm sử
							dụng, như giữ bạn luôn đăng nhập, ghi nhớ tùy chọn
							ngôn ngữ hoặc phân tích cách bạn tương tác với dịch
							vụ.
						</p>

						<h2>CHÚNG TÔI SỬ DỤNG COOKIE ĐỂ LÀM GÌ?</h2>
						<p>
							Chúng tôi sử dụng cookie và các công nghệ tương tự
							cho các mục đích sau:
						</p>

						<ul className={cx("cookies-list")}>
							<li>
								<strong>
									Cần thiết cho hoạt động của website:
								</strong>{" "}
								Giúp bạn đăng nhập, ghi nhớ phiên làm việc và
								bảo vệ bảo mật.
							</li>
							<li>
								<strong>
									Phân tích hiệu suất và trải nghiệm:
								</strong>{" "}
								Đo lường mức độ sử dụng dịch vụ, giúp cải thiện
								tốc độ tải trang và nhận biết các lỗi kỹ thuật.
							</li>
							<li>
								<strong>Tùy chỉnh nội dung:</strong> Ghi nhớ lựa
								chọn của bạn như ngôn ngữ, chế độ hiển thị, v.v.
							</li>
							<li>
								<strong>
									Quảng cáo theo ngữ cảnh (nếu có):
								</strong>{" "}
								Hiển thị nội dung phù hợp hơn với bạn, không
								theo dõi hành vi cá nhân hóa.
							</li>
						</ul>

						<p className={cx("note-text")}>
							<strong>Lưu ý:</strong> Chúng tôi không sử dụng
							cookie để theo dõi cá nhân hóa, xây dựng hồ sơ người
							dùng, hoặc bán dữ liệu cho bên thứ ba.
						</p>

						<h2>CÁC LOẠI COOKIE MÀ CHÚNG TÔI SỬ DỤNG</h2>
						<div className={cx("cookie-table")}>
							<div className={cx("table-responsive")}>
								<table className={cx("cookie-types-table")}>
									<thead>
										<tr>
											<th>Loại Cookie</th>
											<th>Mục Đích</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<strong>Cookie bắt buộc</strong>
											</td>
											<td>
												Cho phép bạn truy cập, sử dụng
												các chức năng cơ bản.
											</td>
										</tr>
										<tr>
											<td>
												<strong>
													Cookie hiệu suất
												</strong>
											</td>
											<td>
												Phân tích thống kê lượng truy
												cập và hành vi người dùng.
											</td>
										</tr>
										<tr>
											<td>
												<strong>
													Cookie chức năng
												</strong>
											</td>
											<td>
												Ghi nhớ cài đặt cá nhân hóa
												(ngôn ngữ, theme, v.v.).
											</td>
										</tr>
										<tr>
											<td>
												<strong>
													Cookie của bên thứ ba
												</strong>
											</td>
											<td>
												Dịch vụ phân tích (Google
												Analytics), CDN, hoặc hỗ trợ.
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<h2>CÁCH QUẢN LÝ COOKIE</h2>
						<p>
							Bạn có quyền kiểm soát hoặc xóa cookie bất kỳ lúc
							nào:
						</p>

						<ul className={cx("cookies-list")}>
							<li>
								Trình duyệt của bạn có thể được cấu hình để từ
								chối tất cả hoặc một số cookie.
							</li>
							<li>
								Bạn cũng có thể xóa các cookie đã lưu trữ thông
								qua phần cài đặt trình duyệt.
							</li>
						</ul>

						<div className={cx("warning-box")}>
							<h4>
								<FaExclamationTriangle /> Lưu ý quan trọng
							</h4>
							<p>
								Nếu tắt cookie, một số chức năng của CodeJudge
								có thể không hoạt động đúng hoặc bạn có thể bị
								đăng xuất khỏi tài khoản thường xuyên.
							</p>
						</div>

						<h2>LIÊN KẾT ĐẾN BÊN THỨ BA</h2>
						<p>
							Trang web của chúng tôi có thể chứa liên kết đến các
							dịch vụ bên ngoài. Các bên thứ ba này có thể sử dụng
							cookie riêng của họ, và chúng tôi không kiểm soát
							hoặc chịu trách nhiệm đối với các cookie đó.
						</p>

						<h2>CẬP NHẬT CHÍNH SÁCH</h2>
						<p>
							Chính sách cookie này có thể được cập nhật để phản
							ánh sự thay đổi trong cách chúng tôi sử dụng cookie
							hoặc yêu cầu pháp lý Việt Nam. Ngày cập nhật sẽ được
							ghi rõ ở đầu trang.
						</p>

						<div className={cx("contact-info")}>
							<h3>LIÊN HỆ VỀ COOKIE</h3>
							<p>
								Nếu bạn có câu hỏi về chính sách cookie này, vui
								lòng liên hệ:
							</p>
							<div className={cx("contact-items")}>
								<div className={cx("contact-item")}>
									<FaEnvelope />
									<span>support@codejudge.vn</span>
								</div>
								<div className={cx("contact-item")}>
									<FaCookie />
									<span>
										privacy@codejudge.vn (câu hỏi về cookie
										và privacy)
									</span>
								</div>
								<div className={cx("contact-item")}>
									<FaMapMarkerAlt />
									<span>
										Địa chỉ: Thành phố Hồ Chí Minh, Việt Nam
									</span>
								</div>
								<div className={cx("contact-item")}>
									<FaPhone />
									<span>
										Hotline: 1900-xxxx (8:00 - 22:00 hàng
										ngày)
									</span>
								</div>
							</div>
						</div>

						<div className={cx("last-updated")}>
							<p>
								<em>
									Chính sách cookie này có hiệu lực từ ngày
									01/08/2025
								</em>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CookiesForm;
