import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ReactPaginate from "react-paginate";
import "../styles/CategoriesStyle.css";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const pageCount = Math.ceil(categories.length / itemsPerPage);
    const location = useLocation();
    const navigate = useNavigate();

    // Krijimi i nje useEffect per t'i marre kategorite nga databaza
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:6001/api/category/get");

                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();

        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        // Set document title with page number
        document.title = `Ruby | Categories | Page ${pageParam || 1}`;
    }, [location.pathname, location.search, navigate]);

    console.log("Categories:", categories);

    const offset = currentPage * itemsPerPage;
    const currentCategories = categories.slice(offset, offset + itemsPerPage);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="categories-container">
            <Navbar />

            <ul className="categories-list">
                {currentCategories.map((category) => (
                    <li key={category.idcategory} className="category-item">
                        <Link to={`/products/${category.idcategory}`} className="category-link">
                            <h3 className="category-name">{category.EmriKategorise}</h3>
                            {category.FotoKategori && (
                                <img src={`data:image/jpeg;base64,${category.FotoKategori}`} alt={category.EmriKategorise} className="category-image" />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

            {categories.length > 0 && (
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

            <div style={{ height: "350px" }}></div>

            <Footer />
        </div>
    );
};

export default Categories;