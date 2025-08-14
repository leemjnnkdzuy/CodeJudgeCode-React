import React from "react";
import classNames from "classnames/bind";

import Button from "../../../../components/UI/Button";
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
	return (
		<form onSubmit={onSubmit} className={cx("register-form")}>
			<h1>Tạo tài khoản</h1>
			<SocialIcons onSocialLogin={onSocialLogin} />
			<span>hoặc sử dụng email để đăng ký</span>
			<input
				type='text'
				placeholder='Tên'
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
			<input
				type='password'
				placeholder='Mật khẩu'
				value={registerData.password}
				onChange={(e) =>
					onDataChange({
						...registerData,
						password: e.target.value,
					})
				}
				required
			/>
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
				required
			/>
			<Button type='submit' disabled={isLoading}>
				{isLoading ? "Đang đăng ký..." : "Đăng ký"}
			</Button>
		</form>
	);
}

export default RegisterForm;
