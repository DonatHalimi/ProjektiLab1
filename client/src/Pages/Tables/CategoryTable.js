import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsCartPlus, BsPencil, BsTrash3 } from 'react-icons/bs';
import AdminSidebar from '../Admin/AdminSidebar';
import ReactPaginate from 'react-paginate';
import '../../styles/CategoryTableStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryTable = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

    const location = useLocation();
    const navigate = useNavigate();

    // Funksioni per mi marr te dhenat e kategorive nga API
    const loadCategoryData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/category/get');
            if (response && response.data) {
                setCategoryData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje kategori
    const deleteCategory = async (CategoryId) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this category?',
                buttons: [
                    {
                        label: 'Cancel',
                        onClick: () => { },
                        className: 'cancel-btn',
                    },
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                // Send delete request to the server
                                await axios.delete(`http://localhost:6001/api/category/remove/${CategoryId}`);
                                toast.success('Kategoria është fshirë me sukses!');
                                setTimeout(() => loadCategoryData(), 500);
                            } catch (error) {
                                toast.error(`Error deleting Category entry: ${error.message}`);
                            }
                        },
                        className: 'yes-btn',
                    },
                ],
            });
        };

        confirmDialog();
    };

    useEffect(() => {
        loadCategoryData();

        // Per mu shfaq "?page={pageNumber}" ne URL
        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Categories Table | Page ${pageParam || 1}`;
    }, [location.pathname, location.search, navigate]);

    const offset = currentPage * itemsPerPage;

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        navigate(`?page=${selectedPage.selected + 1}`);
    };
    console.log(categoryData);


    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className='table-container' style={{ position: 'relative', top: '-60px' }}>
                <table className='styled-table' style={{ transform: 'scale(0.65)', position: "relative", bottom: "10px", fontSize: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EmriKategorise</th>
                            <th>FotoKategorise</th>
                            <th>
                                <Link to='/addCategory' className='clickable-header'>
                                    Insert
                                </Link>
                            </th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.slice(offset, offset + itemsPerPage).map((category) => (
                            
                            <Fragment key={category.idcategory}>
                                <tr>
                                    <th scope='row'>{category.idcategory}</th>
                                    <td>{category.EmriKategorise}</td>
                                    <td>
                                        {category.FotoKategori && (
                                            <img src={`data:image/jpeg;base64,${category.FotoKategori.toString('base64')}`} alt='Category' id='fotoSizeCategory' />
                                        )}
                                    </td>
                                    <td>
                                        <Link to='/addCategory'>
                                            <button className='btn btn-User'>
                                                <BsCartPlus style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                    <Link to={`/update/${category.idcategory}`}>
                                            <button className='btn btn-edit'>
                                                <BsPencil style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className='btn btn-delete' onClick={() => deleteCategory(category.idcategory)}>
                                            <BsTrash3 style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                        </button>
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="10">
                                <div className="pagination-container">
                                    <ReactPaginate
                                        previousLabel={'Previous'}
                                        nextLabel={'Next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(categoryData.length / itemsPerPage)}
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

export default CategoryTable;