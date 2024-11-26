import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ResetPage from "../Pages/ResetPage/ResetPage.tsx";
import Warden from "../Pages/WardenDashboard/WardenDashboard.tsx";
import Student from "../Pages/StudentDashboard/StudentDashboard.tsx";
import ProtectedRoute from "./ProtectedRoute";
import WardenProtectedRoute from "./AdminProtectedRoute";
import Test from "../Pages/test/test.tsx";
import ChooseRole from "../Pages/ChooseRole/ChooseRole.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <ChooseRole /> },
            { path: "student-login", element: <LoginPage /> },
            { path: 'warden', element: <Warden/> },
            { path: 'reset', element: <ResetPage/> },
            { path: 'test' ,element:<Test/>},
            {
                path: 'warden-dashboard',
                element: (
                    <WardenProtectedRoute>
                        <Warden />
                    </WardenProtectedRoute>
                ),
            },
            {
                path: 'student-dashboard',
                element: (
                    <ProtectedRoute>
                        <Student />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);