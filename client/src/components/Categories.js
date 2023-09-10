import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../styles/CategoriesStyle.css";
import Footer from "./Footer";

const Categories = () => {
    const [categories, setCategories] = useState([]);

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
    }, []);

    return (
        <div className="categories-container">
            <Navbar />

            <h2 className="categories-heading">Categories</h2>
            <ul className="categories-list">
                {categories.map((category) => (
                    <li key={category.idcategory} className="category-item">

                        <Link to={`/products/${category.idcategory}`} className="category-link">
                            <h3 className="category-name">{category.EmriKategorise}</h3>
                            {category.FotoKategori && (
                                <img src={`data:image/jpeg;base64,${category.FotoKategori}`} alt={category.EmriKategorise} className="category-image"
                                />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

            <div style={{height: "400px"}}></div>

            <Footer />
        </div>
    );
};

export default Categories;