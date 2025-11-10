const handleDifficultyChange = (setDifficulty, key) => {
	setDifficulty((prev) => ({...prev, [key]: !prev[key]}));
};

export default handleDifficultyChange;
