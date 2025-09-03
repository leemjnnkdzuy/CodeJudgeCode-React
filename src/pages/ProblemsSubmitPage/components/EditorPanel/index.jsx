import React, {useRef, useEffect, useCallback} from "react";
import classNames from "classnames/bind";
import styles from "./EditorPanel.module.scss";
import {Button, DropDown, Loading} from "../../../../components/UI";
import {SUPPORTED_LANGUAGES} from "../../../../config/supportedLanguagesConfig";
import Editor from "@monaco-editor/react";
import {useTheme} from "../../../../hooks/useTheme";

const cx = classNames.bind(styles);

function EditorPanel({
	selectedLanguage,
	onLanguageChange,
	code,
	onCodeChange,
	consoleOutput,
	isRunning,
	isSubmitting,
	onRunCode,
	onSubmitCode,
	onClearConsole,
	onBackToProblems,
	editor,
	setEditor,
	editorSettings,
}) {
	const editorRef = useRef(null);
	const {isDarkMode} = useTheme();

	const handleEditorDidMount = (editorInstance, monaco) => {
		editorRef.current = editorInstance;
		setEditor(editorInstance);
		console.log("Monaco Editor initialized successfully");
	};

	const handleEditorChange = (value) => {
		onCodeChange(value || "");
	};

	const getEditorTheme = useCallback(() => {
		if (!editorSettings?.theme) return "vs-light";

		if (editorSettings.theme === "sync") {
			const storedTheme = localStorage.getItem("theme");
			if (storedTheme === "dark") return "vs-dark";
			if (storedTheme === "light") return "vs-light";
			return isDarkMode ? "vs-dark" : "vs-light";
		}

		return editorSettings.theme;
	}, [editorSettings?.theme, isDarkMode]);

	useEffect(() => {
		if (editor && editorSettings) {
			const newOptions = {
				fontSize: editorSettings.fontSize || 14,
				lineNumbers: editorSettings.lineNumbers ? "on" : "off",
				minimap: {enabled: editorSettings.minimap || false},
				scrollBeyondLastLine: false,
				automaticLayout: true,
				wordWrap: editorSettings.wordWrap ? "on" : "off",
				renderWhitespace: "selection",
				fontFamily:
					editorSettings.fontFamily || "'Consolas', monospace",
				tabSize: editorSettings.tabSize || 4,
				insertSpaces: true,
				autoClosingBrackets: editorSettings.autoCloseBrackets
					? "always"
					: "never",
				formatOnPaste: editorSettings.formatOnPaste || false,
				quickSuggestions: false,
				parameterHints: {enabled: false},
				suggestOnTriggerCharacters: false,
				acceptSuggestionOnEnter: "off",
				tabCompletion: "off",
				wordBasedSuggestions: false,
				semanticHighlighting: {enabled: false},
				"semanticTokens.enabled": false,
			};
			editor.updateOptions(newOptions);
		}
	}, [editor, editorSettings]);

	function getMonacoLanguage(language) {
		switch (language) {
			case "python":
				return "python";
			case "javascript":
				return "javascript";
			case "c/c++":
				return "cpp";
			case "java":
				return "java";
			default:
				return "plaintext";
		}
	}

	function getLanguageDisplayName(language) {
		if (SUPPORTED_LANGUAGES[language]?.displayName) {
			return SUPPORTED_LANGUAGES[language].displayName;
		}

		switch (language) {
			case "python":
				return "Python";
			case "javascript":
				return "JavaScript";
			case "c/c++":
				return "C/C++";
			case "java":
				return "Java";
			default:
				return language;
		}
	}

	const languageItems = Object.keys(SUPPORTED_LANGUAGES).map((lang) => ({
		label: getLanguageDisplayName(lang),
		value: lang,
		onClick: () => onLanguageChange(lang),
	}));

	return (
		<div className={cx("editor-panel")}>
			<div className={cx("editor-header")}>
				<div className={cx("editor-tabs")}>
					<DropDown
						className={cx("language-select")}
						items={languageItems}
						onSelect={(item) => onLanguageChange(item.value)}
					>
						{(open) => (
							<span>
								{getLanguageDisplayName(selectedLanguage)}
								<i
									className={
										open
											? "bx bx-chevron-up"
											: "bx bx-chevron-down"
									}
									style={{marginLeft: 6}}
								></i>
							</span>
						)}
					</DropDown>
				</div>
				<div className={cx("editor-controls")}>
					<Button
						size='sm'
						icon={isRunning ? "" : <i className='bx bx-play'></i>}
						className={cx("run-code-btn")}
						onClick={onRunCode}
						disabled={isRunning || isSubmitting}
						variant='outline'
					>
						{isRunning ? <Loading size='10px' /> : "Chạy thử"}
					</Button>
					<Button
						size='sm'
						icon={
							isSubmitting ? "" : <i className='bx bx-send'></i>
						}
						className={cx("submit-code-btn")}
						onClick={onSubmitCode}
						disabled={isRunning || isSubmitting}
					>
						{isSubmitting ? <Loading size='10px' /> : "Nộp bài"}
					</Button>
				</div>
			</div>
			<div className={cx("editor-container")}>
				<Editor
					height='100%'
					language={getMonacoLanguage(selectedLanguage)}
					value={code}
					onChange={handleEditorChange}
					onMount={handleEditorDidMount}
					theme={getEditorTheme()}
					options={{
						fontSize: editorSettings?.fontSize || 14,
						lineNumbers: editorSettings?.lineNumbers ? "on" : "off",
						minimap: {enabled: editorSettings?.minimap || false},
						scrollBeyondLastLine: false,
						automaticLayout: true,
						wordWrap: editorSettings?.wordWrap ? "on" : "off",
						renderWhitespace: "selection",
						fontFamily:
							editorSettings?.fontFamily ||
							"'Consolas', monospace",
						tabSize: editorSettings?.tabSize || 4,
						insertSpaces: true,
						autoClosingBrackets: editorSettings?.autoCloseBrackets
							? "always"
							: "never",
						formatOnPaste: editorSettings?.formatOnPaste || false,
						quickSuggestions: false,
						parameterHints: {enabled: false},
						suggestOnTriggerCharacters: false,
						acceptSuggestionOnEnter: "off",
						tabCompletion: "off",
						wordBasedSuggestions: false,
						semanticHighlighting: {enabled: false},
						"semanticTokens.enabled": false,
					}}
					loading={
						<div className={cx("editor-placeholder")}>
							<div className={cx("placeholder-content")}>
								<i className='bx bx-code-alt'></i>
								<p>Loading code editor...</p>
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
}

export default EditorPanel;
