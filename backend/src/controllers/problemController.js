const {Submission} = require("../models/submissionModel");
const {Problem} = require("../models/problemModel");
const {TestCases} = require("../models/testCasesModel");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const AppError = require("../utils/errors");
const asyncHandle = require("express-async-handler");
const path = require("path");

const {getUserProblemStatuses} = require("../Helpers/userProblemStatusHelper");

const {runCppCode} = require("../codeRunner/cppRunner");
const {runPythonCode} = require("../codeRunner/pythonRunner");
const {runJavaCode} = require("../codeRunner/javaRunner");
const {runJavaScriptCode} = require("../codeRunner/javascriptRunner");

const getProblemsList = asyncHandle(async (req, res) => {
	const begin = parseInt(req.body.begin) || 1;
	const end = parseInt(req.body.end) || begin + 9;
	const lang = req.body.language;
	const allProblems = await Problem.find({})
		.sort({questionId: 1})
		.select(
			`_id questionId titleSlug difficulty topicTags details.${lang}.title`
		);
	const total = allProblems.length;
	const problems = allProblems.slice(begin - 1, end);
	const problemIds = problems.map((p) => p._id);
	const solvedCounts = await Submission.aggregate([
		{$match: {problemId: {$in: problemIds}, status: "accepted"}},
		{$group: {_id: {problemId: "$problemId", userId: "$userId"}}},
		{$group: {_id: "$_id.problemId", count: {$sum: 1}}},
	]);
	const solvedCountMap = {};
	for (const row of solvedCounts) {
		solvedCountMap[row._id.toString()] = row.count;
	}
	let userStatusMap = {};
	let userId = req.user?._id;
	if (userId) {
		userStatusMap = await getUserProblemStatuses(userId, problemIds);
	}
	const result = problems.map((problem) => {
		const obj = {
			id: parseInt(problem.questionId),
			slug: problem.titleSlug,
			title: problem.details[lang]?.title || problem.details.en.title,
			problem_types: problem.topicTags,
			difficulty: (problem.difficulty || "").toLowerCase(),
			solved_count: solvedCountMap[problem._id.toString()] || 0,
			user_status: "none",
		};
		if (userId && userStatusMap[problem._id.toString()]) {
			obj.user_status = userStatusMap[problem._id.toString()];
		}
		return obj;
	});
	res.json({
		success: true,
		problems: result,
		isContinue: end < total,
	});
});

const getProblemDetail = asyncHandle(async (req, res) => {
	const {identifier} = req.params;
	const lang = req.query.language;

	let problem;
	if (isNaN(identifier)) {
		problem = await Problem.findOne({titleSlug: identifier}).populate(
			"testCases"
		);
	} else {
		problem = await Problem.findOne({_id: identifier}).populate(
			"testCases"
		);
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	const sampleTestCases = problem.testCases?.testCases?.slice(0, 3) || [];

	res.json({
		success: true,
		data: {
			questionId: problem.questionId,
			titleSlug: problem.titleSlug,
			difficulty: problem.difficulty,
			topicTags: problem.topicTags,
			title: problem.details[lang]?.title || problem.details.en.title,
			content:
				problem.details[lang]?.content || problem.details.en.content,
			hints: problem.details[lang]?.hints || problem.details.en.hints,
			similarQuestions:
				problem.details[lang]?.similarQuestionList ||
				problem.details.en.similarQuestionList,
			timeLimit: problem.timeLimit,
			memoryLimit: problem.memoryLimit,
			sampleTestCases: sampleTestCases,
		},
	});
});

const generateExpectedOutputs = asyncHandle(async (req, res) => {
	const {originalSource, testCases} = req.body;

	if (
		!originalSource ||
		!originalSource.source ||
		!originalSource.language ||
		!testCases ||
		!Array.isArray(testCases)
	) {
		throw new AppError(
			"Missing required fields: originalSource (source, language) and testCases array",
			400
		);
	}

	const results = [];
	const tempDir = path.join(__dirname, "../../temp");

	try {
		await fs.mkdir(tempDir, {recursive: true});
	} catch (err) {}

	try {
		for (let i = 0; i < testCases.length; i++) {
			const testCase = testCases[i];
			if (!testCase.input || !testCase.testId) {
				results.push({
					testId: testCase.testId || i + 1,
					error: "Missing input or testId",
				});
				continue;
			}

			try {
				let output;
				if (originalSource.language === "c/c++") {
					output = await runCppCode(
						originalSource.source,
						testCase.input,
						tempDir
					);
				} else if (originalSource.language === "python") {
					output = await runPythonCode(
						originalSource.source,
						testCase.input,
						tempDir
					);
				} else if (originalSource.language === "java") {
					output = await runJavaCode(
						originalSource.source,
						testCase.input,
						tempDir
					);
				} else if (originalSource.language === "javascript") {
					output = await runJavaScriptCode(
						originalSource.source,
						testCase.input,
						tempDir
					);
				} else {
					throw new Error("Unsupported language");
				}

				results.push({
					testId: testCase.testId,
					input: testCase.input,
					expectedOutput: output.trim(),
				});
			} catch (error) {
				console.error(
					`Error running test case ${testCase.testId}:`,
					error
				);
				results.push({
					testId: testCase.testId,
					input: testCase.input,
					error: error.message,
				});
			}
		}
	} finally {
		try {
			const files = await fs.readdir(tempDir);
			await Promise.all(
				files.map((file) =>
					fs.unlink(path.join(tempDir, file)).catch(() => {})
				)
			);
		} catch (err) {}
	}

	res.json({
		success: true,
		data: {
			testCases: results,
		},
	});
});

const createProblem = asyncHandle(async (req, res) => {
	const {problemData, testCasesData} = req.body;

	if (!problemData || !testCasesData) {
		throw new AppError("Missing problemData or testCasesData", 400);
	}

	const requiredFields = [
		"questionId",
		"titleSlug",
		"difficulty",
		"originalSource",
		"details",
	];
	for (const field of requiredFields) {
		if (!problemData[field]) {
			throw new AppError(`Missing required field: ${field}`, 400);
		}
	}

	const existingProblem = await Problem.findOne({
		$or: [
			{questionId: problemData.questionId},
			{titleSlug: problemData.titleSlug},
		],
	});

	if (existingProblem) {
		throw new AppError(
			"Problem with this questionId or titleSlug already exists",
			400
		);
	}

	const testCases = new TestCases({
		problemId: new mongoose.Types.ObjectId(),
		testCases: testCasesData.testCases,
	});

	const savedTestCases = await testCases.save();

	const problem = new Problem({
		...problemData,
		testCases: savedTestCases._id,
	});

	const savedProblem = await problem.save();

	savedTestCases.problemId = savedProblem._id;
	await savedTestCases.save();

	res.status(201).json({
		success: true,
		data: {
			problem: savedProblem,
			testCases: savedTestCases,
		},
		message: "Problem created successfully",
	});
});

const updateProblem = asyncHandle(async (req, res) => {
	const {identifier} = req.params;
	const {problemData, testCasesData} = req.body;

	let problem;
	if (isNaN(identifier)) {
		problem = await Problem.findOne({titleSlug: identifier});
	} else {
		problem = await Problem.findOne({questionId: parseInt(identifier)});
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	if (problemData) {
		Object.assign(problem, problemData);
		await problem.save();
	}

	if (testCasesData && testCasesData.testCases) {
		await TestCases.findOneAndUpdate(
			{problemId: problem._id},
			{testCases: testCasesData.testCases}
		);
	}

	res.json({
		success: true,
		data: {
			problem,
		},
		message: "Problem updated successfully",
	});
});

const deleteProblem = asyncHandle(async (req, res) => {
	const {identifier} = req.params;

	let problem;
	if (isNaN(identifier)) {
		problem = await Problem.findOne({titleSlug: identifier});
	} else {
		problem = await Problem.findOne({questionId: parseInt(identifier)});
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	await TestCases.findOneAndDelete({problemId: problem._id});

	await Problem.findByIdAndDelete(problem._id);

	res.json({
		success: true,
		message: "Problem deleted successfully",
	});
});

const getProblemSolution = asyncHandle(async (req, res) => {
	const {identifier} = req.params;
	const lang = req.query.language || "en";
	const userId = req.user._id;

	let problem;
	if (isNaN(identifier)) {
		problem = await Problem.findOne({titleSlug: identifier});
	} else {
		problem = await Problem.findOne({_id: identifier});
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	const userStatuses = await getUserProblemStatuses(userId, [problem._id]);
	const status = userStatuses[problem._id.toString()];

	if (status === "accepted") {
		res.json({
			pass: "true",
			solution:
				problem.details[lang]?.solution || problem.details.en.solution,
			source: problem.originalSource.source,
			language: problem.originalSource.language,
		});
	} else {
		res.json({
			pass: "false",
		});
	}
});

module.exports = {
	getProblemsList,
	getProblemDetail,
	getProblemSolution,
	generateExpectedOutputs,
	createProblem,
	updateProblem,
	deleteProblem,
};
