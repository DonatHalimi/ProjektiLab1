import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Slider from "./Slider";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import Footer from "./Footer";
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import '../styles/ProductListStyle.css';

// Funksioni per shfaqjen e produkteve per nje kategori te caktuar
function ProductList(props) {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    // const product = props.product;
    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);

    const [showAlertCart, setShowAlertCart] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

    useEffect(() => {
        console.log("Category ID:", categoryId);

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:6001/api/products/get-by-category/${categoryId}`);
                console.log("Response:", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    // Funksioni qe shton nje produkt ne shporte
    const handleAddToCart = (productID) => {
        cart.addOneToCart(productID);
        setShowAlertCart(true);

        setTimeout(() => {
            setShowAlertCart(false);
        }, 5000);
    };

    // Funksioni qe shton nje produkt ne listen e deshirave
    const handleAddToWishlist = (productID) => {
        wishlist.addItemToWishlist(productID);

        setShowAlertWishlist(true);

        setTimeout(() => {
            setShowAlertWishlist(false);
        }, 5000);
    };

    const getCategoryNameById = (categoryId) => {
        switch (categoryId) {
            case "5":
                return "Jeans";
            case "6":
                return "T-Shirts";
            case "7":
                return "Hoodies";
            case "8":
                return "Jackets";
            case "9":
                return "Sweatshirts";
            default:
                return "Unknown Category";
        }
    };

    return (
        <>

            <Slider />
            <div>
                <h2 id="header">{getCategoryNameById(categoryId)}</h2>

                <Navbar />
                <div className="product-container-category">
                    {products.length > 0 ? (
                        products.map((product) => (
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
                                    <button className="cartButton" onClick={() => handleAddToCart(product.id)} title='Add To Cart'>
                                        <AiOutlineShoppingCart style={{ color: "black", fontSize: "18px" }} />
                                    </button>
                                    <button className="wishlistButton" onClick={() => handleAddToWishlist(product.id)} title='Add To Wishlist'>
                                        <AiOutlineHeart style={{ color: "black", fontSize: "18px", fontWeight: "normal" }} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='noItemsInCategory'>
                            <p>Nuk ka produkte të disponueshme për këtë kategori.</p>
                            <Link to="/">Kthehu në faqen kryesore</Link>
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

                <div style={{ height: "300px" }}></div>


                <Footer />
            </div>
        </>
    )
}
export default ProductList;