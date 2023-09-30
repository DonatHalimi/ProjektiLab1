import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import { BsCartPlus, BsPencil, BsTrash3 } from 'react-icons/bs';
import AdminSidebar from '../Admin/AdminSidebar';

const ProductsTable = () => {
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    // Funksioni per mi marr te dhenat e produkteve nga API
    const loadProductsData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/product/get');
            if (response && response.data) {
                setProductData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje produkt
    const deleteProduct = async (id) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this product?',
                buttons: [
                    {
                        label: 'Cancel',
                        onClick: () => { },
                        className: 'cancel-btn'
                    },
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                // Dergojme kerkesen per fshirje ne server
                                await axios.delete(`http://localhost:6001/api/product/remove/${id}`);
                                toast.success("Produkti është fshirë me sukses!");
                                setTimeout(() => loadProductsData(), 500);
                            } catch (error) {
                                toast.error(`Error deleting product: ${error.message}`);
                            }
                        },
                        className: 'yes-btn'
                    }
                ]
            });
        };

        confirmDialog();
    }

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get('http://localhost:6001//api/categories/get');
            console.log('Category Data:', response.data); // Add this line
            if (response && response.data) {
                setCategoryData(response.data);
            } else {
                console.log('API endpoint did not return any category data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryNameById = (categoryId) => {
        const category = categoryData.find((cat) => cat.idcategory === categoryId);
        return category ? category.EmriKategorise : '';
    };

    useEffect(() => {
        loadProductsData();
        fetchCategoryData();
    }, []);

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className="table-container">
                <table className='styled-table' style={{ transform: 'scale(0.70)', position: 'relative', bottom: '560px', overflowY: 'auto', fontSize: '17px', marginBottom: "300px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Emri</th>
                            <th>Çmimi</th>
                            <th>Valuta</th>
                            <th>Kategoria</th>
                            <th>Detajet</th>
                            <th>Foto</th>
                            <th>
                                <Link to="/addProduct" className="clickable-header">
                                    Insert
                                </Link>
                            </th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product, indexproduct) => {
                            return (
                                <Fragment key={product.id}>
                                    <tr>
                                        <th scope="row">{indexproduct + 1}</th>
                                        <td>{product.Emri}</td>
                                        <td>{product.Cmimi}</td>
                                        <td>{product.Valuta}</td>
                                        <td>{getCategoryNameById(product.idcategory)}</td>
                                        <td style={{ textAlign: 'justify' }}>{product.Detajet}</td>
                                        <td>
                                            {product.Foto && (
                                                <img
                                                    src={`data:image/jpeg;base64,${product.Foto}`}
                                                    alt="Product"
                                                    id="fotoSizeProduct"
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <Link to="/addProduct">
                                                <button className="btn btn-User">
                                                    <BsCartPlus style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/updateProduct/${product.id}`}>
                                                <button className="btn btn-edit">
                                                    <BsPencil style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link>
                                                <button className="btn btn-delete" onClick={() => deleteProduct(product.id)}>
                                                    <BsTrash3 style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsTable;
