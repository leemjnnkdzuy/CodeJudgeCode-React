// layouts
import {
	NotThingLayout,
	SidebarLayout,
} from "../layouts/";

// Pages
import {
	WelcomePage,
	NotFoundPage,
	SignInSignUpPage,
	DocumentPage,
	HomePage,
	ProblemsPage,
	ProblemsSubmitPage,
} from "../pages";

const publicRoutes = [
	{
		path: "/",
		component: WelcomePage,
		layout: NotThingLayout,
	},
	{
		path: "*",
		component: NotFoundPage,
		layout: NotThingLayout,
	},
	{
		path: "/login",
		component: SignInSignUpPage,
		layout: NotThingLayout,
	},
	{
		path: "/register",
		component: SignInSignUpPage,
		layout: NotThingLayout,
	},
	{
		path: "/forgot-password",
		component: SignInSignUpPage,
		layout: NotThingLayout,
	},
	{
		path: "/reset-password",
		component: SignInSignUpPage,
		layout: NotThingLayout,
	},
	{
		path: "/verification",
		component: SignInSignUpPage,
		layout: NotThingLayout,
	},
	{
		path: "/docs",
		component: DocumentPage,
		layout: NotThingLayout,
	},
	{
		path: "/docs/privacy",
		component: DocumentPage,
		layout: NotThingLayout,
	},
	{
		path: "/docs/terms",
		component: DocumentPage,
		layout: NotThingLayout,
	},
	{
		path: "/docs/cookies",
		component: DocumentPage,
		layout: NotThingLayout,
	},
	{
		path: "/docs/contact",
		component: DocumentPage,
		layout: NotThingLayout,
	},
];

const privateRoutes = [
	{
		path: "/home",
		component: HomePage,
		layout: SidebarLayout,
	},
	{
		path: "/problems",
		component: ProblemsPage,
		layout: SidebarLayout,
	},

	{
		path: "/problems/*",
		component: ProblemsSubmitPage,
		layout: NotThingLayout,
	},
];

export {publicRoutes, privateRoutes};
