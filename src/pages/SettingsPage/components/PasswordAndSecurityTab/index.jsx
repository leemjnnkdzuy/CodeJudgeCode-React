import React, {useState, useEffect, useCallback} from "react";
import classNames from "classnames/bind";
import {useAuth} from "../../../../hooks/useAuth";
import {useGlobalNotificationPopup} from "../../../../hooks/useGlobalNotificationPopup";
import request from "../../../../utils/request";
import style from "./PasswordAndSecurityTab.module.scss";

const cx = classNames.bind(style);

const PasswordAndSecurityTab = ({
	setLoading: propSetLoading,
	setHasChanges: propSetHasChanges,
	updateSubmitHandler: propUpdateSubmitHandler,
	resetChanges: propResetChanges,
}) => {
	const {token} = useAuth();
	const {showNotification} = useGlobalNotificationPopup();
	const {setLoading, setHasChanges, updateSubmitHandler, resetChanges} =
		propSetLoading
			? {
					setLoading: propSetLoading,
					setHasChanges: propSetHasChanges,
					updateSubmitHandler: propUpdateSubmitHandler,
					resetChanges: propResetChanges,
			  }
			: {
					setLoading: () => {},
					setHasChanges: () => {},
					updateSubmitHandler: () => {},
					resetChanges: () => {},
			  };

	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
		if (errors[name]) {
			setErrors((prev) => ({...prev, [name]: ""}));
		}
		const newFormData = {...formData, [name]: value};
		const hasChanges =
			newFormData.currentPassword ||
			newFormData.newPassword ||
			newFormData.confirmPassword;
		setHasChanges(hasChanges);
	};

	const validateForm = useCallback(() => {
		const newErrors = {};
		if (!formData.currentPassword)
			newErrors.currentPassword = "Current password is required";
		if (!formData.newPassword)
			newErrors.newPassword = "New password is required";
		else if (formData.newPassword.length < 8)
			newErrors.newPassword = "Password must be at least 8 characters";
		if (formData.newPassword !== formData.confirmPassword)
			newErrors.confirmPassword = "Passwords do not match";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [
		formData.currentPassword,
		formData.newPassword,
		formData.confirmPassword,
	]);

	useEffect(() => {
		const submitHandler = async (e) => {
			if (e) e.preventDefault();
			if (!validateForm()) return;

			setLoading(true);
			try {
				const response = await request.changePassword(
					{
						currentPassword: formData.currentPassword,
						newPassword: formData.newPassword,
					},
					token
				);
				if (response.error) {
					showNotification("Failed to change password", "error");
				} else {
					showNotification(
						"Password changed successfully",
						"success"
					);
					setFormData({
						currentPassword: "",
						newPassword: "",
						confirmPassword: "",
					});
					resetChanges();
				}
			} catch (error) {
				showNotification("An error occurred", "error");
			} finally {
				setLoading(false);
			}
		};

		updateSubmitHandler(submitHandler);
	}, [
		formData,
		token,
		showNotification,
		setLoading,
		validateForm,
		updateSubmitHandler,
		resetChanges,
	]);

	// Update hasChanges when data changes
	useEffect(() => {
		const hasChanges =
			formData.currentPassword ||
			formData.newPassword ||
			formData.confirmPassword;
		setHasChanges(hasChanges);
	}, [formData, setHasChanges]);

	return (
		<div className={cx("password-security-tab")}>
			<h2>Password and Security</h2>
			<form className={cx("form")}>
				<div className={cx("form-group")}>
					<label htmlFor='currentPassword'>Current Password</label>
					<input
						type='password'
						id='currentPassword'
						name='currentPassword'
						value={formData.currentPassword}
						onChange={handleInputChange}
						className={cx("input", {error: errors.currentPassword})}
					/>
					{errors.currentPassword && (
						<span className={cx("error-text")}>
							{errors.currentPassword}
						</span>
					)}
				</div>
				<div className={cx("form-group")}>
					<label htmlFor='newPassword'>New Password</label>
					<input
						type='password'
						id='newPassword'
						name='newPassword'
						value={formData.newPassword}
						onChange={handleInputChange}
						className={cx("input", {error: errors.newPassword})}
					/>
					{errors.newPassword && (
						<span className={cx("error-text")}>
							{errors.newPassword}
						</span>
					)}
				</div>
				<div className={cx("form-group")}>
					<label htmlFor='confirmPassword'>
						Confirm New Password
					</label>
					<input
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleInputChange}
						className={cx("input", {error: errors.confirmPassword})}
					/>
					{errors.confirmPassword && (
						<span className={cx("error-text")}>
							{errors.confirmPassword}
						</span>
					)}
				</div>
			</form>
		</div>
	);
};

export default PasswordAndSecurityTab;
