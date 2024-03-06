import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const location = useLocation();
    const navigate = useNavigate();

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
        const pageParam = urlSearchParams.get("page");

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Ruby | Categories | Page ${pageParam || 1}`;
    }, [location.pathname, location.search, navigate]);

    const offset = currentPage * itemsPerPage;
    const currentCategories = categories.slice(offset, offset + itemsPerPage);

    return (
        <div className="categories container mx-auto flex flex-col items-center">

            <Splide
                options={{
                    fixedWidth: 200,
                    isNavigation: true,
                    gap: 10,
                    pagination: false,
                    breakpoints: {
                        600: {
                            fixedWidth: 66,
                            fixedHeight: 40,
                        },
                    },
                }}>
                {currentCategories.map((category) => (
                    <SplideSlide key={category.idcategory} className="category-item" style={{ border: '1px solid #D8CACA', margin: '8px', borderRadius: '5px', padding: '8px', textDecoration: 'none' }}>
                        <Link
                            to={`/products/${category.idcategory}`}
                            className="flex items-center p-4 border rounded-lg shadow-md transition duration-300 hover:bg-gray-100 text-black"
                        >
                            <div className="relative group bg-gray-800 rounded-md overflow-hidden shadow-lg h-full w-48">
                                <div className="h-full w-48 object-cover bg-gray-800 py-2 px-2 text-center">
                                    <h3 className="category-name">{category.EmriKategorise}</h3>
                                </div>
                            </div>
                        </Link>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default Categories;