import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'
import Navbar from '../components/Navbar';
import '../styles/CancelStyle.css';

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
                <h1 className="cancel-heading">Anulim i porosisë</h1>
                <p className="cancel-subtext">Ju do të ridrejtoheni në faqen kryesore.</p>
                <ColorRing
                    visible={true}
                    height="65"
                    width="65"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#222', '#222', '#222', '#222', '#222']}
                />
            </div>
        </>
    );
}

export default Cancel;