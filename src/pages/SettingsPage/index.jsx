import {useLocation} from "react-router-dom";
import {
	Sidebar,
	InterfaceAndLanguageTab,
	PasswordAndSecurityTab,
	PersonalInfoTab,
} from "./components";
import style from "./SettingsPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const SettingsPage = () => {
	const location = useLocation();

	const shouldShowSettings =
		location.pathname === "/settings" ||
		location.pathname === "/settings/personal-info";

	return (
		<div className={cx("settings-page")}>
			<div className={cx("container")}>
				<Sidebar className={cx("sidebar")} />
				<div className={cx("content")}>
					{shouldShowSettings && <PersonalInfoTab />}
					<InterfaceAndLanguageTab />
					<PasswordAndSecurityTab />
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
