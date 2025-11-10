const mongoose = require("mongoose");

const testCasesSchema = new mongoose.Schema({
	problemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Problem",
		required: true,
	},
	testCases: [
		{
			testId: {
				type: Number,
				required: true,
			},
			input: {
				type: String,
				required: false,
				default: "",
			},
			expectedOutput: {
				type: String,
				required: true,
			},
		},
	],
});

exports.TestCases = mongoose.model("TestCases", testCasesSchema);
