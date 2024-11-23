import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { UserProvider } from "./Context/UseAuth.tsx";
import { Outlet } from "react-router-dom";


function App() {
    return (
        <UserProvider>
            <ToastContainer />
            <Outlet /> {/* This is necessary to render child routes */}
        </UserProvider>
    );
}

export default App;


