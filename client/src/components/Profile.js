import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../styles/ProfileStyle.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(null);
        navigate('/login');
    };

    const deleteUser = async (id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure that you want to delete account? This action is irreversible.',
            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => { },
                    className: 'cancel-btn',
                },
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await axios.delete(`http://localhost:6001/api/user/remove/${id}`, {
                                headers: { 'x-access-token': currentUser.accessToken }
                            });
                            toast.success('User deleted successfully!', { style: { marginTop: '70px' } });
                            AuthService.logout();
                            navigate('/register');
                        } catch (error) {
                            toast.error(`Error deleting user: ${error.message}`);
                        }
                    },
                    className: 'yes-btn',
                },
            ],
        });
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='profile-container'>
                <div className='profile-inner-container'>
                    <h1 className='profile-title'>Your Profile</h1>
                    <div className='profile-group'>
                        <label className='profile-label'>Id</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={currentUser.id}
                            readOnly
                        />
                    </div>
                    <div className='profile-group'>
                        <label className='profile-label'>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={currentUser.username}
                            readOnly
                        />
                    </div>
                    <div className='profile-group'>
                        <label className='profile-label'>Email</label>
                        <input
                            type="text"
                            id="profile-email"
                            name="profile-email"
                            value={currentUser.email}
                            readOnly
                        />
                    </div>
                    <div className='profile-group'>
                        <label className='profile-label'>Token</label>
                        <input
                            type="text"
                            id="token"
                            name="token"
                            value={`${currentUser.accessToken.substring(0, 20)} ... ${currentUser.accessToken.substring(currentUser.accessToken.length - 20)}`}
                            readOnly
                        />
                    </div>
                    <div className='button-group'>
                        <button className='btn log-out' onClick={logOut}>
                            Log Out
                        </button>
                        {currentUser.role === 2 && (
                            <Link to={'/admin'}>
                                <button className='btn admin-dashboard'>
                                    Dashboard
                                </button>
                            </Link>
                        )}
                        <button className='btn delete-account' onClick={() => deleteUser(currentUser.id)}>
                            {currentUser.role === 2 ? 'Delete' : 'Delete Account'}

                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
