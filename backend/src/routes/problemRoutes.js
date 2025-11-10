const express = require("express");
const {
	getProblemsList,
	getProblemDetail,
	getProblemSolution,
	generateExpectedOutputs,
	createProblem,
	updateProblem,
	deleteProblem,
} = require("../controllers/problemController");
const {authenticate, requireAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(express.json());

const optionalAuth = (req, res, next) => {
	if (req.headers.authorization) {
		return authenticate(req, res, next);
	}
	next();
};

router.post("/get-problems-list", optionalAuth, getProblemsList);
router.get("/:identifier", getProblemDetail);

router.get("/:identifier/solution", authenticate, getProblemSolution);

router.post(
	"/generate-outputs",
	authenticate,
	requireAdmin,
	generateExpectedOutputs
);
router.post("/", authenticate, requireAdmin, createProblem);
router.put("/:identifier", authenticate, requireAdmin, updateProblem);
router.delete("/:identifier", authenticate, requireAdmin, deleteProblem);

module.exports = router;
