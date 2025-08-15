import {
	CookiesForm,
	PrivacyForm,
	Sidebar,
	TermsForm,
} from "./components";
import style from "./DocumentPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const DocumentPage = () => {
	return (
		<div className={cx("document-page")}>
			<Sidebar />
			<div className={cx("content")}>
				<CookiesForm />
				<PrivacyForm />
				<TermsForm />
			</div>
		</div>
	);
};

export default DocumentPage;