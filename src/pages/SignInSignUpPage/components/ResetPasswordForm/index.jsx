import React, {useState} from "react";
import classNames from "classnames/bind";
import {Button, Loading, Tooltip} from "../../../../components/UI/";
import zxcvbn from "zxcvbn";
import styles from "./ResetPasswordForm.module.scss";

const cx = classNames.bind(styles);

function ResetPasswordForm({
	resetPasswordData,
	onDataChange,
	onSubmit,
	onBackToLogin,
	isLoading,
}) {
	const [passwordFocused, setPasswordFocused] = useState(false);
	const password = resetPasswordData.password || "";
	const strength = zxcvbn(password);
	const score = strength.score;
	const rules = [
		{
			label: "Ít nhất 6 ký tự",
			test: password.length >= 6,
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
						{rule.test ? "✔" : "✖"} {rule.label}
					</span>
				))}
			</div>
		</div>
	);

	return (
		<form onSubmit={onSubmit} className={cx("reset-password-form")}>
			<h1>Đặt lại mật khẩu</h1>
			<p>Nhập mật khẩu mới của bạn</p>
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
				<input
					type='password'
					placeholder='Mật khẩu mới'
					value={resetPasswordData.password}
					onFocus={() => setPasswordFocused(true)}
					onBlur={() => setPasswordFocused(false)}
					onChange={(e) =>
						onDataChange({
							...resetPasswordData,
							password: e.target.value,
						})
					}
					required
					className={cx("password-input")}
				/>
				<Tooltip
					content={renderPasswordRequirements(rules)}
					placement='right'
					disabled={!(passwordFocused || password.length > 0)}
				>
					<span
						className={cx("strength-dot", {
							active: passwordFocused,
							show: passwordFocused || password.length > 0,
						})}
						style={{
							background: dotColor,
						}}
					/>
				</Tooltip>
			</div>
			<input
				type='password'
				placeholder='Xác nhận mật khẩu mới'
				value={resetPasswordData.confirmPassword}
				onChange={(e) =>
					onDataChange({
						...resetPasswordData,
						confirmPassword: e.target.value,
					})
				}
				required
				className={cx("confirm-password-input")}
			/>
			<div className={cx("reset-password-buttons")}>
				<Button
					type='button'
					variant='secondary'
					className={cx("back-button")}
					onClick={onBackToLogin}
				>
					Quay lại
				</Button>
				<Button type='submit' disabled={isLoading || score < 3}>
					{isLoading ? <Loading size='10px' /> : "Đặt lại"}
				</Button>
			</div>
		</form>
	);
}

export default ResetPasswordForm;
