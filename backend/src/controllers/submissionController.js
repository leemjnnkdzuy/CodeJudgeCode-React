const {Submission} = require("../models/submissionModel");
const {User} = require("../models/userModel");
const {Problem} = require("../models/problemModel");
const AppError = require("../utils/errors");
const asyncHandle = require("express-async-handler");

const createSubmission = asyncHandle(async (req, res) => {
	const {problemId, userId, code, language, status} = req.body;
	const submission = new Submission({
		problemId,
		userId,
		code,
		language,
		status,
	});
	await submission.save();

	const user = await User.findById(userId);
	if (!user) {
		throw new AppError("User not found", 404);
	}
	if (!user.submissions.some((id) => id.equals(submission._id))) {
		user.submissions.push(submission._id);
	}

	if (status === "accepted") {
		const isFirstTimeSolved = !user.problems_solved.some((id) =>
			id.equals(problemId)
		);

		if (isFirstTimeSolved) {
			user.problems_solved.push(problemId);

			const problems = await Problem.find({
				_id: {$in: user.problems_solved},
			});
			let rating = 0;
			for (const p of problems) {
				if (p.difficulty === "Easy") rating += 5;
				else if (p.difficulty === "Medium") rating += 10;
				else if (p.difficulty === "Hard") rating += 15;
			}
			user.rating = rating;
		}
	}

	await user.save();

	return res.status(201).json({success: true, data: submission});
});

const getUserSubmissionsByProblem = asyncHandle(async (req, res) => {
	const {identifier} = req.params;
	const lang = req.query.language || "en";

	const userId = req.user?.id;
	if (!userId) {
		throw new AppError("Authentication required", 401);
	}

	let problem;
	if (isNaN(identifier)) {
		problem = await Problem.findOne({titleSlug: identifier});
	} else {
		problem = await Problem.findOne({_id: identifier});
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	const submissions = await Submission.find({
		userId: userId,
		problemId: problem._id,
	})
		.sort({createdAt: -1})
		.populate("problemId", "questionId titleSlug difficulty");

	const formattedSubmissions = submissions.map((submission) => ({
		id: submission._id,
		problemId: submission.problemId._id,
		problemTitle:
			submission.problemId.details[lang]?.title ||
			submission.problemId.details.en.title,
		problemSlug: submission.problemId.titleSlug,
		problemDifficulty: submission.problemId.difficulty,
		language: submission.language,
		status: submission.status,
		submittedAt: submission.createdAt,
		code: submission.code,
	}));

	return res.json({
		success: true,
		data: {
			problem: {
				id: problem._id,
				questionId: problem.questionId,
				titleSlug: problem.titleSlug,
				title: problem.details[lang]?.title || problem.details.en.title,
				difficulty: problem.difficulty,
			},
			submissions: formattedSubmissions,
			totalSubmissions: formattedSubmissions.length,
		},
	});
});

const getAllSubmissionsByProblem = asyncHandle(async (req, res) => {
	const {identifier} = req.params;
	const lang = req.query.language || "en";

	let problem;
	if (isNaN(identifier)) {
		problem = await Problem.findOne({titleSlug: identifier});
	} else {
		problem = await Problem.findOne({_id: identifier});
	}

	if (!problem) {
		throw new AppError("Problem not found", 404);
	}

	const submissions = await Submission.find({
		problemId: problem._id,
	})
		.sort({createdAt: -1})
		.populate("problemId", "questionId titleSlug difficulty")
		.populate("userId", "username");

	const formattedSubmissions = submissions.map((submission) => ({
		id: submission._id,
		problemId: submission.problemId._id,
		problemTitle:
			submission.problemId.details[lang]?.title ||
			submission.problemId.details.en.title,
		problemSlug: submission.problemId.titleSlug,
		problemDifficulty: submission.problemId.difficulty,
		language: submission.language,
		status: submission.status,
		submittedAt: submission.createdAt,
		user: {
			id: submission.userId._id,
			username: submission.userId.username,
		},
	}));

	return res.json({
		success: true,
		data: {
			problem: {
				id: problem._id,
				questionId: problem.questionId,
				titleSlug: problem.titleSlug,
				title: problem.details[lang]?.title || problem.details.en.title,
				difficulty: problem.difficulty,
			},
			submissions: formattedSubmissions,
			totalSubmissions: formattedSubmissions.length,
		},
	});
});

module.exports = {
	createSubmission,
	getUserSubmissionsByProblem,
	getAllSubmissionsByProblem,
};
