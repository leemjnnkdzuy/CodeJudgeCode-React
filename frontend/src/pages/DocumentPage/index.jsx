import {useLocation} from "react-router-dom";
import {
	ContactForm,
	CookiesForm,
	PrivacyForm,
	Sidebar,
	TermsForm,
} from "./components";
import style from "./DocumentPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const DocumentPage = () => {
	const location = useLocation();

	const shouldShowPrivacy =
		location.pathname === "/docs" || location.pathname === "/docs/privacy";

	return (
		<div className={cx("document-page")}>
			<div className={cx("container")}>
				<Sidebar className={cx("sidebar")} />
				<div className={cx("content")}>
					{shouldShowPrivacy && <PrivacyForm />}
					<ContactForm />
					<CookiesForm />
					<TermsForm />
				</div>
			</div>
		</div>
	);
};

export default DocumentPage;
