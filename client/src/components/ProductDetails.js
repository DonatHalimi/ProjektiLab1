import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BsArrowsAngleContract } from "react-icons/bs";
import "../styles/ProductDetailsStyle.css";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [Emri, setEmri] = useState("");
    const [Cmimi, setCmimi] = useState(null);
    const [Valuta, setValuta] = useState("");
    const [Detajet, setDetajet] = useState("");
    const [Foto, setFoto] = useState("");
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);

    const [showAlertCart, setShowAlertCart] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

    const handleAddToCart = () => {
        cart.addOneToCart(id);
        setShowAlertCart(true);

        setTimeout(() => {
            setShowAlertCart(false);
        }, 5000);
    };

    const handleAddToWishlist = () => {
        wishlist.addItemToWishlist(id);

        setShowAlertWishlist(true);

        setTimeout(() => {
            setShowAlertWishlist(false);
        }, 5000);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:6001/api/product/get/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const product = data[0];
                console.log("Fetched product data:", data);
                setProduct(data);
                setEmri(product.Emri)
                setCmimi(product.Cmimi);
                setValuta(product.Valuta);
                setDetajet(product.Detajet);
                setFoto(product.Foto)
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const byteArray = new Uint8Array(Foto.data);
    const binaryString = byteArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binaryString);

    return (
        <>
            {!isImageEnlarged && (
                <Navbar />
            )}

            <div className='details-outer-container'>
                <div className='details-container'>
                    {isImageEnlarged ? (
                        <div className="product-image">
                            <div className="cardImg">
                                <img
                                    src={`data:image/jpeg;base64,${base64String}`}
                                    alt="Product"
                                    id="product-photo"
                                    className="enlarged-image"
                                    onClick={() => setIsImageEnlarged(!isImageEnlarged)}
                                />
                                <div className="close-icon" onClick={() => setIsImageEnlarged(false)}>
                                    <BsArrowsAngleContract />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="product-image">
                            <div className="cardImg">
                                <img
                                    src={`data:image/jpeg;base64,${base64String}`}
                                    alt="Product"
                                    id="product-photo"
                                    className={isImageEnlarged ? 'enlarged-image' : ''}
                                    onClick={() => setIsImageEnlarged(!isImageEnlarged)}
                                />
                            </div>
                        </div>
                    )}
                </div>


                {/* isImageEnlarged kontrollon nese fotoja eshte e rritur, nese po nuk shfaqen infot e produktit */}
                {!isImageEnlarged && (
                    <div className="product-info">
                        <h2 id='product-name'>{Emri}</h2>
                        <p id="product-price">
                            {Valuta}{Cmimi}
                        </p>
                        <p id='product-details'>{Detajet}</p>
                    </div>
                )}

                {/* isImageEnlarged kontrollon nese fotoja eshte e rritur, nese po nuk shfaqen butonat */}
                {!isImageEnlarged && (
                    <div className="product-buttons">
                        <button className="cartButton" onClick={handleAddToCart} title='Add To Cart'>
                            <AiOutlineShoppingCart style={{ color: "black", fontSize: "18px", position: "relative", top: "2.3px" }} />
                        </button>
                        <button className="wishlistButton" onClick={handleAddToWishlist} title='Add To Wishlist'>
                            <AiOutlineHeart style={{ color: "black", fontSize: "18px", fontWeight: "normal", position: "relative", top: "2.3px" }} />
                        </button>
                    </div>
                )}
            </div>

            {/* Thirrja e funksionit per me shfaq mesazhin e konfirmimit te shtimit te produktit ne Cart & Wishlist */}
            {showAlertCart && (
                <div className="alertCart">
                    <Link to="/Cart" className="cartLink">
                        <p>Produkti është shtuar në shportë me sukses!</p>
                    </Link>
                    <button className="cancelPopupButtonCart" onClick={() => setShowAlertCart(false)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            {showAlertWishlist && (
                <div className="alertWishlist">
                    <Link to="/Wishlist" className="wishlistLink">
                        <p>Produkti është shtuar në wishlist me sukses!</p>
                    </Link>
                    <button className="cancelPopupButtonWishlist" onClick={() => setShowAlertWishlist(false)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            <div style={{ height: "100px" }}></div>

            {/* isImageEnlarged kontrollon nese fotoja eshte e rritur, nese po nuk shfaqet footeri */}
            {!isImageEnlarged && (
                <Footer />
            )}

        </>
    );
}

export default ProductDetails;