import React from "react";
import classNames from "classnames/bind";
import styles from "./ConsolePanel.module.scss";
import {Button} from "../../../../components/UI";

const cx = classNames.bind(styles);

function ConsolePanel({consoleOutput, onClearConsole}) {
	const renderConsoleMessage = (message, index) => {
		if (typeof message === "string") {
			return (
				<div key={index} className={cx("console-message", "info")}>
					<i className='bx bx-info-circle'></i>
					{message}
				</div>
			);
		}
		return (
			<div key={index} className={cx("console-message", message.type)}>
				<i className={message.icon}></i>
				{message.message}
			</div>
		);
	};
	return (
		<div className={cx("console-panel")}>
			<div className={cx("console-header")}>
				<span className={cx("console-title")}>Console</span>
				<Button
					className={cx("clear-console-btn")}
					onClick={onClearConsole}
					variant='outline'
					size='sm'
				>
					<i className='bx bx-trash'></i>
					Xóa
				</Button>
			</div>
			<div className={cx("console-content")}>
				{consoleOutput.length > 0 ? (
					consoleOutput.map((message, index) =>
						renderConsoleMessage(message, index)
					)
				) : (
					<div className={cx("console-message", "info")}>
						<i className='bx bx-info-circle'></i>
						Nhấn "Chạy thử" để kiểm tra code của bạn với test case
						mẫu.
					</div>
				)}
			</div>
		</div>
	);
}

export default ConsolePanel;
