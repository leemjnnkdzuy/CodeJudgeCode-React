import React, {useState} from "react";
import classNames from "classnames/bind";
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
			<div className={cx("title")}>Mật khẩu và Bảo mật</div>
			<div className={cx("content")}>
				<div className={cx("section")}>
					<div className={cx("section-header")}>
						<div className={cx("section-title")}>Đổi mật khẩu</div>
						<div className={cx("section-description")}>
							Thay đổi mật khẩu tài khoản của bạn để bảo mật tốt
							hơn.
						</div>
					</div>
					<Button onClick={openPasswordPopup}>
						Thay đổi mật khẩu
					</Button>
				</div>
				<div className={cx("section")}>
					<div className={cx("section-header")}>
						<div className={cx("section-title")}>Đổi email</div>
						<div className={cx("section-description")}>
							Thay đổi địa chỉ email liên kết với tài khoản.
						</div>
					</div>
					<Button onClick={openEmailPopup}>Thay đổi email</Button>
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
