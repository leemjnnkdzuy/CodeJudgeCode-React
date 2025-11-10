const handleRunCode = async (
	code,
	selectedLanguage,
	problemId,
	showError,
	setIsRunning,
	setConsoleOutput,
	request
) => {
	if (!code.trim()) {
		showError("Vui lòng nhập code trước khi chạy");
		return;
	}

	setIsRunning(true);
	setConsoleOutput([]);

	try {
		const result = await request.runCode({
			language: selectedLanguage,
			code: code,
			problemId: problemId,
		});

		if (result.success && result.data) {
			const {status, results, totalTests, passedTests} = result.data;

			const outputMessages = [
				{
					type: status === "passed" ? "success" : "info",
					message: `Đã chạy ${totalTests} test case - Passed: ${passedTests}/${totalTests}`,
					icon:
						status === "passed"
							? "bx-check-circle"
							: "bx-info-circle",
				},
			];

			results.forEach((testResult, index) => {
				const testMessage = {
					type: testResult.passed ? "success" : "error",
					message: `Test ${testResult.testCase}: ${
						testResult.passed ? "PASSED" : "FAILED"
					}`,
					icon: testResult.passed ? "bx-check" : "bx-x",
					details: {
						input: testResult.input,
						expected: testResult.expectedOutput,
						actual: testResult.actualOutput,
						error: testResult.error,
					},
				};
				outputMessages.push(testMessage);
			});

			setConsoleOutput(outputMessages);
		} else {
			setConsoleOutput([
				{
					type: "success",
					message: "Code đã chạy thành công!",
					icon: "bx-check-circle",
				},
				...(result.output || []),
			]);
		}
	} catch (error) {
		setConsoleOutput([
			{
				type: "error",
				message: error.message || "Lỗi khi chạy code",
				icon: "bx-x-circle",
			},
		]);
	} finally {
		setIsRunning(false);
	}
};

export default handleRunCode;