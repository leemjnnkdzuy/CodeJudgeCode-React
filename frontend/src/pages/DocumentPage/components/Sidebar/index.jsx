import {useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import {
	MdPrivacyTip,
	MdDescription,
	MdCookie,
	MdContactMail,
} from "react-icons/md";
import {FaArrowLeft} from "react-icons/fa";
import style from "./Sidebar.module.scss";
import {Button} from "../../../../components/UI/";

const cx = classNames.bind(style);

const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const menuItems = [
		{
			path: "/docs/privacy",
			label: "Chính Sách Bảo Mật",
			icon: <MdPrivacyTip />,
		},
		{
			path: "/docs/terms",
			label: "Điều Khoản Sử Dụng",
			icon: <MdDescription />,
		},
		{
			path: "/docs/cookies",
			label: "Chính Sách Cookies",
			icon: <MdCookie />,
		},
		{
			path: "/docs/contact",
			label: "Liên Hệ",
			icon: <MdContactMail />,
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
									active: location.pathname === item.path,
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
		</div>
	);
};

export default Sidebar;
