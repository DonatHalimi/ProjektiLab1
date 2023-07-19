import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuccessStyle.css';
import Navbar from '../components/Navbar';

function Success() {
    const navigate = useNavigate();

    // Krijojme nje useEffect ku pas 3 sekondave perdoruesi kthehet ne Home page
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 3000);

        // UseEffect kryhet vetem nje here
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // Renderimi i HTML per sukses ne porosi
    return (
        <>
            <Navbar />

            <div className="success-container">
                <div className="success-animation">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h1 className="success-heading">Pagesa juaj është kryer me sukses!</h1>
                <p className="success-subtext">Ne e vlerësojmë besimin tuaj.</p>
                <p className='redirecting'>Redirecting...</p>
            </div>
        </>
    );
}

export default Success;