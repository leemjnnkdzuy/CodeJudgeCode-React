import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFoundPage.module.scss";
import {Button} from "../../components/UI/";
import handleRefresh from "../../handlers/handleRefresh";
import handleGoBack from "../../handlers/handleGoBack";

const cx = classNames.bind(styles);

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<section className={cx("errorSection")}>
			<div className={cx("container")}>
				<div className={cx("errorContent")}>
					<div className={cx("errorText")}>
						<div className={cx("errorCode")}>404</div>
						<h1 className={cx("errorTitle")}>
							Ôi! Không Tìm Thấy Trang
						</h1>
						<p className={cx("errorSubtitle")}>
							Trang bạn đang tìm kiếm có vẻ như đã lạc vào khoảng
							trống kỹ thuật số. Đừng lo lắng, ngay cả những thuật
							toán tốt nhất đôi khi cũng đi sai đường!
						</p>
						<div className={cx("errorButtons")}>
							<Button
								to='/'
								variant='primary-hero'
								className={cx("btnPrimaryHero")}
							>
								Về Trang Chủ
							</Button>
							<Button
								onClick={() => handleGoBack(navigate)}
								variant='outline'
								className={cx("btnOutline")}
							>
								Trở Về Trang Trước
							</Button>
						</div>
						<div className={cx("errorSuggestions")}>
							<h3>Những gì bạn có thể làm:</h3>
							<ul className={cx("suggestionsList")}>
								<li>
									<i className='bx bx-search'></i>
									<span>Kiểm tra lỗi chính tả trong URL</span>
								</li>
								<li onClick={handleRefresh}>
									<i className='bx bx-refresh'></i>
									<span>Làm mới trang</span>
								</li>
								<li>
									<i className='bx bx-support'></i>
									<span>
										Liên hệ đội hỗ trợ của chúng tôi
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className={cx("errorImage")}>
						<div className={cx("errorIllustration")}>
							<div className={cx("codeBlock")}>
								<div className={cx("codeLine")}>
									<span className={cx("keyword")}>
										function
									</span>{" "}
									<span className={cx("functionName")}>
										findPage
									</span>
									() {"{"}
								</div>
								<div className={cx("codeLine", "indent")}>
									<span className={cx("keyword")}>
										return
									</span>{" "}
									<span className={cx("string")}>
										"404: Not Found"
									</span>
									;
								</div>
								<div className={cx("codeLine")}>{"}"}</div>
								<div className={cx("codeLine")}>
									<span className={cx("comment")}>
										{"// TODO: Sửa lỗi này! 🐛"}
									</span>
								</div>
							</div>
							<div className={cx("floatingIcons")}>
								<i className='bx bx-bug'></i>
								<i className='bx bx-error-circle'></i>
								<i className='bx bx-question-mark'></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFoundPage;
