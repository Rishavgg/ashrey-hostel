import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./ResetPage.css";
import {useAuth} from "../../Context/UseAuth";

type LoginFormsInputs = {
    userName: string;
    temporaryPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    temporaryPassword: Yup.string().required("Temporary password is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required("Please confirm your password"),
});

const ResetPage = () => {
    const { resetUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    // Updated handleLogin function
    const handleReset = (form: LoginFormsInputs) => {
        resetUser(form.userName, form.temporaryPassword, form.confirmPassword);
    };

    return (
        <section className="login-container">
            <div className="login-wrapper">
                <div className="form-container">
                    <h1 className="form-title">Reset Password</h1>
                    <form className="form" onSubmit={handleSubmit(handleReset)}>
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
                            <label htmlFor="temporaryPassword" className="form-label">
                                Temporary Password
                            </label>
                            <input
                                type="password"
                                id="temporaryPassword"
                                className="form-input"
                                placeholder="••••••••"
                                {...register("temporaryPassword")}
                            />
                            {errors.temporaryPassword && (
                                <p className="error-message">{errors.temporaryPassword.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="form-input"
                                placeholder="••••••••"
                                {...register("newPassword")}
                            />
                            {errors.newPassword && (
                                <p className="error-message">{errors.newPassword.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-input"
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className="error-message">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <hr />

                        <button type="submit" className="reset-button">
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPage;
