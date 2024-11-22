import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/UseAuth";
import { useForm } from "react-hook-form";
import "./ResetPage.css";

// import LoginPageImage from './LoginPageImage.png';



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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.userName, form.password);
    };

    return (
        <section className="login-container">
            <div className="login-wrapper">
                {/* <div className="image-container">
                <img 
                    src={LoginPageImage} 
                    alt="Login Illustration" 
                    className="login-image" 
                />

                </div> */}
                <div className="form-container">
                    <h1 className="form-title">Reset Password</h1>
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
                                {...register("userName")} //this is to be updated later
                            />
                            {errors.userName && (
                                <p className="error-message">{errors.userName.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Temporarypassword" className="form-label">
                                Temporary Password
                            </label>
                            <input
                                type="Temporarypassword"
                                id="Temporarypassword"
                                className="form-input"
                                placeholder="••••••••"
                                {...register("password")} //this is to be updated later
                            />
                            {errors.password && (
                                <p className="error-message">{errors.password.message}</p>
                            )}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="Newpassword" className="form-label">
                                New Password
                            </label>
                            <input
                                type="Newpassword"
                                id="Newpassword"
                                className="form-input"
                                placeholder="••••••••"
                                {...register("password")} //this is to be updated later
                            />
                            {errors.password && (
                                <p className="error-message">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Confirmpassword" className="form-label">
                                Confirm password
                            </label>
                            <input
                                type="Confirmpassword"
                                id="Confirmpassword"
                                className="form-input"
                                placeholder="••••••••"
                                {...register("password")} //this is to be updated later
                            />
                            {errors.password && (
                                <p className="error-message">{errors.password.message}</p>
                            )}
                        </div>
                        <hr />

                        <button type="submit" className="reset-button">
                            Reset
                        </button>
                        {/* <p className="signup-prompt">
                            Don’t have an account yet?{' '}
                            <a href="#" className="signup-link">
                                Reset
                            </a>
                        </p> */}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;