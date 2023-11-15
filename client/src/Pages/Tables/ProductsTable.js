import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import { BsCartPlus, BsPencil, BsTrash3 } from 'react-icons/bs';
import AdminSidebar from '../Admin/AdminSidebar';
import ReactPaginate from 'react-paginate';
import '../../styles/ProductsTableStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsTable = () => {
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    // useState per pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const location = useLocation();
    const navigate = useNavigate();

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
            console.log('Category Data:', response.data);
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

        // Per mu shfaq "?page={pageNumber}" ne URL
        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Products Table | Page ${pageParam || 1}`;
    }, [location.pathname, location.search, navigate]);

    const offset = currentPage * itemsPerPage;

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        navigate(`?page=${selectedPage.selected + 1}`);
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className="table-container products-table">
                <table className='styled-table products-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Emri</th>
                            <th>Çmimi</th>
                            <th>Valuta</th>
                            <th>Kategoria</th>
                            <th>Detajet</th>
                            <th>Foto</th>
                            <th>Insert</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.slice(offset, offset + itemsPerPage).map((product, indexproduct) => {
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

                    <tfoot>
                        <tr>
                            <td colSpan="10">
                                <div className="pagination-container">
                                    <ReactPaginate
                                        previousLabel={'Previous'}
                                        nextLabel={'Next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(productData.length / itemsPerPage)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                        initialPage={currentPage}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default ProductsTable;