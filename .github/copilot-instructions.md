# Copilot Coding Agent Instructions for CodeJudge-React

## Project Overview

-   This is a React-based web application for coding challenges, user management, and ranking, with a modular structure under `src/`.
-   Key features: authentication, registration, password reset, user profile, badges, rankings, and internationalization (i18n).
-   Backend API endpoints are consumed via `src/utils/request.jsx` using Axios. API base URL is set by `REACT_APP_API_BASE_URL` or defaults to `http://localhost:3001`.

## Major Components & Structure

-   **Pages**: Each main route/page (SignInSignUp, DocumentPage, etc.) is in `src/pages/` with subcomponents in `components/` folders.
-   **UI Components**: Shared UI elements (Button, Loading, Tooltip, etc.) are in `src/components/UI/`.
-   **Config**: App-wide configs (badges, languages, ranking, etc.) are in `src/config/` as JS modules.
-   **Assets**: Images, icons, and SVGs are in `src/assets/`.
-   **Hooks**: Custom React hooks for auth, notifications, theme, etc. in `src/hooks/`.
-   **i18n**: Internationalization setup in `src/i18n/` with `en.json` and `vi.json`.
-   **Layouts**: Layout wrappers in `src/layouts/`.

## Developer Workflows

-   **Start Dev Server**: `npm start` (uses `react-scripts`)
-   **Build**: `npm run build`
-   **Test**: `npm test` (Jest + React Testing Library)
-   **Lint**: ESLint config extends `react-app` and `react-app/jest`.
-   **Sass**: Use `.module.scss` for component-scoped styles.

## Project-Specific Patterns

-   **Form Validation**: Validation logic is colocated with form containers (see `validateRegister` in `SignInSignUpPage/index.jsx`). Password strength uses `zxcvbn` and visual feedback via a colored dot and tooltip.
-   **API Requests**: All API calls go through `src/utils/request.jsx`. Error handling is centralized with `handleAxiosError`.
-   **Notification**: Use `useGlobalNotificationPopup` hook for user feedback (success/error messages).
-   **Component Structure**: Each form (register, login, reset password, etc.) is a separate component with its own styles and logic.
-   **Password Strength UI**: The colored dot and tooltip for password strength are implemented in both Register and ResetPassword forms, with shared SCSS patterns.
-   **Routing**: Uses `react-router-dom` v7 for navigation and phase management.
-   **State**: Uses React hooks and local state; no Redux or MobX.

## Integration & Extensibility

-   **Add new API endpoints**: Extend `src/utils/request.jsx`.
-   **Add new languages/badges**: Update `src/config/supportedLanguagesConfig.jsx` or `badgesConfig.jsx`.
-   **Add new UI patterns**: Place shared components in `src/components/UI/`.
-   **i18n**: Add new keys to `src/i18n/en.json` and `vi.json`.

## Examples

-   See `src/pages/SignInSignUpPage/index.jsx` for multi-phase auth flow and validation.
-   See `src/pages/SignInSignUpPage/components/RegisterForm/index.jsx` for password strength UI pattern.
-   See `src/utils/request.jsx` for API structure and error handling.

---

For any unclear or missing conventions, please request clarification or examples from the user before making assumptions.
