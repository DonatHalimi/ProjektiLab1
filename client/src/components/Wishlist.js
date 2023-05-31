import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/wishlist-context';
import Navbar from './Navbar';
import WishlistItem from './wishlist-items';

const Wishlist = () => {
    const { items, removeItemFromWishlist } = useContext(WishlistContext);

    return (
        <>
            <Navbar />

            <div>
                <h1>Wishlist</h1>
                {items.length > 0 ? (
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <WishlistItem id={item.id} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='noItemsInWishlist'>
                        <img src="https://elegantjewelersli.com/assets/images/empty-wishlist.png" alt="Empty Wishlist" />
                        <p>Lista juaj e deshirave eshte e zbrazet!</p>
                        <Link to="/">Kthehu ne faqen kryesore</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Wishlist;
