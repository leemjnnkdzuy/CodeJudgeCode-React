const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
	problemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Problem",
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		enum: ["c/c++", "python", "java", "javascript"],
		required: true,
	},
	status: {
		type: String,
		enum: [
			"pending",
			"running",
			"accepted",
			"wrong_answer",
			"time_limit_exceeded",
			"not_run",
		],
		default: "pending",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

exports.Submission = mongoose.model("Submission", submissionSchema);
