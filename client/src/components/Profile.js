import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../styles/ProfileStyle.css';

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
                <div className='profile-inner-container'>
                    <h1 className='profile-title'>Your Profile</h1>
                    <div className='profile-group'>
                        <label className='label'>Id</label>
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
                            value={`${currentUser.accessToken.substring(0, 20)} ... ${currentUser.accessToken.substr(currentUser.accessToken.length - 20)}`}
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
            </div>

            <Footer />
        </>
    );
};

export default Profile;
