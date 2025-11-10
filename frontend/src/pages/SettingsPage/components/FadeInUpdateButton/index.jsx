import React from "react";
import {motion} from "framer-motion";
import classNames from "classnames/bind";
import {Button, Loading} from "../../../../components/UI/";
import style from "./FadeInUpdateButton.module.scss";

const cx = classNames.bind(style);

const FadeInUpdateButton = ({loading = false, hasChanges = false, onClick}) => {
	const variants = {
		hidden: {opacity: 0, y: 20},
		visible: {opacity: 1, y: 0},
	};

	return (
		<motion.div
			className={cx("fade-in-button")}
			initial='hidden'
			animate={hasChanges ? "visible" : "hidden"}
			variants={variants}
			transition={{duration: 0.5, ease: "easeInOut"}}
		>
			<Button type='button' disabled={loading} onClick={onClick}>
				{loading ? <Loading size={16} /> : "Cập Nhật"}
			</Button>
		</motion.div>
	);
};

export default FadeInUpdateButton;
