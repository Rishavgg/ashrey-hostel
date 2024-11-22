import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Navbar from "../components/Navbar.tsx";
import ResetPage from "../Pages/ResetPage/Resetpage.tsx"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [

            { path: "login", element: <LoginPage /> },
            { path: 'navbar', element: <Navbar/> },
            { path: 'Reset', element: <ResetPage/> },
        ],
    },
]);