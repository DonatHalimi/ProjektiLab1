import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthService from '../services/auth.service';
import RegisterStyle from '../styles/Register.module.css';
import Navbar from "./Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            navigate('/profile');
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(username, email, password, 'User');
            navigate('/login');
        } catch (error) {
            console.error(error);
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <Navbar />
            <div className={RegisterStyle['register-Container']}>
                <div className={RegisterStyle['register-box']}>
                    <p>Sign Up</p>
                    <form onSubmit={handleRegister}>
                        <div className={RegisterStyle['user-box']}>
                            <input
                                type="text"
                                className={`form-control ${RegisterStyle['input-text']}`}
                                name="username"
                                value={username}
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className={RegisterStyle['user-box']}>
                            <input
                                type="text"
                                className={`form-control ${RegisterStyle['input-text']}`}
                                name="email"
                                value={email}
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={RegisterStyle['user-box']}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className={`form-control ${RegisterStyle['input-text']}`}
                                name="password"
                                value={password}
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                            <button
                                type="button"
                                className={RegisterStyle["visibility-btn"]}
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className={RegisterStyle['form-group']}>
                            <button className={`btn btn-primary btn-block ${RegisterStyle['btn']}`}>Sign Up</button>
                            <p id={RegisterStyle['account-text']}>Posedoni një llogari? <Link to="/login" className={RegisterStyle['login-link']}>Log In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
