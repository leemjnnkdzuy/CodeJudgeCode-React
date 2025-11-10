import {useLocation} from "react-router-dom";
import {
	Sidebar,
	InterfaceAndLanguageTab,
	PasswordAndSecurityTab,
	PersonalInfoTab,
	EditorSettingsTab,
} from "./components";
import useSettings from "../../hooks/useSettings";
import style from "./SettingsPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const SettingsPage = () => {
	const location = useLocation();
	const {
		loading,
		hasChanges,
		submitHandler,
		setLoading,
		setHasChanges,
		updateSubmitHandler,
		resetChanges,
	} = useSettings();

	const tabComponents = {
		"/settings": PersonalInfoTab,
		"/settings/personal-info": PersonalInfoTab,
		"/settings/password-and-security": PasswordAndSecurityTab,
		"/settings/interface-and-language": InterfaceAndLanguageTab,
		"/settings/editor-settings": EditorSettingsTab,
	};

	const CurrentTab = tabComponents[location.pathname];

	return (
		<div className={cx("settings-page")}>
			<div className={cx("container")}>
				<Sidebar
					loading={loading}
					hasChanges={hasChanges}
					onClick={submitHandler}
				/>
				<div className={cx("content")}>
					{CurrentTab && (
						<CurrentTab
							setLoading={setLoading}
							setHasChanges={setHasChanges}
							updateSubmitHandler={updateSubmitHandler}
							resetChanges={resetChanges}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
