import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CancelStyle.css';
import Navbar from '../components/Navbar';

function Cancel() {
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

    // Renderimi i HTML per anulim te porosise
    return (
        <>
            <Navbar />

            <div className="cancel-container">
                <div className="cancel-animation">
                    <i className="fas fa-times-circle"></i>
                </div>
                <h1 className="cancel-heading">Na vjen keq qe e keni anuluar pagesen!</h1>
                <p className="cancel-subtext">Ne vleresojme besimin tuaj.</p>
            </div>
        </>
    );
}

export default Cancel;