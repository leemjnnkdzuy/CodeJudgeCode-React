import React, {useState, useEffect} from "react";
import classNames from "classnames/bind";
import styles from "./ProblemsPage.module.scss";
import ProblemsHeader from "./components/ProblemsHeader";
import ProblemsItem from "./components/ProblemsItem";
import ProblemsSidebar from "./components/ProblemsSidebar";
import TYPE_PROBLEM from "../../config/styleProblemConfig";

const cx = classNames.bind(styles);

const MOCK_PROBLEMS = [
	{
		id: 1,
		slug: "two-sum",
		title: "Hai số tổng",
		description:
			"Tìm hai số trong mảng có tổng bằng một giá trị cho trước.",
		problem_types: ["array", "hash_table"],
		difficulty: "easy",
		solved_count: 1234,
		user_status: "solved",
	},
	{
		id: 2,
		slug: "longest-substring",
		title: "Chuỗi con dài nhất không lặp",
		description: "Tìm độ dài chuỗi con không lặp ký tự.",
		problem_types: ["string", "sliding_window"],
		difficulty: "medium",
		solved_count: 567,
		user_status: "attempted",
	},
];

const PROBLEM_TYPES = Object.entries(TYPE_PROBLEM).map(([key, value]) => ({
	key: key.toLowerCase(),
	name: value.name,
	icon: value.icon,
}));

const DIFFICULTY_LABELS = {
	easy: "Dễ",
	medium: "Trung bình",
	hard: "Khó",
};

function formatSolvedCount(count) {
	if (count < 1000) return count;
	if (count < 1000000) return (count / 1000).toFixed(1) + "K";
	return (count / 1000000).toFixed(1) + "M";
}

function ProblemsPage() {
	const [problems, setProblems] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [difficulty, setDifficulty] = useState({
		easy: true,
		medium: true,
		hard: true,
	});
	const [status, setStatus] = useState("all");
	const [page, setPage] = useState(1);

	useEffect(() => {
		let filtered = MOCK_PROBLEMS.filter((p) => {
			if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
				return false;
			if (
				selectedTypes.length &&
				!p.problem_types.some((t) => selectedTypes.includes(t))
			)
				return false;
			if (!difficulty[p.difficulty]) return false;
			if (status === "solved" && p.user_status !== "solved") return false;
			if (status === "unsolved" && p.user_status === "solved")
				return false;
			return true;
		});
		setProblems(filtered);
	}, [search, selectedTypes, difficulty, status, page]);

	const handleTypeClick = (key) => {
		setSelectedTypes((prev) =>
			prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
		);
		setPage(1);
	};
	const handleDifficultyChange = (key) => {
		setDifficulty((prev) => ({...prev, [key]: !prev[key]}));
		setPage(1);
	};
	const handleStatusChange = (val) => {
		setStatus(val);
		setPage(1);
	};

	return (
		<div className={cx("problems-page")}>
			<ProblemsHeader
				search={search}
				setSearch={setSearch}
				setPage={setPage}
			/>

			<div className={cx("problems-container")}>
				<div className={cx("problems-main")}>
					<div className={cx("problems-list")}>
						{problems.length ? (
							problems.map((problem) => (
								<ProblemsItem
									key={problem.id}
									problem={problem}
									problemTypes={PROBLEM_TYPES}
									difficultyLabels={DIFFICULTY_LABELS}
									formatSolvedCount={formatSolvedCount}
								/>
							))
						) : (
							<div className={cx("no-problems")}>
								<i className='bx bx-search'></i>
								<h3>Không tìm thấy bài toán nào</h3>
								<p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
							</div>
						)}
					</div>
				</div>

				<ProblemsSidebar
					difficulty={difficulty}
					handleDifficultyChange={handleDifficultyChange}
					status={status}
					handleStatusChange={handleStatusChange}
					setPage={setPage}
					DIFFICULTY_LABELS={DIFFICULTY_LABELS}
					selectedTypes={selectedTypes}
					handleTypeClick={handleTypeClick}
				/>
			</div>
		</div>
	);
}

export default ProblemsPage;
