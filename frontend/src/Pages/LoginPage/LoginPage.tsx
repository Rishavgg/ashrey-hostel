import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/UseAuth";
import { useForm } from "react-hook-form";
// import { useLocation } from "react-router-dom";
import "./LoginPage.css";

import LoginPageImage from '../../Assets/images/LoginPageImage.png';

type LoginFormsInputs = {
    userName: string;
    password: string;
};

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
    const { loginUser } = useAuth();
    // const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    // Determine the redirect path (fallback to dashboard if no previous path)
    // const redirectPath = location.state?.from?.pathname || "/student-dashboard";

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.userName, form.password); // Pass redirectPath to loginUser
    };

    return (
        <section className="login-container">
            <div className="login-wrapper">
                <div className="image-container">
                    <img 
                        src={LoginPageImage} 
                        alt="Login Illustration" 
                        className="login-image" 
                    />
                </div>
                <div className="form-container">
                    <h1 className="form-title">Sign in to your account</h1>
                    <form className="form" onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="form-input"
                                placeholder="Username"
                                {...register("userName")}
                            />
                            {errors.userName && (
                                <p className="error-message">{errors.userName.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"   
                                className="form-input"
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="error-message">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="form-footer">
                            <a href="#" className="forgot-password-link">
                                Forgot password?
                            </a>
                        </div>
                        <button type="submit" className="submit-button">
                            Sign in
                        </button>
                        <p className="signup-prompt">
                            Don’t have an account yet?{' '}
                            <a href="#" className="signup-link">
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;