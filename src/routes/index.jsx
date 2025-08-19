// layouts
import NotThingLayout from "../layouts/NotThingLayout";

// Pages
import WelcomePage from "../pages/WelcomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SignInSignUpPage from "../pages/SignInSignUpPage";
import DocumentPage from "../pages/DocumentPage";

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

export {publicRoutes};
