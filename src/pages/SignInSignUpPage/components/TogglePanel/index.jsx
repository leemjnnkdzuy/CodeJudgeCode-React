import React from "react";
import classNames from "classnames/bind";

import {Button} from "../../../../components/UI/";

import styles from "./TogglePanel.module.scss";

const cx = classNames.bind(styles);

function TogglePanel({onPhaseChange, isActive}) {
	return (
		<div className={cx("toggle-container", {active: isActive})}>
			<div className={cx("toggle", {active: isActive})}>
				<div
					className={cx("toggle-panel", "toggle-left", {
						active: isActive,
					})}
				>
					<h1>Chào mừng trở lại!</h1>
					<p>
						Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng
						thông tin cá nhân của bạn
					</p>
					<Button
						className={cx("hidden")}
						variant='outline'
						onClick={() => onPhaseChange("login")}
					>
						Đăng nhập
					</Button>
				</div>
				<div
					className={cx("toggle-panel", "toggle-right", {
						active: isActive,
					})}
				>
					<h1>Xin chào!</h1>
					<p>
						Nhập thông tin cá nhân của bạn để bắt đầu hành trình với
						chúng tôi
					</p>
					<Button
						className={cx("hidden")}
						variant='outline'
						onClick={() => onPhaseChange("register")}
					>
						Đăng ký
					</Button>
				</div>
			</div>
		</div>
	);
}

export default TogglePanel;
