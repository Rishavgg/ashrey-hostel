import "./ChooseRole.css";
import LoginPageImage from '../../Assets/images/LoginPageImage.png';
import {useNavigate} from "react-router-dom";

const ChooseRole = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleCardClick = (role: string) => {
        if (role === 'Employee') {
            window.location.href = "http://localhost:8081/employee-login/"; // Navigate to /employee-login for Employee
        } else if (role === 'Student') {
            navigate('/student-login'); // Navigate to /student-login for Student
        }
    };

    

    return (
        <section className="choose-role-container">
            <div 
                className="choose-role-wrapper"
                onClick={() => handleCardClick('Employee')}
            >
                <div className="image-container">
                    <img 
                        src={LoginPageImage} 
                        alt="Login Illustration" 
                        className="login-image" 
                    />
                </div>
                <h2>Employee Login</h2>
            </div>

            <div 
                className="choose-role-wrapper"
                onClick={() => handleCardClick('Student')}
            >
                <div className="image-container">
                    <img 
                        src={LoginPageImage} 
                        alt="Login Illustration" 
                        className="login-image" 
                    />
                </div>
                <h2>Student Login</h2>
            </div>
        </section>
    );
};

export default ChooseRole;
