import React from 'react';
import Navbar from './Navbar';
import '../styles/NotAllowedStyle.css'
import LockIcon from '../img/lock-icon.png'

const NotAllowed = () => {
    return (
        <>
            <Navbar />
            <div className='not-allowed'>
                <img src={LockIcon} alt="Lock Icon" className="lock-image" />
                <div class="message-div">
                    <h1 className='message'>Access to this page is restricted</h1>
                </div>
            </div>
        </>
    );
};

export default NotAllowed;