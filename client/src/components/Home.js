import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import "../styles/HomeStyle.css";
import Categories from "./Categories";

function Home() {
    const [products, setProducts] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortOrder, setSortOrder] = useState("relevance");
    const itemsPerPage = 15;
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const location = useLocation();
    const navigate = useNavigate();

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

        const fetchSlider = async () => {
            try {
                const response = await fetch("http://localhost:6001/api/slideshow/get");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setSliderData(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
        fetchSlider();

        document.title = "Ruby | Home";

        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Home | Page ${pageParam || 1}`;
    }, [location.pathname, location.search, navigate]);

    const offset = currentPage * itemsPerPage;
    const currentProducts = products.slice(offset, offset + itemsPerPage);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        navigate(`?page=${selectedPage.selected + 1}`);
    };

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

    return (
        <>
            <Navbar />

            <div className="slider-content">
                <div key={sliderData.id} className="slider-container">
                    <Slider sliderData={sliderData} />
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16 flex flex-col items-center">
                <Categories />

                <div className="sort-container">
                    <select
                        className="select-box appearance-none focus:outline-none cursor-pointer"
                        style={{ marginTop: '60px', marginBottom: '-70px', marginLeft: '1100px', width: '230px', }}
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
            </div>

            <div>
                <h1 className="products-header">Products</h1>
                {products.length > 0 ? (
                    <div className="main-content">
                        {currentProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p>Sorry, there are no available products at the moment.</p>
                )}

                {products.length > 0 && (
                    <div className="pagination-container" style={{ marginTop: "30px" }}>
                        <ReactPaginate
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
                        />
                    </div>
                )}
            </div>

            <div className="empty-div"></div>

            <Footer />
        </>
    );
}

export default Home;
