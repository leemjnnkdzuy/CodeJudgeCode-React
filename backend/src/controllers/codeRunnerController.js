const os = require("os");
const AppError = require("../utils/errors");
const asyncHandle = require("express-async-handler");

const {Problem} = require("../models/problemModel");
const {Submission} = require("../models/submissionModel");
const {User} = require("../models/userModel");

const {runCppCode} = require("../codeRunner/cppRunner");
const {runPythonCode} = require("../codeRunner/pythonRunner");
const {runJavaCode} = require("../codeRunner/javaRunner");
const {runJavaScriptCode} = require("../codeRunner/javascriptRunner");

const getCodeRunner = (language) => {
	switch (language.toLowerCase()) {
		case "c/c++":
		case "cpp":
			return runCppCode;
		case "python":
			return runPythonCode;
		case "java":
			return runJavaCode;
		case "javascript":
			return runJavaScriptCode;
		default:
			throw new Error(`Unsupported language: ${language}`);
	}
};

const compareOutputs = (expected, actual) => {
	const normalizeOutput = (output) => {
		return output.toString().trim().replace(/\r\n/g, "\n");
	};

	return normalizeOutput(expected) === normalizeOutput(actual);
};

const testRun = asyncHandle(async (req, res) => {
	const {problemId, code, language} = req.body;

	if (!problemId || !code || !language) {
		throw new AppError(
			"Missing required fields: problemId, code, language",
			400
		);
	}

	let problem;
	if (problemId.match(/^[0-9a-fA-F]{24}$/)) {
		problem = await Problem.findById(problemId).populate("testCases");
	} else {
		problem = await Problem.findOne({titleSlug: problemId}).populate(
			"testCases"
		);
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	if (!problem.testCases || !problem.testCases.testCases) {
		throw new AppError("No test cases available for this problem", 400);
	}

	const testCases = problem.testCases.testCases.slice(0, 3);
	const runner = getCodeRunner(language);
	const tempDir = os.tmpdir();

	const results = [];

	for (let i = 0; i < testCases.length; i++) {
		const testCase = testCases[i];
		try {
			const output = await runner(code, testCase.input, tempDir);
			const passed = compareOutputs(testCase.expectedOutput, output);

			results.push({
				testCase: i + 1,
				input: testCase.input,
				expectedOutput: testCase.expectedOutput,
				actualOutput: output,
				passed,
				error: null,
			});
		} catch (error) {
			results.push({
				testCase: i + 1,
				input: testCase.input,
				expectedOutput: testCase.expectedOutput,
				actualOutput: null,
				passed: false,
				error: error.message,
			});
		}
	}

	const allPassed = results.every((result) => result.passed);

	res.json({
		success: true,
		data: {
			status: allPassed ? "passed" : "failed",
			results,
			totalTests: results.length,
			passedTests: results.filter((r) => r.passed).length,
		},
	});
});

const submitSolution = asyncHandle(async (req, res) => {
	const {problemId, code, language} = req.body;
	const userId = req.user?.id || req.user?._id;

	if (!userId) {
		throw new AppError("Authentication required", 401);
	}

	if (!problemId || !code || !language) {
		throw new AppError(
			"Missing required fields: problemId, code, language",
			400
		);
	}

	let problem;
	if (problemId.match(/^[0-9a-fA-F]{24}$/)) {
		problem = await Problem.findById(problemId).populate("testCases");
	} else {
		problem = await Problem.findOne({titleSlug: problemId}).populate(
			"testCases"
		);
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	if (!problem.testCases || !problem.testCases.testCases) {
		throw new AppError("No test cases available for this problem", 400);
	}

	const submission = new Submission({
		problemId: problem._id,
		userId,
		code,
		language,
		status: "running",
	});
	await submission.save();

	try {
		const testCases = problem.testCases.testCases;
		const runner = getCodeRunner(language);
		const tempDir = os.tmpdir();

		let allPassed = true;
		const testCaseStatus = [];

		for (let i = 0; i < testCases.length; i++) {
			const testCase = testCases[i];
			let status = "accepted";

			try {
				const output = await runner(code, testCase.input, tempDir);
				const passed = compareOutputs(testCase.expectedOutput, output);

				if (!passed) {
					allPassed = false;
					status = "wrong_answer";
				}
			} catch (error) {
				allPassed = false;
				status = "time_limit_exceeded";
			}

			testCaseStatus.push({
				testId: i + 1,
				status: status,
			});

			if (status !== "accepted") {
				for (let j = i + 1; j < testCases.length; j++) {
					testCaseStatus.push({
						testId: j + 1,
						status: "not_run",
					});
				}
				break;
			}
		}

		submission.status = allPassed ? "accepted" : "wrong_answer";
		await submission.save();

		const user = await User.findById(userId);
		if (user) {
			if (!user.submissions.some((id) => id.equals(submission._id))) {
				user.submissions.push(submission._id);
			}

			if (allPassed) {
				const isFirstTimeSolved = !user.problems_solved.some((id) =>
					id.equals(problem._id)
				);

				if (isFirstTimeSolved) {
					user.problems_solved.push(problem._id);

					const solvedProblems = await Problem.find({
						_id: {$in: user.problems_solved},
					});

					let rating = 0;
					for (const p of solvedProblems) {
						if (p.difficulty === "Easy") rating += 5;
						else if (p.difficulty === "Medium") rating += 10;
						else if (p.difficulty === "Hard") rating += 15;
					}
					user.rating = rating;
				}
			}

			await user.save();
		}

		res.json({
			success: true,
			data: {
				submissionId: submission._id,
				status: submission.status,
				totalTests: testCases.length,
				testCaseStatus: testCaseStatus,
				message: allPassed
					? "Congratulations! All test cases passed."
					: `Solution failed. Check test case results for details.`,
			},
		});
	} catch (error) {
		submission.status = "time_limit_exceeded";
		await submission.save();

		const user = await User.findById(userId);
		if (user && !user.submissions.some((id) => id.equals(submission._id))) {
			user.submissions.push(submission._id);
			await user.save();
		}

		const testCaseStatus = [];
		const testCases = problem.testCases.testCases;
		for (let i = 0; i < testCases.length; i++) {
			testCaseStatus.push({
				testId: i + 1,
				status: "time_limit_exceeded",
			});
		}

		res.json({
			success: true,
			data: {
				submissionId: submission._id,
				status: "time_limit_exceeded",
				totalTests: testCases.length,
				testCaseStatus: testCaseStatus,
				message: "Time limit exceeded or runtime error occurred.",
			},
		});
	}
});

module.exports = {
	testRun,
	submitSolution,
};
