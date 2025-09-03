import React, {useState, useEffect, useCallback} from "react";
import {useParams, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProblemsSubmitPage.module.scss";
import {Button, Loading} from "../../components/UI";
import {useGlobalNotificationPopup} from "../../hooks/useGlobalNotificationPopup";
import {useAuth} from "../../hooks/useAuth";
import {useTheme} from "../../hooks/useTheme";
import request from "../../utils/request";
import {SUPPORTED_LANGUAGES} from "../../config/supportedLanguagesConfig";
import {
	ProblemTabs,
	ProblemContent,
	EditorPanel,
	SubmitPopup,
	ProblemSubmitHeader,
} from "./components";
import ConsolePanel from "./components/ConsolePanel";

const cx = classNames.bind(styles);

function ProblemsSubmitPage() {
	const {problemId} = useParams();
	const navigate = useNavigate();
	const {token, isAuthenticated} = useAuth();
	const {isDarkMode} = useTheme();
	const {showError, showSuccess} = useGlobalNotificationPopup();

	const [problem, setProblem] = useState(null);
	const [userSubmissions, setUserSubmissions] = useState([]);
	const [allSubmissions, setAllSubmissions] = useState([]);
	const [solution, setSolution] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("description");
	const [selectedLanguage, setSelectedLanguage] = useState("python");
	const [code, setCode] = useState("");
	const [consoleOutput, setConsoleOutput] = useState([]);
	const [isRunning, setIsRunning] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSubmitModal, setShowSubmitModal] = useState(false);
	const [editor, setEditor] = useState(null);
	const [submissionsView, setSubmissionsView] = useState("my-submissions");
	const [editorSettings, setEditorSettings] = useState({
		fontFamily: "'Consolas', monospace",
		fontSize: 14,
		theme: "vs-light",
		tabSize: 4,
		wordWrap: true,
		lineNumbers: true,
		minimap: false,
		autoCloseBrackets: true,
		formatOnPaste: true,
	});

	const memoizedSetEditor = useCallback((editorInstance) => {
		setEditor(editorInstance);
	}, []);

	useEffect(() => {
		try {
			const savedSettings = localStorage.getItem("editorSettings");
			if (savedSettings) {
				setEditorSettings(JSON.parse(savedSettings));
			}
		} catch (error) {
			console.warn("Could not load editor settings:", error);
		}
	}, []);

	useEffect(() => {
		setEditorSettings((prevSettings) => {
			if (prevSettings.theme === "sync") {
				const appTheme = isDarkMode ? "vs-dark" : "vs-light";
				const updatedSettings = {
					...prevSettings,
					theme: "sync",
					_appTheme: appTheme,
				};
				localStorage.setItem(
					"editorSettings",
					JSON.stringify(updatedSettings)
				);
				return updatedSettings;
			}
			return prevSettings;
		});
	}, [isDarkMode]);

	useEffect(() => {
		if (SUPPORTED_LANGUAGES[selectedLanguage]) {
			setCode(SUPPORTED_LANGUAGES[selectedLanguage].template);
		}
	}, [selectedLanguage]);

	useEffect(() => {
		const fetchProblemData = async () => {
			if (!problemId) {
				navigate("/*");
				return;
			}

			setLoading(true);
			try {
				const problemData = await request.getProblemDetail(
					problemId,
					token
				);
				const actualProblemData = problemData.data || problemData;
				setProblem(actualProblemData);

				if (isAuthenticated && token) {
					const submissionsData = await request.getUserSubmissions(
						problemId,
						token
					);
					const userSubs =
						submissionsData?.data?.submissions ||
						submissionsData?.submissions ||
						[];
					setUserSubmissions(userSubs);

					try {
						const solutionData = await request.getProblemSolution(
							problemId,
							token
						);
						setSolution(solutionData);
					} catch (error) {
						console.warn(
							"Could not fetch solution:",
							error.message
						);
						setSolution(null);
					}
				}

				try {
					const publicSubmissions =
						await request.getPublicSubmissions(problemId);
					const allSubs =
						publicSubmissions?.data?.submissions ||
						publicSubmissions?.submissions ||
						[];
					setAllSubmissions(allSubs);
				} catch (error) {
					console.warn(
						"Public submissions endpoint not available:",
						error.message
					);
					setAllSubmissions([]);
				}
			} catch (error) {
				navigate("/*");
			} finally {
				setLoading(false);
			}
		};

		fetchProblemData();
	}, [problemId, token, isAuthenticated, navigate, showError]);

	const handleRunCode = async () => {
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

	const handleSubmitCode = () => {
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

	const handleConfirmSubmit = async () => {
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

			// Handle new API response format
			if (result.success && result.data) {
				const {
					status,
					submissionId,
					totalTests,
					testCaseStatus,
					message,
				} = result.data;

				// Show appropriate success message based on status
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

					// Show detailed feedback in console
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

	const handleClearConsole = () => {
		setConsoleOutput([
			{
				type: "info",
				message:
					'Nhấn "Chạy thử" để kiểm tra code của bạn với test case mẫu.',
				icon: "bx-info-circle",
			},
		]);
	};

	const handleBackToProblems = () => {
		navigate("/problems");
	};

	const handleEditorSettingsChange = (newSettings) => {
		setEditorSettings(newSettings);
		localStorage.setItem("editorSettings", JSON.stringify(newSettings));
	};

	if (loading) {
		return (
			<div className={cx("loading-container")}>
				<Loading size='30px' />
				<p>Đang tải dữ liệu bài tập...</p>
			</div>
		);
	}

	if (!problem) {
		return (
			<div className={cx("error-container")}>
				<i className='bx bx-error-circle'></i>
				<h3>Không tìm thấy bài tập</h3>
				<Button onClick={handleBackToProblems}>
					Quay lại danh sách bài tập
				</Button>
			</div>
		);
	}

	return (
		<div className={cx("problem-workspace")} data-problem-id={problemId}>
			<ProblemSubmitHeader
				title={problem?.title || "Bài tập"}
				onBack={handleBackToProblems}
				editorSettings={editorSettings}
				onEditorSettingsChange={handleEditorSettingsChange}
			/>
			<div className={cx("problem-main")}>
				<div className={cx("problem-sidebar")}>
					<ProblemTabs
						activeTab={activeTab}
						onTabChange={setActiveTab}
						problem={problem}
					/>

					<ProblemContent
						problem={problem}
						activeTab={activeTab}
						userSubmissions={userSubmissions}
						allSubmissions={allSubmissions}
						submissionsView={submissionsView}
						onSubmissionsViewChange={setSubmissionsView}
						solution={solution}
					/>
				</div>

				<div className={cx("editor-container")}>
					<EditorPanel
						selectedLanguage={selectedLanguage}
						onLanguageChange={setSelectedLanguage}
						code={code}
						onCodeChange={setCode}
						consoleOutput={consoleOutput}
						isRunning={isRunning}
						isSubmitting={isSubmitting}
						onRunCode={handleRunCode}
						onSubmitCode={handleSubmitCode}
						onClearConsole={handleClearConsole}
						onBackToProblems={handleBackToProblems}
						editor={editor}
						setEditor={memoizedSetEditor}
						editorSettings={editorSettings}
					/>

					<ConsolePanel
						consoleOutput={consoleOutput}
						onClearConsole={handleClearConsole}
					/>
				</div>

				<SubmitPopup
					show={showSubmitModal}
					problem={problem}
					selectedLanguage={selectedLanguage}
					codeLineCount={code.split("\n").length}
					onConfirm={handleConfirmSubmit}
					onCancel={() => setShowSubmitModal(false)}
					isSubmitting={isSubmitting}
				/>
			</div>
		</div>
	);
}

export default ProblemsSubmitPage;
