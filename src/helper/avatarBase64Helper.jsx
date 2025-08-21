export function base64ToImage(base64String) {
	if (!base64String) return "";
	if (base64String.startsWith("data:image")) return base64String;
	return `data:image/png;base64,${base64String}`;
}

export function imageToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;
			const base64 = result.split(",")[1];
			resolve(base64);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
