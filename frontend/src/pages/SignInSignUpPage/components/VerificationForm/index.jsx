import React from "react";
import classNames from "classnames/bind";

import {Button, Loading, Input} from "../../../../components/UI/";

import styles from "./VerificationForm.module.scss";

const cx = classNames.bind(styles);

function VerificationForm({
	verificationData,
	onDataChange,
	onSubmit,
	onBackToLogin,
	isLoading,
}) {
	return (
		<form onSubmit={onSubmit} className={cx("verification-form")}>
			<h1>Xác minh tài khoản</h1>
			<p>Nhập mã xác minh đã được gửi đến email của bạn</p>
			<Input
				type='text'
				placeholder='Mã xác minh'
				value={verificationData.code}
				onChange={(e) =>
					onDataChange({
						...verificationData,
						code: e.target.value,
					})
				}
				required
			/>
			<div className={cx("verification-buttons")}>
				<Button type='button' variant='variant' onClick={onBackToLogin}>
					Quay lại
				</Button>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? <Loading size='10px' /> : "Xác minh"}
				</Button>
			</div>
		</form>
	);
}

export default VerificationForm;
