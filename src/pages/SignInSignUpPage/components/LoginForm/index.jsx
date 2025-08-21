import classNames from "classnames/bind";
import {useState} from "react";
import "boxicons/css/boxicons.min.css";

import {Button, Loading} from "../../../../components/UI/";
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
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => setShowPassword((prev) => !prev);

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
			<div className={cx("password-input-wrapper")}>
				<input
					type={showPassword ? "text" : "password"}
					placeholder='Mật khẩu'
					value={loginData.password}
					onChange={(e) =>
						onDataChange({
							...loginData,
							password: e.target.value,
						})
					}
					required
					className={cx("password-input")}
				/>
				{loginData.password && (
					<span
						onClick={toggleShowPassword}
						className={cx("toggle-password-icon")}
						tabIndex={0}
						aria-label={
							showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
						}
					>
						<i
							className={
								showPassword ? "bx bx-hide" : "bx bx-show"
							}
						></i>
					</span>
				)}
			</div>
			<button
				type='button'
				className={cx("forget-password")}
				onClick={onForgotPassword}
			>
				Quên mật khẩu?
			</button>
			<Button type='submit' disabled={isLoading}>
				{isLoading ? <Loading size='10px' /> : "Đăng nhập"}
			</Button>
		</form>
	);
}

export default LoginForm;
