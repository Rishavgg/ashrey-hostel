import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ResetPage from "../Pages/ResetPage/ResetPage.tsx";
import Warden from "../Pages/WardenDashboard/WardenDashboard.tsx";
import Student from "../Pages/StudentDashboard/StudentDashboard.tsx";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ChooseRole from "../Pages/ChooseRole/ChooseRole.tsx";
import ChiefWardenDashboard from "../Pages/ChiefWardenDashboard/ChiefWardenDashboard.tsx"

import Gate from "../Pages/Gate/GateDashboard.tsx"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <ChooseRole /> },
            { path: "student-login", element: <LoginPage /> },
            { path: 'warden', element: <Warden/> },
            { 
                path: 'chief-warden-dashboard', 
                element:( 
                    <AdminProtectedRoute>
                    <ChiefWardenDashboard/>
                    </AdminProtectedRoute>
                ),
            },
            { path: 'reset', element: <ResetPage/> },
            { path: 'student', element: <Student/> },
            {
                path: 'warden-dashboard',
                element: (
                //    <AdminProtectedRoute>
                        <Warden />
                //    </AdminProtectedRoute>  
                ),
            },
            {
                path: 'gate-dashboard',
                element: (
                   <AdminProtectedRoute>
                        <Gate />
                   </AdminProtectedRoute>
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
