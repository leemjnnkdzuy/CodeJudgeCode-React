const handleConfirmSubmit = async (
	setIsSubmitting,
	setShowSubmitModal,
	request,
	problemId,
	selectedLanguage,
	code,
	token,
	showSuccess,
	showError,
	setUserSubmissions,
	setSolution,
	setActiveTab,
	setConsoleOutput
) => {
	setIsSubmitting(true);
	setShowSubmitModal(false);

	try {
		const result = await request.submitCode(
			{
				problemId: problemId,
				language: selectedLanguage,
				code: code,
			},
			token
		);

		if (result.success && result.data) {
			const {status, submissionId, totalTests, testCaseStatus, message} =
				result.data;

			if (status === "accepted") {
				showSuccess(
					"Nộp bài thành công! Bài làm của bạn đã được chấp nhận."
				);
			} else {
				const passedTests = testCaseStatus.filter(
					(test) => test.status === "accepted"
				).length;
				showSuccess(
					`Nộp bài thành công! Kết quả: ${passedTests}/${totalTests} test case đã pass.`
				);

				const submissionOutput = [
					{
						type: status === "accepted" ? "success" : "warning",
						message: `Submission ID: ${submissionId} - Status: ${status.toUpperCase()}`,
						icon:
							status === "accepted"
								? "bx-check-circle"
								: "bx-info-circle",
					},
					{
						type: "info",
						message: `Test Cases: ${passedTests}/${totalTests} passed`,
						icon: "bx-list-check",
					},
				];

				if (message) {
					submissionOutput.push({
						type: "info",
						message: message,
						icon: "bx-message",
					});
				}

				setConsoleOutput(submissionOutput);
			}
		} else {
			showSuccess("Nộp bài thành công!");
		}

		const updatedSubmissions = await request.getUserSubmissions(
			problemId,
			token
		);
		const userSubs =
			updatedSubmissions?.data?.submissions ||
			updatedSubmissions?.submissions ||
			[];
		setUserSubmissions(userSubs);

		try {
			const updatedSolution = await request.getProblemSolution(
				problemId,
				token
			);
			setSolution(updatedSolution);
		} catch (error) {
			console.warn("Could not refresh solution:", error.message);
		}

		setActiveTab("submissions");
	} catch (error) {
		showError(error.message || "Nộp bài thất bại");
	} finally {
		setIsSubmitting(false);
	}
};

export default handleConfirmSubmit;
