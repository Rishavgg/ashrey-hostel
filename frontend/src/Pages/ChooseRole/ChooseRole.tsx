import "./ChooseRole.css";
import LoginPageImage from '../../Assets/images/LoginPageImage.png';

const ChooseRole = () => {

    const handleCardClick = (role:string) => {
        alert(`You selected: ${role}`);
        // Add your navigation logic or functionality here
    };

    

    return (
        <section className="login-container">
            <div 
                className="login-wrapper" 
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
                className="login-wrapper" 
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
