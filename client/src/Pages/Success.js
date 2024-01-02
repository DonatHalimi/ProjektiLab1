import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'
import Navbar from '../components/Navbar';
import '../styles/SuccessStyle.css';

function Success() {
    const navigate = useNavigate();

    // Krijojme nje useEffect ku pas 3 sekondave perdoruesi kthehet ne Home page
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/Home');
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
                <h1 className="success-heading">Pagesa është kryer me sukses!</h1>
                <p className="success-subtext">Ne e vlerësojmë besimin tuaj.</p>
                <ColorRing
                    visible={true}
                    height="55"
                    width="55"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#222', '#222', '#222', '#222', '#222']}
                />
            </div>
        </>
    );
}

export default Success;