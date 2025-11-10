const handleTypeClick = (setSelectedTypes, key) => {
	setSelectedTypes((prev) =>
		prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
	);
};

export default handleTypeClick;
