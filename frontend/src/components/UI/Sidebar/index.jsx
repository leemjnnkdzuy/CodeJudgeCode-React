import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import styles from "./Sidebar.module.scss";
import {useAuth} from "../../../hooks/useAuth";
import classNames from "classnames/bind";
import {DropDown} from "../../UI";

const cx = classNames.bind(styles);

function getInitials(name = "") {
	if (!name) return "?";
	const words = name.trim().split(" ");
	return words.length === 1
		? words[0][0].toUpperCase()
		: (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

const Sidebar = ({
	collapsed: collapsedProp,
	setCollapsed: setCollapsedProp,
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const {user, logout} = useAuth();
	const {t} = useTranslation();

	const navItems = [
		{
			to: "/home",
			icon: "bxs-home",
			label: t("globalSidebar.home"),
			match: (p) => p === "/" || p === "/home",
		},
		{
			to: "/problems",
			icon: "bxs-brain",
			label: t("globalSidebar.problems"),
			match: (p) => p.startsWith("/problems"),
		},
		{
			to: "/contests",
			icon: "bxs-trophy",
			label: t("globalSidebar.contests"),
			match: (p) => p.startsWith("/contests"),
		},
		{
			to: "/submissions",
			icon: "bxs-file-doc",
			label: t("globalSidebar.submissions"),
			match: (p) => p.startsWith("/submissions"),
		},
		{
			to: "/leaderboard",
			icon: "bxs-bar-chart-alt-2",
			label: t("globalSidebar.leaderboard"),
			match: (p) => p.startsWith("/leaderboard"),
		},
		{
			to: "/discussions",
			icon: "bxs-conversation",
			label: t("globalSidebar.discussions"),
			match: (p) => p.startsWith("/discussions"),
		},
		{
			to: "/learning",
			icon: "bxs-graduation",
			label: t("globalSidebar.learning"),
			match: (p) => p.startsWith("/learning"),
		},
	];

	const [internalCollapsed, setInternalCollapsed] = useState(false);
	const collapsed =
		typeof collapsedProp === "boolean" ? collapsedProp : internalCollapsed;
	const setCollapsed =
		typeof setCollapsedProp === "function"
			? setCollapsedProp
			: setInternalCollapsed;

	const [hoveredIdx, setHoveredIdx] = useState(null);

	useEffect(() => {
		const isCollapsed =
			localStorage.getItem("globalSidebarCollapsed") === "true";
		setCollapsed(isCollapsed);
	}, [setCollapsed]);

	const handleToggle = () => {
		const newCollapsed = !collapsed;
		setCollapsed(newCollapsed);
		localStorage.setItem("globalSidebarCollapsed", newCollapsed);
	};

	const handleLogout = () => {
		if (logout) logout();
		navigate("/login");
	};

	return (
		<div className={cx("global-sidebar", {collapsed})} id='globalSidebar'>
			<div className={cx("sidebar-header")}>
				<button className={cx("sidebar-toggle")} onClick={handleToggle}>
					<i className='bx bx-menu'></i>
				</button>
				<div className={cx("logo")} onClick={() => navigate("/")}>
					<span className={cx("logo-link", "logo-text")}>
						CodeJudge
					</span>
				</div>
			</div>

			<nav className={cx("sidebar-nav")}>
				<ul className={cx("nav-list")}>
					{navItems.map((item, idx) => (
						<li
							className={cx("nav-item")}
							key={item.to}
							onMouseEnter={() => collapsed && setHoveredIdx(idx)}
							onMouseLeave={() =>
								collapsed && setHoveredIdx(null)
							}
						>
							<button
								onClick={() => navigate(item.to)}
								className={cx("nav-link", {
									active: item.match(location.pathname),
								})}
								style={{
									position: "relative",
									display: "flex",
									alignItems: "center",
								}}
							>
								<span
									style={{
										minWidth: 24,
										display: "flex",
										justifyContent: "center",
									}}
								>
									<i className={`bx ${item.icon}`}></i>
								</span>
								{collapsed ? (
									hoveredIdx === idx && (
										<span
											className={cx("nav-text")}
											style={{
												position: "absolute",
												left: 48,
												top: "50%",
												transform: "translateY(-50%)",
												whiteSpace: "nowrap",
												background: "#fff",
												boxShadow:
													"0 2px 8px rgba(0,0,0,0.08)",
												borderRadius: 4,
												padding: "4px 12px",
												zIndex: 10,
											}}
										>
											{item.label}
										</span>
									)
								) : (
									<span className={cx("nav-text")}>
										{item.label}
									</span>
								)}
							</button>
						</li>
					))}
				</ul>

				<div className={cx("sidebar-footer")}>
					<ul className={cx("nav-list")}>
						<li
							className={cx("nav-item", "user-profile-item")}
							onMouseEnter={() =>
								collapsed && setHoveredIdx("profile")
							}
							onMouseLeave={() =>
								collapsed && setHoveredIdx(null)
							}
						>
							<DropDown
								items={
									collapsed
										? [
												{
													label: t(
														"globalSidebar.profile"
													),
													onClick: () =>
														navigate("/profile"),
												},
												{
													label: t(
														"globalSidebar.settings"
													),
													onClick: () =>
														navigate("/settings"),
												},
												{
													label: t(
														"globalSidebar.logout"
													),
													danger: true,
													onClick: handleLogout,
												},
										  ]
										: [
												{
													label: t(
														"globalSidebar.profile"
													),
													onClick: () =>
														navigate("/profile"),
												},
												{
													label: t(
														"globalSidebar.logout"
													),
													danger: true,
													onClick: handleLogout,
												},
										  ]
								}
								position='top'
							>
								<button
									className={cx(
										"nav-link",
										"user-profile-link",
										{
											active: location.pathname.startsWith(
												"/profile"
											),
										}
									)}
								>
									<div className={cx("user-avatar-sidebar")}>
										{user?.avatar ? (
											<img
												src={user.avatar}
												alt='Avatar'
												className={cx("avatar-image")}
											/>
										) : (
											<div
												className={cx(
													"avatar-initials"
												)}
											>
												{getInitials(
													`${
														user?.first_name || ""
													} ${user?.last_name || ""}`
												)}
											</div>
										)}
									</div>

									{!collapsed ? (
										<>
											<div
												className={cx(
													"user-profile-info"
												)}
											>
												<div
													className={cx(
														"user-fullname"
													)}
												>
													{user
														? `${
																user.first_name ||
																""
														  } ${
																user.last_name ||
																""
														  }`.trim()
														: t(
																"globalSidebar.user"
														  )}
												</div>
												<div
													className={cx(
														"user-username"
													)}
												>
													{user?.username ||
														user?.email ||
														""}
												</div>
											</div>
											<div
												className={cx("settings-btn")}
												onClick={(e) => {
													e.stopPropagation();
													navigate("/settings");
												}}
											>
												<i className='bx bx-cog' />
											</div>
										</>
									) : (
										hoveredIdx === "profile" && (
											<span
												className={cx(
													"nav-text",
													"user-name"
												)}
											>
												{user
													? `${
															user.first_name ||
															""
													  } ${
															user.last_name || ""
													  }`.trim()
													: t("globalSidebar.user")}
											</span>
										)
									)}
								</button>
							</DropDown>
						</li>

						{user?.role === "admin" && (
							<li
								className={cx("nav-item")}
								onMouseEnter={() =>
									collapsed && setHoveredIdx("admin")
								}
								onMouseLeave={() =>
									collapsed && setHoveredIdx(null)
								}
							>
								<button
									onClick={() => navigate("/admin")}
									className={cx("nav-link")}
									style={{
										position: "relative",
										display: "flex",
										alignItems: "center",
									}}
								>
									<i className='bx bxs-cog' />
									{collapsed ? (
										hoveredIdx === "admin" && (
											<span
												className={cx("nav-text")}
												style={{
													position: "absolute",
													left: 48,
													top: "50%",
													transform:
														"translateY(-50%)",
													whiteSpace: "nowrap",
													background: "#fff",
													boxShadow:
														"0 2px 8px rgba(0,0,0,0.08)",
													borderRadius: 4,
													padding: "4px 12px",
													zIndex: 10,
												}}
											>
												{t("globalSidebar.adminPanel")}
											</span>
										)
									) : (
										<span className={cx("nav-text")}>
											{t("globalSidebar.adminPanel")}
										</span>
									)}
								</button>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
