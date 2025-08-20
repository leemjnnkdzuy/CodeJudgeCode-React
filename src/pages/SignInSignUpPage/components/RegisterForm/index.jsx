import React, {useState} from "react";
import classNames from "classnames/bind";

import {Button, Loading, Tooltip} from "../../../../components/UI/";
import zxcvbn from "zxcvbn";
import "tippy.js/dist/tippy.css";
import SocialIcons from "../SocialIcons";

import styles from "./RegisterForm.module.scss";

const cx = classNames.bind(styles);

function RegisterForm({
	registerData,
	onDataChange,
	onSubmit,
	onSocialLogin,
	isLoading,
}) {
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
	const [passwordFocused, setPasswordFocused] = useState(false);
	const password = registerData.password || "";
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

	return (
		<form onSubmit={onSubmit} className={cx("register-form")}>
			<h1>Tạo tài khoản</h1>
			<SocialIcons onSocialLogin={onSocialLogin} />
			<span>hoặc sử dụng email để đăng ký</span>
			<div className={cx("name-row")}>
				<input
					type='text'
					placeholder='Họ'
					value={registerData.last_name || ""}
					onChange={(e) =>
						onDataChange({
							...registerData,
							last_name: e.target.value,
						})
					}
					required
				/>
				<input
					type='text'
					placeholder='Tên'
					value={registerData.first_name || ""}
					onChange={(e) =>
						onDataChange({
							...registerData,
							first_name: e.target.value,
						})
					}
					required
				/>
			</div>
			<input
				type='text'
				placeholder='Tên người dùng'
				className={cx("username-input")}
				value={registerData.username}
				onChange={(e) =>
					onDataChange({
						...registerData,
						username: e.target.value,
					})
				}
				required
			/>
			<input
				type='email'
				placeholder='Email'
				value={registerData.email}
				onChange={(e) =>
					onDataChange({
						...registerData,
						email: e.target.value,
					})
				}
				required
			/>
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
					placeholder='Mật khẩu'
					value={registerData.password}
					onFocus={() => setPasswordFocused(true)}
					onBlur={() => setPasswordFocused(false)}
					onChange={(e) =>
						onDataChange({
							...registerData,
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
				placeholder='Xác nhận mật khẩu'
				value={registerData.confirmPassword}
				onChange={(e) =>
					onDataChange({
						...registerData,
						confirmPassword: e.target.value,
					})
				}
				className={cx("confirm-password-input")}
				required
			/>
			<Button type='submit' disabled={isLoading || score < 3}>
				{isLoading ? <Loading size='10px' /> : "Đăng ký"}
			</Button>
		</form>
	);
}

export default RegisterForm;
