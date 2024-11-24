import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage";
// import Navbar from "../components/NavbarWarden.tsx";
import ResetPage from "../Pages/ResetPage/ResetPage.tsx";
import Warden from "../Pages/WardenDashboard/WardenDashboard.tsx";
import Student from "../Pages/StudentDashboard/StudentDashboard.tsx";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "student-login", element: <LoginPage /> },
            // { path: 'navbar', element: <Navbar/> },
            { path: 'reset', element: <ResetPage/> },
            {
                path: 'warden-dashboard',
                element: (
                    <ProtectedRoute>
                        <Warden />
                    </ProtectedRoute>
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