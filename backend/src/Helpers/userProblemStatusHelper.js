const {Submission} = require("../models/submissionModel");


async function getUserProblemStatuses(userId, problemIds) {
	const submissions = await Submission.aggregate([
		{$match: {userId, problemId: {$in: problemIds}}},
		{$sort: {createdAt: -1}},
		{
			$group: {
				_id: "$problemId",
				status: {$first: "$status"},
			},
		},
	]);
	const statusMap = {};
	for (const sub of submissions) {
		statusMap[sub._id.toString()] = sub.status;
	}
	return statusMap;
}

module.exports = {getUserProblemStatuses};
