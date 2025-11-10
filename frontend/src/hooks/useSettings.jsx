import {useState, useCallback} from "react";

const useSettings = () => {
	const [loading, setLoading] = useState(false);
	const [hasChanges, setHasChanges] = useState(false);
	const [submitHandler, setSubmitHandler] = useState(null);

	const updateSubmitHandler = useCallback((handler) => {
		setSubmitHandler(() => handler);
	}, []);

	const resetChanges = useCallback(() => {
		setHasChanges(false);
	}, []);

	return {
		setLoading,
		setHasChanges,
		updateSubmitHandler,
		resetChanges,
		loading,
		hasChanges,
		submitHandler,
	};
};

export default useSettings;
