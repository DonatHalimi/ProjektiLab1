import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CancelStyle.css';

function Cancel() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="cancel-container">
            <div className="cancel-animation">
                <i className="fas fa-times-circle"></i>
            </div>
            <h1 className="cancel-heading">Na vjen keq që e keni anuluar pagesën!</h1>
            <p className="cancel-subtext">Ne vlerësojmë besimin tuaj.</p>
        </div>
    );
}

export default Cancel;