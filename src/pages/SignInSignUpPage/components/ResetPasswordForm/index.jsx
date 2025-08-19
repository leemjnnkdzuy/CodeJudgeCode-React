import React from "react";
import classNames from "classnames/bind";

import {Button} from "../../../../components/UI/";

import styles from "./ResetPasswordForm.module.scss";

const cx = classNames.bind(styles);

function ResetPasswordForm({
	resetPasswordData,
	onDataChange,
	onSubmit,
	onBackToLogin,
	isLoading,
}) {
	return (
		<form onSubmit={onSubmit} className={cx("reset-password-form")}>
			<h1>Đặt lại mật khẩu</h1>
			<p>Nhập mật khẩu mới của bạn</p>
			<input
				type='password'
				placeholder='Mật khẩu mới'
				value={resetPasswordData.password}
				onChange={(e) =>
					onDataChange({
						...resetPasswordData,
						password: e.target.value,
					})
				}
				required
			/>
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
			/>
			<div className={cx("reset-password-buttons")}>
				<Button
					type='button'
					variant='secondary'
					onClick={onBackToLogin}
				>
					Quay lại
				</Button>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? "Đang đặt lại..." : "Đặt lại"}
				</Button>
			</div>
		</form>
	);
}

export default ResetPasswordForm;
