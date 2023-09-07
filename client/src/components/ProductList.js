import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import '../styles/ProductListStyle.css';

const ProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("Category ID:", categoryId);

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

    return (
        <div>
            <h2 id="header">Products in this Category</h2>
            <Navbar />
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;