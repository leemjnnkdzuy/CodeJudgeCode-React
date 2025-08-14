import style from "./globalStyles.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function GlobalStyles({ children }) {
	return <div className={cx("global-styles")}>{children}</div>;
}

export default GlobalStyles;