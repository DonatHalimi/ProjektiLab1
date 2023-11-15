import React, { useState, useEffect } from "react";
import Product from "./Product";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import "../styles/HomeStyle.css";

async function fetchSliderData(setSliderData) {
    try {
        const response = await fetch("http://localhost:6001/api/slider/get");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSliderData(data);
    } catch (error) {
        console.error("Error fetching slider data:", error);
    }
}

// Deklarimi i funksionit Home
function Home() {
    const [products, setProducts] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 15;
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const location = useLocation();
    const navigate = useNavigate();

    // Krijimi i nje funksioni per te marr te dhenat e produkteve nga databaza
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
        fetchSliderData(setSliderData);

        document.title = "Ruby | Home";

        // Per mu shfaq "?page={pageNumber}" ne URL
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

    return (
        <>
            {/* Thirrja e komponenteve te Navbar dhe Slider */}
            <Navbar />
            <Slider data={sliderData} />

            {/* Krijimi i kartes se produkteve ne Home page */}
            <div>
                <div className="main-content">
                    {/* Render a Product component for each item in the currentProducts array */}
                    {currentProducts.map((product) => (
                        <div key={product.id} className="products-container">
                            <Product product={product} />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
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
            </div>

            <div className="empty-div"></div>

            <Footer />
        </>
    );
}

export default Home;