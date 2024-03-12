import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import { BsPersonAdd, BsPersonDash, BsPersonX } from 'react-icons/bs';
import AdminSidebar from '../Admin/AdminSidebar';
import ReactPaginate from 'react-paginate';
import '../../styles/ProductsTableStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const CountryTable = () => {
    const [countryData, setCountryData] = useState([]);

    // useState per pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const location = useLocation();
    const navigate = useNavigate();

    // Funksioni per mi marr te dhenat e produkteve nga API
    const loadCountryData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/countries/get');
            if (response && response.data) {
                setCountryData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje produkt
    const deleteCountry = async (id) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this country?',
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
                                await axios.delete(`http://localhost:6001/api/countries/remove/${id}`);
                                toast.success("Country është fshirë me sukses!");
                                setTimeout(() => loadCountryData(), 500);
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
        loadCountryData();

        // Per mu shfaq "?page={pageNumber}" ne URL
        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Country Table | Page ${pageParam || 1}`;
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
                            <Link to="/addCountry" className='clickable-header'>
                                <th>Insert</th>
                            </Link>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countryData.slice(offset, offset + itemsPerPage).map((country) => (
                            <Fragment key={country.CountryId}>
                                <tr>
                                    <th scope="row">{country.CountryId}</th>
                                    <td>{country.Name}</td>
                                    <td>
                                        <Link to="/addCountry" className='clickable-header'>
                                            <button className="btn btn-User">
                                                <BsPersonAdd style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/updateCountry/${country.CountryId}`}>
                                            <button className="btn btn-edit">
                                                <BsPersonDash style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link>
                                            <button className="btn btn-delete" onClick={() => deleteCountry(country.CountryId)}>
                                                <BsPersonX style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
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
                                        pageCount={Math.ceil(countryData.length / itemsPerPage)}
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

export default CountryTable;