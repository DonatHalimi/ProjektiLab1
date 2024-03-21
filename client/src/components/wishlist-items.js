import React, { useContext } from 'react';
import { WishlistContext } from '../context/wishlist-context';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/shop-context';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import '../styles/WishlistItemsStyle.css';
import '../styles/ProductStyle.css'
import { toast } from 'react-toastify';

function WishlistItem(props) {
    const wishlist = useContext(WishlistContext);
    const cart = useContext(ShopContext);
    const { products } = props;

    const navigate = useNavigate();

    const id = props.id;
    const product = products.find((product) => product.id === id);

    if (!product) {
        <div>Loading...</div>
        return null;
    }

    const handleAddOneToCart = () => {
        cart.addOneToCart(product.id);

        toast.success('Produkti është shtuar në shportë!', {
            position: 'top-right',
            style: {
                marginTop: '70px',
                cursor: 'pointer',
                transition: 'opacity 2s ease-in',
            },
            onClick() {
                navigate("/Cart");
            }
        }, 50);
    };

    const handleRemoveFromWishlist = () => {
        wishlist.removeItemFromWishlist(product.id);

        toast.success('Produkti është larguar nga wishlist!', {
            position: 'top-right',
            style: {
                marginTop: '70px',
                cursor: 'pointer',
                transition: 'opacity 2s ease-in',
            },
        }, 50);
    };

    // Renderimi i HTML formes per shfaqjen e Adminit dashboard
    return (
        <>
            <div className="product-container" style={{ marginBottom: "-250px", marginRight: "10px" }}>
                <div className="product" key={product.id}>
                    <div className="card">
                        <Link to={`/product/${product.id}`} className="product-details-link">

                            <div className="cardImg">
                                <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Product" id='photo' />
                            </div>
                            <div className="card_header">
                                <h3>{product.Emri}</h3>
                                <p className="price">{product.Valuta}{product.Cmimi}</p>
                            </div>
                        </Link>

                        {/* Butonat per me shtu produktin ne Cart & Wishlist */}
                        <button className="cartButton" onClick={handleAddOneToCart} title='Add To Cart'>
                            <AiOutlineShoppingCart style={{ color: "black", fontSize: "18px" }} />
                        </button>

                        <button className="wishlistButton" onClick={handleRemoveFromWishlist} title='Remove From Wishlist'>
                            <BsTrash3 style={{ color: "black", fontSize: "18px", fontWeight: "normal" }} />
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default WishlistItem;