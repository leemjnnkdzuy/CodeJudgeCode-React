const handleClearConsole = (setConsoleOutput) => {
	setConsoleOutput([
		{
			type: "info",
			message:
				'Nhấn "Chạy thử" để kiểm tra code của bạn với test case mẫu.',
			icon: "bx-info-circle",
		},
	]);
};

export default handleClearConsole;