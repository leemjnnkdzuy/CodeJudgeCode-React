import React, {useState} from "react";
import Sidebar from "../../components/UI/Sidebar";
import styles from "./SidebarLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SidebarLayout = ({children}) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className={cx("sidebar-layout")}>
			<Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
			<main
				id='mainContent'
				className={cx("main-content", {"sidebar-collapsed": collapsed})}
			>
				{children}
			</main>
		</div>
	);
};

export default SidebarLayout;
