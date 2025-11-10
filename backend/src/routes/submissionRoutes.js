const express = require("express");
const router = express.Router();
const {
	createSubmission,
	getUserSubmissionsByProblem,
	getAllSubmissionsByProblem,
} = require("../controllers/submissionController");
const {authenticate} = require("../middlewares/authMiddleware");

router.post("/", createSubmission);
router.get("/:identifier", authenticate, getUserSubmissionsByProblem);
router.get("/public/:identifier", authenticate, getAllSubmissionsByProblem);

module.exports = router;
