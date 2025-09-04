const handleSubmitCode = (
	isAuthenticated,
	showError,
	navigate,
	code,
	setShowSubmitModal
) => {
	if (!isAuthenticated) {
		showError("Vui lòng đăng nhập để nộp bài");
		navigate("/login");
		return;
	}

	if (!code.trim()) {
		showError("Vui lòng nhập code trước khi nộp bài");
		return;
	}

	setShowSubmitModal(true);
};

export default handleSubmitCode;