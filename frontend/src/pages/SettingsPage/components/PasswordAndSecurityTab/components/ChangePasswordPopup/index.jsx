import React, {useState, useCallback} from "react";
import classNames from "classnames/bind";
import {useAuth} from "../../../../../../hooks/useAuth";
import {useGlobalNotificationPopup} from "../../../../../../hooks/useGlobalNotificationPopup";
import request from "../../../../../../utils/request";
import {Button, Input, Loading, Tooltip} from "../../../../../../components/UI";
import {BiCheck, BiX} from "react-icons/bi";
import zxcvbn from "zxcvbn";
import "tippy.js/dist/tippy.css";
import style from "./ChangePasswordPopup.module.scss";

const cx = classNames.bind(style);

const ChangePasswordPopup = ({isOpen, onClose}) => {
	const {token, setToken} = useAuth();
	const {showNotification} = useGlobalNotificationPopup();

	const [phase, setPhase] = useState(1);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [tempAuthHashCode, setTempAuthHashCode] = useState("");
	const [passwordFocused, setPasswordFocused] = useState(false);

	const password = formData.newPassword || "";
	const strength = zxcvbn(password);
	const score = strength.score;
	const rules = [
		{
			label: "Ít nhất 8 ký tự",
			test: password.length >= 8,
		},
		{
			label: "Có chữ hoa",
			test: /[A-Z]/.test(password),
		},
		{
			label: "Có chữ thường",
			test: /[a-z]/.test(password),
		},
		{
			label: "Có số",
			test: /[0-9]/.test(password),
		},
		{
			label: "Có ký tự đặc biệt",
			test: /[^A-Za-z0-9]/.test(password),
		},
	];
	const dotColors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];
	const dotColor = dotColors[score];

	const renderPasswordRequirements = (rules) => (
		<div style={{minWidth: 180}}>
			<div style={{fontWeight: 600, marginBottom: 4}}>
				Yêu cầu mật khẩu:
			</div>
			<div
				style={{
					margin: 0,
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				{rules.map((rule, idx) => (
					<span
						key={idx}
						style={{
							color: rule.test ? "#27ae60" : "#e74c3c",
							fontWeight: rule.test ? 600 : 400,
							marginBottom: 2,
						}}
					>
						{rule.test ? <BiX /> : <BiCheck />} {rule.label}
					</span>
				))}
			</div>
		</div>
	);

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
		if (errors[name]) {
			setErrors((prev) => ({...prev, [name]: ""}));
		}
	};

	const validatePhase1 = useCallback(() => {
		const newErrors = {};
		if (!formData.currentPassword.trim()) {
			newErrors.currentPassword = "Mật khẩu hiện tại là bắt buộc";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData.currentPassword]);

	const validatePhase2 = useCallback(() => {
		const newErrors = {};
		if (!formData.newPassword.trim()) {
			newErrors.newPassword = "Mật khẩu mới là bắt buộc";
		} else if (formData.newPassword.length < 8) {
			newErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
		}
		if (formData.newPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData.newPassword, formData.confirmPassword]);

	const handlePhase1Submit = async (e) => {
		e.preventDefault();
		if (!validatePhase1()) return;

		setLoading(true);
		try {
			const response = await request.initiatePasswordChange(
				formData.currentPassword,
				token
			);
			if (response.success) {
				setTempAuthHashCode(response.tempAuthHashCode);
				setPhase(2);
				setFormData({
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				});
				showNotification(
					"Mật khẩu hiện tại đã được xác nhận. Vui lòng nhập mật khẩu mới.",
					"success"
				);
			} else {
				showNotification(
					response.message || "Không thể xác nhận mật khẩu hiện tại",
					"error"
				);
			}
		} catch (error) {
			showNotification("Đã xảy ra lỗi khi xác nhận mật khẩu", "error");
		} finally {
			setLoading(false);
		}
	};

	const handlePhase2Submit = async (e) => {
		e.preventDefault();
		if (!validatePhase2()) return;

		setLoading(true);
		try {
			const response = await request.confirmPasswordChange(
				tempAuthHashCode,
				formData.newPassword,
				formData.confirmPassword,
				token
			);

			if (response && response.success === true) {
				if (response.token) {
					localStorage.setItem("userToken", response.token);
					setToken(response.token);
				}

				showNotification(
					"Mật khẩu đã được thay đổi thành công",
					"success"
				);
				handleClose();
			} else {
				showNotification(
					response?.message || "Không thể thay đổi mật khẩu",
					"error"
				);
			}
		} catch (error) {
			showNotification("Đã xảy ra lỗi khi thay đổi mật khẩu", "error");
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setPhase(1);
		setFormData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
		setErrors({});
		setTempAuthHashCode("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className={cx("overlay")}>
			<div className={cx("popup")}>
				<div className={cx("header")}>
					<h2>Thay đổi mật khẩu</h2>
					<button
						className={cx("close-btn", {disabled: loading})}
						onClick={handleClose}
						disabled={loading}
					>
						<BiX />
					</button>
				</div>
				<div className={cx("body")}>
					{phase === 1 ? (
						<form onSubmit={handlePhase1Submit}>
							<div className={cx("form-group")}>
								<label>Mật khẩu hiện tại</label>
								<Input
									type='password'
									name='currentPassword'
									value={formData.currentPassword}
									onChange={handleInputChange}
									placeholder='Nhập mật khẩu hiện tại'
									className={cx({
										error: errors.currentPassword,
									})}
									disabled={loading}
								/>
								{errors.currentPassword && (
									<div className={cx("error-text")}>
										{errors.currentPassword}
									</div>
								)}
							</div>
							<div className={cx("actions")}>
								<Button
									type='button'
									onClick={handleClose}
									disabled={loading}
									variant='outline'
								>
									Hủy
								</Button>
								<Button type='submit' disabled={loading}>
									{loading ? (
										<>
											<Loading size={14} />
										</>
									) : (
										"Xác nhận"
									)}
								</Button>
							</div>
						</form>
					) : (
						<form onSubmit={handlePhase2Submit}>
							<div className={cx("form-group")}>
								<label>Mật khẩu mới</label>
								<div
									className={cx("password-row", {
										focused: passwordFocused,
										"has-value": password.length > 0,
									})}
									style={{
										position: "relative",
										display: "flex",
										alignItems: "center",
									}}
								>
									<Input
										type='password'
										name='newPassword'
										value={formData.newPassword}
										onFocus={() => setPasswordFocused(true)}
										onBlur={() => setPasswordFocused(false)}
										onChange={handleInputChange}
										placeholder='Nhập mật khẩu mới'
										className={cx("password-input", {
											error: errors.newPassword,
										})}
										disabled={loading}
									/>
									<Tooltip
										content={renderPasswordRequirements(
											rules
										)}
										placement='right'
										disabled={
											!(
												passwordFocused ||
												password.length > 0
											)
										}
									>
										<span
											className={cx("strength-dot", {
												active: passwordFocused,
												show:
													passwordFocused ||
													password.length > 0,
											})}
											style={{
												background: dotColor,
											}}
										/>
									</Tooltip>
								</div>
								{errors.newPassword && (
									<div className={cx("error-text")}>
										{errors.newPassword}
									</div>
								)}
							</div>
							<div className={cx("form-group")}>
								<label>Xác nhận mật khẩu mới</label>
								<Input
									type='password'
									name='confirmPassword'
									value={formData.confirmPassword}
									onChange={handleInputChange}
									placeholder='Xác nhận mật khẩu mới'
									className={cx({
										error: errors.confirmPassword,
									})}
									disabled={loading}
								/>
								{errors.confirmPassword && (
									<div className={cx("error-text")}>
										{errors.confirmPassword}
									</div>
								)}
							</div>
							<div className={cx("actions")}>
								<Button
									type='button'
									onClick={() => {
										setPhase(1);
										setTempAuthHashCode("");
										setFormData({
											currentPassword: "",
											newPassword: "",
											confirmPassword: "",
										});
										setErrors({});
									}}
									disabled={loading}
									variant='outline'
								>
									Quay lại
								</Button>
								<Button type='submit' disabled={loading}>
									{loading ? (
										<>
											<Loading size={14} />
										</>
									) : (
										"Thay đổi mật khẩu"
									)}
								</Button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordPopup;
