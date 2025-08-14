import React from "react";
import classNames from "classnames/bind";
import Loading from "../../../../components/UI/Loading";
import Button from "../../../../components/UI/Button";

import styles from "./ForgotPasswordForm.module.scss";

const cx = classNames.bind(styles);

function ForgotPasswordForm({
	forgotPasswordData,
	onDataChange,
	onSubmit,
	onBackToLogin,
	isLoading,
}) {
	return (
		<form onSubmit={onSubmit} className={cx("forgot-password-form")}>
			<h1>Quên mật khẩu</h1>
			<p>Nhập email để nhận liên kết đặt lại mật khẩu</p>
			<input
				type='email'
				placeholder='Email'
				value={forgotPasswordData.email}
				onChange={(e) =>
					onDataChange({
						...forgotPasswordData,
						email: e.target.value,
					})
				}
				required
			/>
			<div className={cx("forgot-password-buttons")}>
				<Button
					type='button'
					variant='outline'
					onClick={onBackToLogin}
				>
					Quay lại
				</Button>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? <Loading size="20px" /> : "Gửi Email"}
				</Button>
			</div>
		</form>
	);
}

export default ForgotPasswordForm;
