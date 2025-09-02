import React, {useState, useEffect} from "react";
import classNames from "classnames/bind";
import styles from "./ProblemsPage.module.scss";
import {Button, Loading} from "../../components/UI";
import {ProblemsSidebar, ProblemsItem, ProblemsHeader} from "./components";
import TYPE_PROBLEM from "../../config/styleProblemConfig";
import request from "../../utils/request";

const cx = classNames.bind(styles);
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
	const [allProblems, setAllProblems] = useState([]);
	const [problems, setProblems] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [difficulty, setDifficulty] = useState({
		easy: true,
		medium: true,
		hard: true,
	});
	const [status, setStatus] = useState("all");
	const [isLoading, setIsLoading] = useState(false);
	const [isContinue, setIsContinue] = useState(false);
	const [loadedCount, setLoadedCount] = useState(5);

	useEffect(() => {
		const fetchProblems = async () => {
			setIsLoading(true);
			try {
				const token = window.localStorage.getItem("userToken");
				const res = await request.getProblemsList({
					begin: 1,
					end: loadedCount,
					token: token || undefined,
				});
				const processedProblems = res.problems.map((p) => {
					if (!p.description) p.description = "";
					if (!Array.isArray(p.problem_types)) p.problem_types = [];
					p.problem_types = p.problem_types.map((t) =>
						t.toLowerCase()
					);
					return p;
				});
				setAllProblems(processedProblems);
				setIsContinue(res.isContinue);
			} catch (e) {
				setAllProblems([]);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProblems();
	}, [loadedCount]);

	useEffect(() => {
		let filtered = allProblems.filter((p) => {
			if (
				search &&
				search.trim() &&
				!p.title.toLowerCase().includes(search.toLowerCase())
			)
				return false;
			if (
				selectedTypes.length &&
				!p.problem_types.some((t) => selectedTypes.includes(t))
			)
				return false;
			if (!difficulty[p.difficulty]) return false;
			if (status === "solved" && p.user_status !== "accepted")
				return false;
			if (status === "unsolved" && p.user_status === "accepted")
				return false;
			return true;
		});
		setProblems(filtered);
	}, [allProblems, search, selectedTypes, difficulty, status]);

	const handleTypeClick = (key) => {
		setSelectedTypes((prev) =>
			prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
		);
	};
	const handleDifficultyChange = (key) => {
		setDifficulty((prev) => ({...prev, [key]: !prev[key]}));
	};
	const handleStatusChange = (val) => {
		setStatus(val);
	};

	const loadMore = () => {
		setLoadedCount((prev) => prev + 5);
	};

	return (
		<div className={cx("problems-page")}>
			<ProblemsHeader search={search} setSearch={setSearch} />

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
								<h3>
									{search && search.trim()
										? "Không tìm thấy bài toán nào"
										: "Chưa có bài toán nào"}
								</h3>
								<p>
									{search && search.trim()
										? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
										: "Bài toán sẽ xuất hiện ở đây khi có dữ liệu"}
								</p>
							</div>
						)}
					</div>
					{isContinue && (
						<div className={cx("load-more-container")}>
							<Button
								className={cx("load-more-btn")}
								onClick={loadMore}
								disabled={isLoading}
							>
								{isLoading ? (
									<Loading size='10px' />
								) : (
									"Xem thêm bài tập"
								)}
							</Button>
						</div>
					)}
				</div>

				<ProblemsSidebar
					difficulty={difficulty}
					handleDifficultyChange={handleDifficultyChange}
					status={status}
					handleStatusChange={handleStatusChange}
					DIFFICULTY_LABELS={DIFFICULTY_LABELS}
					selectedTypes={selectedTypes}
					handleTypeClick={handleTypeClick}
				/>
			</div>
		</div>
	);
}

export default ProblemsPage;
