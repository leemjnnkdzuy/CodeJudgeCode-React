import React, {useState, useEffect, useCallback} from "react";
import {useParams, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProblemsSubmitPage.module.scss";
import {Loading} from "../../components/UI";
import {useGlobalNotificationPopup} from "../../hooks/useGlobalNotificationPopup";
import {useAuth} from "../../hooks/useAuth";
import {useEditorSettings} from "../../hooks/useEditorSettings";
import request from "../../utils/request";
import {SUPPORTED_LANGUAGES} from "../../config/supportedLanguagesConfig";
import {
	ProblemTabs,
	ProblemContent,
	EditorPanel,
	SubmitPopup,
	ProblemSubmitHeader,
	ConsolePanel,
} from "./components";

import handleRunCodeFunc from "../../handlers/handleRunCode";
import handleSubmitCodeFunc from "../../handlers/handleSubmitCode";
import handleClearConsoleFunc from "../../handlers/handleClearConsole";
import handleBackToProblemsFunc from "../../handlers/handleBackToProblems";
import handleEditorSettingsChangeFunc from "../../handlers/handleEditorSettingsChange";
import handleConfirmSubmitFunc from "../../handlers/handleConfirmSubmit";

const cx = classNames.bind(styles);

function ProblemsSubmitPage() {
	const {problemId} = useParams();
	const navigate = useNavigate();
	const {token, isAuthenticated} = useAuth();
	const {showError, showSuccess} = useGlobalNotificationPopup();
	const {editorSettings, updateEditorSettings} = useEditorSettings();

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

	const memoizedSetEditor = useCallback((editorInstance) => {
		setEditor(editorInstance);
	}, []);

	useEffect(() => {
		if (SUPPORTED_LANGUAGES[selectedLanguage]) {
			setCode(SUPPORTED_LANGUAGES[selectedLanguage].template);
		}
	}, [selectedLanguage]);

	useEffect(() => {
		const fetchProblemData = async () => {
			if (!problemId) {
				navigate("/not-found");
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
						await request.getAllSubmissionsByProblem(
							problemId,
							token
						);
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
				navigate("/not-found");
			} finally {
				setLoading(false);
			}
		};

		fetchProblemData();
	}, [problemId, token, isAuthenticated, navigate, showError]);

	const handleRunCode = useCallback(async () => {
		await handleRunCodeFunc(
			code,
			selectedLanguage,
			problemId,
			showError,
			setIsRunning,
			setConsoleOutput,
			request
		);
	}, [code, selectedLanguage, problemId, showError]);

	const handleSubmitCode = useCallback(() => {
		handleSubmitCodeFunc(
			isAuthenticated,
			showError,
			navigate,
			code,
			setShowSubmitModal
		);
	}, [isAuthenticated, showError, navigate, code]);

	const handleConfirmSubmit = useCallback(async () => {
		await handleConfirmSubmitFunc(
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
		);
	}, [problemId, selectedLanguage, code, token, showSuccess, showError]);

	const handleClearConsole = useCallback(() => {
		handleClearConsoleFunc(setConsoleOutput);
	}, []);

	const handleBackToProblems = useCallback(() => {
		handleBackToProblemsFunc(navigate);
	}, [navigate]);

	const handleEditorSettingsChange = useCallback(
		(newSettings) => {
			handleEditorSettingsChangeFunc(newSettings, updateEditorSettings);
		},
		[updateEditorSettings]
	);

	if (loading) {
		return (
			<div className={cx("loading-container")}>
				<Loading size='50px' />
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
						editorSettings={editorSettings}
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
