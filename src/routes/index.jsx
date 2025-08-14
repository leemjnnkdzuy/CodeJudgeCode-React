// layouts
import NotThingLayout from "../layouts/NotThingLayout";

// Pages
import WelcomePage from "../pages/WelcomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SignInSignUpPage from "../pages/SignInSignUpPage";

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
];

export {publicRoutes};
