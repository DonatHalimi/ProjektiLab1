import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthService from '../services/auth.service';
import LoginStyle from '../styles/Login.module.css';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const user = AuthService.getCurrentUser();
        if (user) {
            navigate('/profile'); // Redirect to profile page if user is logged in
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(email, password);
            navigate('/profile');
            window.location.reload();
        } catch (error) {
            toast.error('Login failed. Check your credentials.', {
                position: 'top-right',
                style: {
                    marginTop: '70px',
                    cursor: 'pointer',
                    transition: 'opacity 2s ease-in',
                },
            });
        }
    };

    // Password visibility toggle function
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <Navbar />
            <div className={LoginStyle["login-Container"]}>
                <div className={LoginStyle["login-box"]}>
                    <p>Log In</p>
                    <form onSubmit={handleLogin}>
                        <div className={LoginStyle["user-box"]}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="on"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={LoginStyle["user-box"]}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="on"
                            />
                            <label htmlFor="email">Password</label>
                            <button
                                type="button"
                                className={LoginStyle["visibility-btn"]}
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button className={LoginStyle["btn"]} type="submit">Log In</button>
                    </form>
                    <p id={LoginStyle['account-text']}>Nuk posedoni llogari? <Link to="/register" className={LoginStyle['a']}>Sign Up!</Link></p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;
