import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Slider from "./Slider";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import Footer from "./Footer";
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../styles/ProductListStyle.css';
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa";

function ProductList(props) {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortOrder, setSortOrder] = useState("relevance");
    const [category, setCategory] = useState("Unknown Category");
    const itemsPerPage = 5;

    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:6001/api/product/get-by-category/${categoryId}`);
                let products = response.data;

                setProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCategoryNames = async () => {
            try {
                const categoryResponse = await axios.get("http://localhost:6001/api/category/get");
                const categoryNamesData = categoryResponse.data.reduce((acc, category) => {
                    acc[category.idcategory] = category.EmriKategorise;
                    return acc;
                }, {});
                setCategory(categoryNamesData[categoryId] || "Unknown Category");
            } catch (error) {
                console.error("Error fetching category names:", error);
            }
        };

        fetchCategoryNames();
        fetchProducts();
    }, [categoryId]);

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

    useEffect(() => {
        document.title = `Ruby | ${category}`;
    }, [category]);

    useEffect(() => {
        if (sortOrder !== null) {
            sortProducts();
        }
    }, [sortOrder]);

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const sortProducts = () => {
        let sortedProducts;

        const productsArray = [...products];

        if (sortOrder === "titleAsc") {
            sortedProducts = productsArray.sort((a, b) => a.Emri.localeCompare(b.Emri));
        } else if (sortOrder === "titleDesc") {
            sortedProducts = productsArray.sort((a, b) => b.Emri.localeCompare(a.Emri));
        } else if (sortOrder === "priceAsc") {
            sortedProducts = productsArray.sort((a, b) => a.Cmimi - b.Cmimi);
        } else if (sortOrder === "priceDesc") {
            sortedProducts = productsArray.sort((a, b) => b.Cmimi - a.Cmimi);
        } else if (sortOrder === "relevance") {
            sortedProducts = productsArray;
        }
        setProducts(sortedProducts);
    };

    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentProducts = products.slice(offset, offset + itemsPerPage);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Slider />

            <div className="container mx-auto px-4">
                <div className="mt-4">
                    <button onClick={handleGoBack} className="goBack">
                        <FaArrowLeft />
                    </button>
                </div>
                <h2 className="text-3xl font-bold mt-4" id="header">{category}</h2>
                <Navbar />

                <div className="sort-container">
                    <select
                        className="select-box appearance-none focus:outline-none cursor-pointer"
                        style={{ marginBottom: '-100px', marginLeft: '1100px', width: '230px', }}
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                    >
                        <option selected hidden>Sort by</option>
                        <option value="titleAsc">Title: A-Z</option>
                        <option value="titleDesc">Title: Z-A</option>
                        <option value="priceAsc">Price: Lowest to Highest</option>
                        <option value="priceDesc">Price: Highest to Lowest</option>
                    </select>
                </div>

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
