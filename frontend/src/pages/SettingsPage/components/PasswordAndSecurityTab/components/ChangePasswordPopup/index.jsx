import React, {useState, useCallback} from "react";
import classNames from "classnames/bind";
import {useAuth} from "../../../../../../hooks/useAuth";
import {useLanguages} from "../../../../../../hooks/useLanguages";
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
	const {t} = useLanguages();
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
			label: t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.requirement8Chars"
			),
			test: password.length >= 8,
		},
		{
			label: t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.requirementUpperCase"
			),
			test: /[A-Z]/.test(password),
		},
		{
			label: t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.requirementLowerCase"
			),
			test: /[a-z]/.test(password),
		},
		{
			label: t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.requirementNumbers"
			),
			test: /[0-9]/.test(password),
		},
		{
			label: t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.requirementSpecialChars"
			),
			test: /[^A-Za-z0-9]/.test(password),
		},
	];
	const dotColors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];
	const dotColor = dotColors[score];

	const renderPasswordRequirements = (rules) => (
		<div style={{minWidth: 180}}>
			<div style={{fontWeight: 600, marginBottom: 4}}>
				{t(
					"settingsPage.passwordAndSecurityTab.changePasswordPopup.passwordRequirements"
				)}
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
			newErrors.currentPassword = t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.currentPasswordRequired"
			);
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData.currentPassword, t]);

	const validatePhase2 = useCallback(() => {
		const newErrors = {};
		if (!formData.newPassword.trim()) {
			newErrors.newPassword = t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.newPasswordRequired"
			);
		} else if (formData.newPassword.length < 8) {
			newErrors.newPassword = t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.newPasswordMinLength"
			);
		}
		if (formData.newPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = t(
				"settingsPage.passwordAndSecurityTab.changePasswordPopup.confirmPasswordMismatch"
			);
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData.newPassword, formData.confirmPassword, t]);

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
					t(
						"settingsPage.passwordAndSecurityTab.changePasswordPopup.successPhase1"
					),
					"success"
				);
			} else {
				showNotification(
					response.message ||
						t(
							"settingsPage.passwordAndSecurityTab.changePasswordPopup.errorPhase1"
						),
					"error"
				);
			}
		} catch (error) {
			showNotification(
				t(
					"settingsPage.passwordAndSecurityTab.changePasswordPopup.errorPhase1General"
				),
				"error"
			);
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
					t(
						"settingsPage.passwordAndSecurityTab.changePasswordPopup.successPhase2"
					),
					"success"
				);
				handleClose();
			} else {
				showNotification(
					response?.message ||
						t(
							"settingsPage.passwordAndSecurityTab.changePasswordPopup.errorPhase2"
						),
					"error"
				);
			}
		} catch (error) {
			showNotification(
				t(
					"settingsPage.passwordAndSecurityTab.changePasswordPopup.errorPhase2"
				),
				"error"
			);
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
					<h2>
						{t(
							"settingsPage.passwordAndSecurityTab.changePasswordPopup.title"
						)}
					</h2>
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
								<label>
									{t(
										"settingsPage.passwordAndSecurityTab.changePasswordPopup.currentPassword"
									)}
								</label>
								<Input
									type='password'
									name='currentPassword'
									value={formData.currentPassword}
									onChange={handleInputChange}
									placeholder={t(
										"settingsPage.passwordAndSecurityTab.changePasswordPopup.currentPasswordPlaceholder"
									)}
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
									{t(
										"settingsPage.passwordAndSecurityTab.changePasswordPopup.cancel"
									)}
								</Button>
								<Button type='submit' disabled={loading}>
									{loading ? (
										<>
											<Loading size={14} />
										</>
									) : (
										t(
											"settingsPage.passwordAndSecurityTab.changePasswordPopup.confirm"
										)
									)}
								</Button>
							</div>
						</form>
					) : (
						<form onSubmit={handlePhase2Submit}>
							<div className={cx("form-group")}>
								<label>
									{t(
										"settingsPage.passwordAndSecurityTab.changePasswordPopup.newPassword"
									)}
								</label>
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
										placeholder={t(
											"settingsPage.passwordAndSecurityTab.changePasswordPopup.newPasswordPlaceholder"
										)}
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
								<label>
									{t(
										"settingsPage.passwordAndSecurityTab.changePasswordPopup.confirmPassword"
									)}
								</label>
								<Input
									type='password'
									name='confirmPassword'
									value={formData.confirmPassword}
									onChange={handleInputChange}
									placeholder={t(
										"settingsPage.passwordAndSecurityTab.changePasswordPopup.confirmPasswordPlaceholder"
									)}
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
									{t(
										"settingsPage.passwordAndSecurityTab.changePasswordPopup.back"
									)}
								</Button>
								<Button type='submit' disabled={loading}>
									{loading ? (
										<>
											<Loading size={14} />
										</>
									) : (
										t(
											"settingsPage.passwordAndSecurityTab.changePasswordPopup.submit"
										)
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
