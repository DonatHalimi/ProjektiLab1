import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import { BsPlusLg, BsPencil, BsTrash3 } from 'react-icons/bs';
import AdminSidebar from '../Admin/AdminSidebar';
import ReactPaginate from 'react-paginate';
import '../../styles/ProductsTableStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const SuppliersTable = () => {
    const [supplierData, setSupplierData] = useState([]);

    // useState per pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const location = useLocation();
    const navigate = useNavigate();

    // Funksioni per mi marr te dhenat e produkteve nga API
    const loadSupplierData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/suppliers/get');
            if (response && response.data) {
                setSupplierData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje produkt
    const deleteSupplier = async (id) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this supplier?',
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
                                await axios.delete(`http://localhost:6001/api/suppliers/remove/${id}`);
                                toast.success("Supplier është fshirë me sukses!");
                                setTimeout(() => loadSupplierData(), 500);
                            } catch (error) {
                                toast.error(`Error deleting supplier: ${error.message}`);
                            }
                        },
                        className: 'yes-btn'
                    }
                ]
            });
        };

        confirmDialog();
    }

    useEffect(() => {
        loadSupplierData();

        // Per mu shfaq "?page={pageNumber}" ne URL
        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Suppliers Table | Page ${pageParam || 1}`;
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
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <Link to="/addSupplier" className='clickable-header'>
                                <th>Insert</th>
                            </Link>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplierData.slice(offset, offset + itemsPerPage).map((supplier) => (
                            <Fragment key={supplier.SupplierId}>
                                <tr>
                                    <th scope="row">{supplier.SupplierId}</th>
                                    <td>{supplier.Name}</td>
                                    <td>{supplier.Phone}</td>
                                    <td>{supplier.Address}</td>
                                    <td>
                                        <Link to="/addSupplier" className='clickable-header'>
                                            <button className="btn btn-User">
                                                <BsPlusLg style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/updateSupplier/${supplier.SupplierId}`}>
                                            <button className="btn btn-edit">
                                                <BsPencil style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link>
                                            <button className="btn btn-delete" onClick={() => deleteSupplier(supplier.SupplierId)}>
                                                <BsTrash3 style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
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
                                        pageCount={Math.ceil(supplierData.length / itemsPerPage)}
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

export default SuppliersTable;