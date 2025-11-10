import React, {useState, useCallback, useEffect} from "react";
import classNames from "classnames/bind";
import {Button, Input, Loading} from "../../../../../../components/UI";
import {useAuth} from "../../../../../../hooks/useAuth";
import {useGlobalNotificationPopup} from "../../../../../../hooks/useGlobalNotificationPopup";
import request from "../../../../../../utils/request";
import style from "./ChangeEmailPopup.module.scss";

const cx = classNames.bind(style);

const ChangeEmailPopup = ({isOpen, onClose}) => {
	const {token, updateUser} = useAuth();
	const {showNotification} = useGlobalNotificationPopup();

	const [phase, setPhase] = useState(1);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		currentPassword: "",
		currentEmailPin: "",
		newEmail: "",
		newEmailPin: "",
	});
	const [errors, setErrors] = useState({});
	const [changeMailAuthHashCode, setChangeMailAuthHashCode] = useState("");
	const [resendCooldown, setResendCooldown] = useState({
		phase1: 0,
		phase3: 0,
	});

	useEffect(() => {
		if (!isOpen) {
			setPhase(1);
			setFormData({
				currentPassword: "",
				currentEmailPin: "",
				newEmail: "",
				newEmailPin: "",
			});
			setErrors({});
			setChangeMailAuthHashCode("");
			setResendCooldown({phase1: 0, phase3: 0});
		}
	}, [isOpen]);

	useEffect(() => {
		const timer = setInterval(() => {
			setResendCooldown((prev) => ({
				phase1: Math.max(0, prev.phase1 - 1),
				phase3: Math.max(0, prev.phase3 - 1),
			}));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validatePhase1 = useCallback(() => {
		const newErrors = {};
		if (!formData.currentPassword.trim()) {
			newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
		}
		return newErrors;
	}, [formData.currentPassword]);

	const handlePhase1Submit = async (e) => {
		e.preventDefault();
		const validationErrors = validatePhase1();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setLoading(true);
		try {
			const response = await request.changeEmail(
				formData.currentPassword,
				token
			);
			if (response.success && response.sendMail) {
				showNotification(
					"Mã PIN đã được gửi đến email hiện tại của bạn",
					"success"
				);
				setPhase(2);
				setResendCooldown((prev) => ({...prev, phase1: 60}));
			}
		} catch (error) {
			setErrors({currentPassword: error.message || "Có lỗi xảy ra"});
		} finally {
			setLoading(false);
		}
	};

	const validatePhase2 = useCallback(() => {
		const newErrors = {};
		if (!formData.currentEmailPin.trim()) {
			newErrors.currentEmailPin = "Vui lòng nhập mã PIN";
		} else if (!/^\d{6}$/.test(formData.currentEmailPin)) {
			newErrors.currentEmailPin = "Mã PIN phải là 6 chữ số";
		}
		return newErrors;
	}, [formData.currentEmailPin]);

	const handlePhase2Submit = async (e) => {
		e.preventDefault();
		const validationErrors = validatePhase2();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setLoading(true);
		try {
			const response = await request.confirmChangeEmail(
				formData.currentEmailPin,
				token
			);
			if (response.success && response.changeMailAuthHashCode) {
				setChangeMailAuthHashCode(response.changeMailAuthHashCode);
				showNotification(
					"Xác thực thành công! Vui lòng nhập email mới",
					"success"
				);
				setPhase(3);
			}
		} catch (error) {
			setErrors({currentEmailPin: error.message || "Mã PIN không đúng"});
		} finally {
			setLoading(false);
		}
	};

	const validatePhase3 = useCallback(() => {
		const newErrors = {};
		if (!formData.newEmail.trim()) {
			newErrors.newEmail = "Vui lòng nhập email mới";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.newEmail)) {
			newErrors.newEmail = "Email không hợp lệ";
		}
		return newErrors;
	}, [formData.newEmail]);

	const handlePhase3Submit = async (e) => {
		e.preventDefault();
		const validationErrors = validatePhase3();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setLoading(true);
		try {
			const response = await request.sendVerificationEmail(
				formData.newEmail,
				changeMailAuthHashCode,
				token
			);
			if (response.success && response.sendMail) {
				showNotification("Mã PIN đã được gửi đến email mới", "success");
				setPhase(4);
				setResendCooldown((prev) => ({...prev, phase3: 60}));
			}
		} catch (error) {
			setErrors({newEmail: error.message || "Có lỗi xảy ra"});
		} finally {
			setLoading(false);
		}
	};

	const validatePhase4 = useCallback(() => {
		const newErrors = {};
		if (!formData.newEmailPin.trim()) {
			newErrors.newEmailPin = "Vui lòng nhập mã PIN";
		} else if (!/^\d{6}$/.test(formData.newEmailPin)) {
			newErrors.newEmailPin = "Mã PIN phải là 6 chữ số";
		}
		return newErrors;
	}, [formData.newEmailPin]);

	const handlePhase4Submit = async (e) => {
		e.preventDefault();
		const validationErrors = validatePhase4();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setLoading(true);
		try {
			const response = await request.confirmNewEmail(
				formData.newEmailPin,
				token
			);
			if (response.success && response.newMail) {
				updateUser({email: response.newMail});
				showNotification("Đổi email thành công!", "success");
				onClose();
			}
		} catch (error) {
			setErrors({newEmailPin: error.message || "Mã PIN không đúng"});
		} finally {
			setLoading(false);
		}
	};

	const handleResendPhase1 = async () => {
		if (resendCooldown.phase1 > 0) return;

		setLoading(true);
		try {
			const response = await request.resendChangeEmail(token);
			if (response.success && response.sendMail) {
				showNotification("Mã PIN đã được gửi lại", "success");
				setResendCooldown((prev) => ({...prev, phase1: 60}));
			}
		} catch (error) {
			showNotification(
				error.message || "Không thể gửi lại mã PIN",
				"error"
			);
		} finally {
			setLoading(false);
		}
	};

	const handleResendPhase3 = async () => {
		if (resendCooldown.phase3 > 0) return;

		setLoading(true);
		try {
			const response = await request.resendVerificationEmail(token);
			if (response.success && response.sendMail) {
				showNotification("Mã PIN đã được gửi lại", "success");
				setResendCooldown((prev) => ({...prev, phase3: 60}));
			}
		} catch (error) {
			showNotification(
				error.message || "Không thể gửi lại mã PIN",
				"error"
			);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		if (!loading) {
			onClose();
		}
	};

	const handleGoBack = () => {
		if (phase > 1) {
			setPhase(phase - 1);
			setErrors({});
		}
	};

	if (!isOpen) return null;

	const getPhaseTitle = () => {
		switch (phase) {
			case 1:
				return "Xác thực mật khẩu";
			case 2:
				return "Xác nhận mã PIN từ email hiện tại";
			case 3:
				return "Nhập email mới";
			case 4:
				return "Xác nhận mã PIN từ email mới";
			default:
				return "Đổi email";
		}
	};

	return (
		<div className={cx("overlay")}>
			<div className={cx("popup")}>
				<div className={cx("header")}>
					<h2>{getPhaseTitle()}</h2>
					<button
						type='button'
						className={cx("close-btn")}
						onClick={handleClose}
						disabled={loading}
					>
						×
					</button>
				</div>

				<div className={cx("body")}>
					<form
						onSubmit={
							phase === 1
								? handlePhase1Submit
								: phase === 2
								? handlePhase2Submit
								: phase === 3
								? handlePhase3Submit
								: handlePhase4Submit
						}
					>
						{phase === 1 && (
							<div className={cx("form-group")}>
								<label htmlFor='currentPassword'>
									Mật khẩu hiện tại
								</label>
								<Input
									type='password'
									id='currentPassword'
									name='currentPassword'
									value={formData.currentPassword}
									onChange={handleInputChange}
									placeholder='Nhập mật khẩu hiện tại'
									required
								/>
								{errors.currentPassword && (
									<div className={cx("error-text")}>
										{errors.currentPassword}
									</div>
								)}
							</div>
						)}

						{phase === 2 && (
							<div className={cx("form-group")}>
								<label htmlFor='currentEmailPin'>
									Mã PIN từ email hiện tại
								</label>
								<Input
									type='text'
									id='currentEmailPin'
									name='currentEmailPin'
									value={formData.currentEmailPin}
									onChange={handleInputChange}
									placeholder='Nhập mã PIN 6 số'
									maxLength='6'
									pattern='\d{6}'
									required
								/>
								{errors.currentEmailPin && (
									<div className={cx("error-text")}>
										{errors.currentEmailPin}
									</div>
								)}
								<div className={cx("resend-section")}>
									<button
										type='button'
										className={cx("resend-btn")}
										onClick={handleResendPhase1}
										disabled={
											loading || resendCooldown.phase1 > 0
										}
									>
										{resendCooldown.phase1 > 0
											? `Gửi lại sau ${resendCooldown.phase1}s`
											: "Gửi lại mã PIN"}
									</button>
								</div>
							</div>
						)}

						{phase === 3 && (
							<div className={cx("form-group")}>
								<label htmlFor='newEmail'>Email mới</label>
								<Input
									type='email'
									id='newEmail'
									name='newEmail'
									value={formData.newEmail}
									onChange={handleInputChange}
									placeholder='Nhập email mới'
									required
								/>
								{errors.newEmail && (
									<div className={cx("error-text")}>
										{errors.newEmail}
									</div>
								)}
							</div>
						)}

						{phase === 4 && (
							<div className={cx("form-group")}>
								<label htmlFor='newEmailPin'>
									Mã PIN từ email mới
								</label>
								<Input
									type='text'
									id='newEmailPin'
									name='newEmailPin'
									value={formData.newEmailPin}
									onChange={handleInputChange}
									placeholder='Nhập mã PIN 6 số'
									maxLength='6'
									pattern='\d{6}'
									required
								/>
								{errors.newEmailPin && (
									<div className={cx("error-text")}>
										{errors.newEmailPin}
									</div>
								)}
								<div className={cx("resend-section")}>
									<button
										type='button'
										className={cx("resend-btn")}
										onClick={handleResendPhase3}
										disabled={
											loading || resendCooldown.phase3 > 0
										}
									>
										{resendCooldown.phase3 > 0
											? `Gửi lại sau ${resendCooldown.phase3}s`
											: "Gửi lại mã PIN"}
									</button>
								</div>
							</div>
						)}

						<div className={cx("actions")}>
							{phase > 1 && (
								<Button
									type='button'
									onClick={handleGoBack}
									disabled={loading}
								>
									Quay lại
								</Button>
							)}
							<Button
								type='button'
								onClick={handleClose}
								disabled={loading}
							>
								Hủy
							</Button>
							<Button type='submit' disabled={loading}>
								{loading ? (
									<Loading size={10} />
								) : phase === 4 ? (
									"Hoàn tất"
								) : (
									"Tiếp tục"
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChangeEmailPopup;
