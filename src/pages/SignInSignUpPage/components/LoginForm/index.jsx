import React from "react";
import classNames from "classnames/bind";

import Button from "../../../../components/UI/Button";
import SocialIcons from "../SocialIcons";

import styles from "./LoginForm.module.scss";

const cx = classNames.bind(styles);

function LoginForm({
	loginData,
	onDataChange,
	onSubmit,
	onForgotPassword,
	onSocialLogin,
	isLoading,
}) {
	return (
		<form onSubmit={onSubmit} className={cx("login-form")}>
			<h1>Đăng nhập</h1>
			<SocialIcons onSocialLogin={onSocialLogin} />
			<span>hoặc sử dụng mật khẩu của bạn</span>
			<input
				type='text'
				placeholder='Tên đăng nhập'
				value={loginData.username}
				onChange={(e) =>
					onDataChange({
						...loginData,
						username: e.target.value,
					})
				}
				required
			/>
			<input
				type='password'
				placeholder='Mật khẩu'
				value={loginData.password}
				onChange={(e) =>
					onDataChange({
						...loginData,
						password: e.target.value,
					})
				}
				required
			/>
			<button
				type='button'
				className={cx("forget-password")}
				onClick={onForgotPassword}
			>
				Quên mật khẩu?
			</button>
			<Button type='submit' disabled={isLoading}>
				{isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
			</Button>
		</form>
	);
}

export default LoginForm;
