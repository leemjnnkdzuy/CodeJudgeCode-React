import React from "react";
import classNames from "classnames/bind";
import styles from "./AppLoader.module.scss";
import {Loading} from "../UI";

const cx = classNames.bind(styles);

const AppLoader = () => {
	return (
		<div className={cx("loader-container")}>
			<div className={cx("loader")}>
				<Loading size='50px' />
			</div>
		</div>
	);
};

export default AppLoader;
