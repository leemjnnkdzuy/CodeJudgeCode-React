import {useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import {BiLock, BiUser, BiGlobe, BiEdit} from "react-icons/bi";
import {FaArrowLeft} from "react-icons/fa";
import style from "./Sidebar.module.scss";
import {Button} from "../../../../components/UI/";
import FadeInUpdateButton from "../FadeInUpdateButton";

const cx = classNames.bind(style);

const Sidebar = ({loading = false, hasChanges = false, onClick}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const menuItems = [
		{
			path: "/settings/personal-info",
			label: "Thông Tin Cá Nhân",
			icon: <BiUser />,
		},
		{
			path: "/settings/password-and-security",
			label: "Mật Khẩu và Bảo Mật",
			icon: <BiLock />,
		},
		{
			path: "/settings/interface-and-language",
			label: "Giao diện và Ngôn ngữ",
			icon: <BiGlobe />,
		},
		{
			path: "/settings/editor-settings",
			label: "Cài Đặt Trình Soạn Thảo",
			icon: <BiEdit />,
		},
	];

	return (
		<div className={cx("sidebar")}>
			<div className={cx("sidebar-header")}>
				<Button
					size='sm'
					icon={<FaArrowLeft />}
					className={cx("back-button")}
					onClick={() => navigate("/")}
					variant='outline'
				>
					Trở về trang chủ
				</Button>
			</div>

			<nav className={cx("sidebar-nav")}>
				<ul className={cx("nav-list")}>
					{menuItems.map((item, index) => (
						<li key={index} className={cx("nav-item")}>
							<div
								onClick={() => navigate(item.path)}
								className={cx("nav-link", {
									active:
										location.pathname === item.path ||
										(location.pathname === "/settings" &&
											item.path ===
												"/settings/personal-info"),
								})}
							>
								<span className={cx("nav-icon")}>
									{item.icon}
								</span>
								<span className={cx("nav-text")}>
									{item.label}
								</span>
							</div>
						</li>
					))}
				</ul>
			</nav>
			<div className={cx("sidebar-footer")}>
				<FadeInUpdateButton
					loading={loading}
					hasChanges={hasChanges}
					onClick={onClick}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
