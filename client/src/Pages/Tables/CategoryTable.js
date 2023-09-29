import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsCartPlus, BsPencil, BsTrash3 } from 'react-icons/bs';
import AdminSidebar from '../AdminSidebar';

const CategoryTable = () => {
    // State for Category data
    const [categoryData, setCategoryData] = useState([]);

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
    const deleteCategory = async (idcategory) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this Category entry?',
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
                                await axios.delete(`http://localhost:6001/api/category/remove/${idcategory}`);
                                toast.success('Category entry deleted successfully!');
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
    }, []);

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className='table-container' style={{ position: 'relative', top: '-60px' }}>
                <table className='styled-table' style={{ transform: 'scale(0.79)', fontSize: '20px' }}>
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
                        {categoryData.map((category, indexcategory) => {
                            return (
                                <Fragment key={category.idcategory}>
                                    <tr>
                                        <th scope='row'>{indexcategory + 1}</th>
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
                                            <Link to={`/updateCategory/${category.idcategory}`}>
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default CategoryTable;