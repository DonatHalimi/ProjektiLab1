import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BsArrowsAngleContract } from "react-icons/bs";
import "../styles/ProductDetailsStyle.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [Emri, setEmri] = useState("");
    const [Cmimi, setCmimi] = useState(null);
    const [Valuta, setValuta] = useState("");
    const [Detajet, setDetajet] = useState("");
    const [Foto, setFoto] = useState("");
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    const [brand, setBrand] = useState(null);
    const [supplier, setSupplier] = useState(null);

    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);
    const navigate = useNavigate();

    document.title = Emri + " Details";

    // Scroll to top on component render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleEnlargedPicture = () => {
        setIsImageEnlarged(!isImageEnlarged);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isImageEnlarged) {
                toggleEnlargedPicture();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isImageEnlarged, toggleEnlargedPicture]);

    const handleAddToCart = () => {
        // Check if the user is logged in
        const isLoggedIn = AuthService.getCurrentUser();

        if (!isLoggedIn) {
            // Inform the user and redirect to login page
            toast.info('You need to be logged in to add items to cart!', {
                position: 'top-right',
                style: {
                    marginTop: '70px',
                    cursor: 'pointer',
                    transition: 'opacity 2s ease-in',
                },
            });
            navigate('/login');
            return;
        }
        // If user is logged in, add the product to the cart
        cart.addOneToCart(id);

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

    const handleAddToWishlist = () => {
        // Check if the user is logged in
        const isLoggedIn = AuthService.getCurrentUser();

        if (!isLoggedIn) {
            // Inform the user and redirect to login page
            toast.info('You need to be logged in to add items to wishlist!', {
                position: 'top-right',
                style: {
                    marginTop: '70px',
                    cursor: 'pointer',
                    transition: 'opacity 2s ease-in',
                },
            });
            navigate('/login');
            return;
        }

        // If user is logged in, add the product to the wishlist
        wishlist.addItemToWishlist(id);

        setTimeout(() => {
            toast.success('Produkti është shtuar në wishlist!', {
                position: 'top-right',
                style: {
                    marginTop: '70px',
                    cursor: 'pointer',
                    transition: 'opacity 2s ease-in',
                },
                onClick: () => {
                    navigate('/Wishlist');
                },
            });
        }, 50);
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

    useEffect(() => {
        const fetchBrandAndSupplier = async () => {
            try {
                // Fetch brand data
                const brandResponse = await fetch(`http://localhost:6001/api/product/brand/${id}`);
                const brandData = await brandResponse.json();
                console.log("Brand Data:", brandData);

                // Fetch supplier data
                const supplierResponse = await fetch(`http://localhost:6001/api/product/supplier/${id}`);
                const supplierData = await supplierResponse.json();
                console.log("Supplier Data:", supplierData);

                setBrand(brandData);
                setSupplier(supplierData);
            } catch (error) {
                console.error("Error fetching brand and supplier:", error);
            }
        };

        fetchBrandAndSupplier();
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

            {!isImageEnlarged && (
                <div className='brand-supplier-container'>
                    <div className="brand-info">
                        <h3>Brand Information</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{brand && brand.length > 0 ? brand[0].Name : '-'}</td>
                                </tr>
                                <tr>
                                    <td>Description:</td>
                                    <td>{brand && brand.length > 0 ? brand[0].Description : '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="supplier-info">
                        <h3>Supplier Information</h3>
                        <table>

                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{supplier && supplier.length > 0 ? supplier[0].Name : '-'}</td>
                                </tr>
                                <tr>
                                    <td>Phone:</td>
                                    <td>{supplier && supplier.length > 0 ? supplier[0].Phone : '-'}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{supplier && supplier.length > 0 ? supplier[0].Address : '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* isImageEnlarged kontrollon nese fotoja eshte e rritur, nese po nuk shfaqet footeri */}
            {!isImageEnlarged && <Footer />}
        </>
    );
}

export default ProductDetails;