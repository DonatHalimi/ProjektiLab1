import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import Navbar from './Navbar';
import '../styles/ProfileStyle.css';
import { Link } from 'react-router-dom';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [user, setCurrentUser] = useState(null);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(null);
    }

    return (
        <>
            <Navbar />
            <div className='profile-container'>
                <h1 className='profile-title'>Your Profile</h1>
                <div className='inputGroup'>
                    <label className='profile-label'>Id</label>
                    <input
                        type="text"
                        value={currentUser.id}
                        className='profile-input'
                        readOnly
                    />
                </div>
                <div className='inputGroup'>
                    <label className='profile-label'>Username</label>
                    <input
                        type="text"
                        value={currentUser.username}
                        className='profile-input'
                        readOnly
                    />
                </div>
                <div className='inputGroup'>
                    <label className='profile-label'>Email</label>
                    <input
                        type="text"
                        value={currentUser.email}
                        className='profile-input'
                        readOnly
                    />
                </div>
                <div className='inputGroup'>
                    <label className='profile-label'>Token</label>
                    <input
                        type="text"
                        value={`${currentUser.accessToken.substring(0, 20)} ... ${currentUser.accessToken.substr(currentUser.accessToken.length - 20)}`}
                        className='profile-input'
                        readOnly
                    />
                </div>
                <div className='button-group'>
                    <Link to={'/login'} onClick={logOut}>
                        <button className='log-out'>
                            Log Out
                        </button>
                    </Link>
                    {currentUser.role === 2 && (
                        <Link to={'/admin'}>
                            <button className='admin-dashboard'>
                                Dashboard
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
