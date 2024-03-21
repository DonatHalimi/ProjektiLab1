import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/wishlist-context';
import Navbar from './Navbar';
import WishlistItem from './wishlist-items';
import Footer from '../components/Footer';
import EmptyWishlist from "../img/empty-wishlist.png";
import '../styles/WishlistItemsStyle.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {

    // Merr kontekstin e dyqanit nga komponenti ShopContext
    const { items, removeItemFromWishlist } = useContext(WishlistContext);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Krijimi i nje funksioni per te kerkuar te dhenat nga API i produktit
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:6001/api/product/get");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();

        document.title = "Ruby | Wishlist";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleRemoveFromWishlist = (id) => {
        removeItemFromWishlist(id);

        toast.success('Produkti është shtuar në shportë!', {
            position: 'top-right',
            style: {
                marginTop: '70px',
                cursor: 'pointer',
                transition: 'opacity 2s ease-in',
            },
            onClick: () => {
                navigate('/Cart');
            },
        }, 50);
    };

    // Renderimi i HTML formes per shfaqjen e Wishlist
    return (
        <>
            <Navbar />
            <div className='main-content-wishlist'>
                <h1 style={{ position: "relative", top: "50px", opacity: "0" }}>Wishlist</h1>
                {items.length > 0 ? (
                    <div className='wishlist-items' style={{ paddingTop: "50px", paddingBottom: "200px", marginTop: "140px", marginBottom: "200px", gap: "100px" }}>
                        {items.map((item) => (
                            <div key={item.id} className='wishlist-item'>
                                <WishlistItem id={item.id} products={products} onRemoveFromWishlist={() => handleRemoveFromWishlist(item.id)} key={item.id} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='noItemsInWishlist'>
                        <img src={EmptyWishlist} alt="Empty Wishlist" />
                        <p>Ju nuk keni ndonjë produkt në listën e dëshirave.</p>
                        <Link to="/">Kthehu në faqen kryesore</Link>
                    </div>
                )}
            </div>

            <div style={{ height: '550px' }}></div>

            <Footer />
        </>
    );
};

export default Wishlist;