import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Slider from "./Slider";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import Footer from "./Footer";
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../styles/ProductListStyle.css';
import { toast } from 'react-toastify';

function ProductList(props) {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);

    const [showAlertCart, setShowAlertCart] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:6001/api/products/get-by-category/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    const offset = currentPage * itemsPerPage;
    const currentProducts = products.slice(offset, offset + itemsPerPage);

    const handleAddToCart = (productId) => {
        cart.addOneToCart(productId);
    
        setTimeout(() => {
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
          });
        }, 50);
      };
    
      const handleAddToWishlist = (productId) => {
        wishlist.addItemToWishlist(productId);
    
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

    useEffect(() => {
        const category = getCategoryNameById(categoryId);
        document.title = "Ruby | " + category;
    }, [categoryId]);

    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);

        navigate(`?page=${selectedPage.selected + 1}`);
    };

    return (
        <>
            <Slider />
            <div>
                <h2 id="header">{getCategoryNameById(categoryId)}</h2>
                <Navbar />
                <div className="product-container-category">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
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

                <div className="pagination-container" style={{ marginTop: "-25px" }}>
                    {currentProducts.length > 0 && (
                        < ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            initialPage={currentPage}
                            forcePage={currentPage}
                        />
                    )}
                </div>

                <div style={{ height: "300px" }}></div>

                <Footer />
            </div >
        </>
    );
}

export default ProductList;
