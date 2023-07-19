import React from 'react';
import CookieConsent from 'react-cookie-consent';
import BittenCookieIcon from '../img/Cookie.png';

const CookiePopup = () => {
    return (
        <CookieConsent
            style={{ background: '#00534f', color: 'white', display: 'flex', alignItems: 'center', paddingLeft: '20px' }}
            buttonStyle={{ background: '#002828', color: '#fff', fontSize: '14px', borderRadius: '5px', transition: 'opacity 0.2s' }}
            buttonText="Got it!">
            <img src={BittenCookieIcon} alt="Bitten Cookie" style={{ width: '40px', marginRight: '10px', marginTop: '-20px', position: 'relative', right: '600px', top: '10px' }} />
            This website uses cookies to ensure you get the best experience on our website.
        </CookieConsent>
    );
};

export default CookiePopup;
