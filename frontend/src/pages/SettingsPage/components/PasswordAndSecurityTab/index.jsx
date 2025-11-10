import React, {useState} from "react";
import classNames from "classnames/bind";
import {useLanguages} from "../../../../hooks/useLanguages";
import {Button} from "../../../../components/UI";
import {ChangePasswordPopup, ChangeEmailPopup} from "./components";
import style from "./PasswordAndSecurityTab.module.scss";

const cx = classNames.bind(style);

const PasswordAndSecurityTab = ({
	setLoading: propSetLoading,
	setHasChanges: propSetHasChanges,
	updateSubmitHandler: propUpdateSubmitHandler,
	resetChanges: propResetChanges,
}) => {
	const {t} = useLanguages();
	const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
	const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

	const openPasswordPopup = () => {
		setIsPasswordPopupOpen(true);
	};

	const closePasswordPopup = () => {
		setIsPasswordPopupOpen(false);
	};

	const openEmailPopup = () => {
		setIsEmailPopupOpen(true);
	};

	const closeEmailPopup = () => {
		setIsEmailPopupOpen(false);
	};

	return (
		<div className={cx("password-security-tab")}>
			<div className={cx("title")}>
				{t("settingsPage.passwordAndSecurityTab.title")}
			</div>
			<div className={cx("content")}>
				<div className={cx("section")}>
					<div className={cx("section-header")}>
						<div className={cx("section-title")}>
							{t(
								"settingsPage.passwordAndSecurityTab.changePasswordTitle"
							)}
						</div>
						<div className={cx("section-description")}>
							{t(
								"settingsPage.passwordAndSecurityTab.changePasswordDescription"
							)}
						</div>
					</div>
					<Button onClick={openPasswordPopup}>
						{t(
							"settingsPage.passwordAndSecurityTab.changePasswordButton"
						)}
					</Button>
				</div>
				<div className={cx("section")}>
					<div className={cx("section-header")}>
						<div className={cx("section-title")}>
							{t(
								"settingsPage.passwordAndSecurityTab.changeEmailTitle"
							)}
						</div>
						<div className={cx("section-description")}>
							{t(
								"settingsPage.passwordAndSecurityTab.changeEmailDescription"
							)}
						</div>
					</div>
					<Button onClick={openEmailPopup}>
						{t(
							"settingsPage.passwordAndSecurityTab.changeEmailButton"
						)}
					</Button>
				</div>
			</div>
			<ChangePasswordPopup
				isOpen={isPasswordPopupOpen}
				onClose={closePasswordPopup}
			/>
			<ChangeEmailPopup
				isOpen={isEmailPopupOpen}
				onClose={closeEmailPopup}
			/>
		</div>
	);
};

export default PasswordAndSecurityTab;
