import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/wishlist-context';
import Navbar from './Navbar';
import WishlistItem from './wishlist-items';
import Footer from '../components/Footer';

const Wishlist = () => {

    // Merr kontekstin e dyqanit nga komponenti ShopContext
    const { items, removeItemFromWishlist } = useContext(WishlistContext);
    const [showAlertRemove, setShowAlertRemove] = useState(false);

    const handleRemoveFromWishlist = (id) => {
        removeItemFromWishlist(id);

        setShowAlertRemove(true);
        setTimeout(() => {
            setShowAlertRemove(false);
        }, 5000);
    };
    return (
        <>
            <Navbar />

            <div>

                {showAlertRemove && (
                    <div className="alertRemove">
                        <p>Produkti është larguar nga wishlist me sukses!</p>
                        <button className="cancelPopupButtonRemove" onClick={() => setShowAlertRemove(false)}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                )}

                <h1>Wishlist</h1>
                {items.length > 0 ? (
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <WishlistItem id={item.id} onRemoveFromWishlist={() => handleRemoveFromWishlist(item.id)} key={item.id} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='noItemsInWishlist'>
                        <img src="https://elegantjewelersli.com/assets/images/empty-wishlist.png" alt="Empty Wishlist" />
                        <p>Ju nuk keni ndonjë produkt në listën e dëshirave.</p>
                        <Link to="/">Kthehu në faqen kryesore</Link>
                    </div>
                )}
            </div>

            <div style={{ height: '600px' }}></div>

            <Footer />
        </>
    );
};

export default Wishlist;