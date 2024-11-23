import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Navbar from "../components/NavbarWarden.tsx";
import ResetPage from "../Pages/ResetPage/ResetPage.tsx"
// import Temp from "../Pages/temp/temp.tsx"
import Warden from "../Pages/WardenDashboard/WardenDashboard.tsx"
import Student from "../Pages/StudentDashboard/StudentDashboard.tsx"




export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [

            { path: "login", element: <LoginPage /> },
            { path: 'navbar', element: <Navbar/> },
            { path: 'reset', element: <ResetPage/> },
            // { path: 'temp', element: <Temp/> },
            { path: 'warden', element: <Warden/> },
            { path: 'student', element: <Student/> },
        ],
    },
]);