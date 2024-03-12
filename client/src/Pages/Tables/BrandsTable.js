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

const BrandsTable = () => {
    const [brandsData, setBrandsData] = useState([]);
    const [countryData, setCountryData] = useState([]);

    // useState per pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const location = useLocation();
    const navigate = useNavigate();

    // Funksioni per mi marr te dhenat e produkteve nga API
    const loadBrandsData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/brands/get');
            if (response && response.data) {
                setBrandsData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje produkt
    const deleteBrand = async (id) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this brand?',
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
                                await axios.delete(`http://localhost:6001/api/brands/remove/${id}`);
                                toast.success("Brand është fshirë me sukses!");
                                setTimeout(() => loadBrandsData(), 500);
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

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get('http://localhost:6001/api/countries/get');

                if (response && response.data) {
                    setCountryData([...response.data]);
                } else {
                    console.log('API endpoint did not return any data');
                }
            } catch (error) {
                console.log('Error fetching country data:', error);
            }
        };

        fetchCountryData();
    }, []);

    useEffect(() => {
        loadBrandsData();
    }, []);

    const getCountryNameById = (countryId) => {
        try {
            const country = countryData.find((country) => country.CountryId === countryId);
            return country ? country.Name : '';
        } catch (error) {
            console.log('Error in getCountryNameById:', error);
            return '';
        }
    };

    useEffect(() => {
        // Per mu shfaq "?page={pageNumber}" ne URL
        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Brands Table | Page ${pageParam || 1}`;
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
                            <th>Description</th>
                            <th>Country</th>
                            <Link to="/addBrand" className='clickable-header'>
                                <th>Insert</th>
                            </Link>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandsData.slice(offset, offset + itemsPerPage).map((brand) => {
                            return (
                                <Fragment key={brand.BrandId}>
                                    <tr>
                                        <th scope="row">{brand.BrandId}</th>
                                        <td>{brand.Name}</td>
                                        <td>{brand.Description}</td>
                                        <td>{getCountryNameById(brand.idcountry)}</td>
                                        <td>
                                            <Link to="/addBrand">
                                                <button className="btn btn-User">
                                                    <BsCartPlus style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/updateBrand/${brand.BrandId}`}>
                                                <button className="btn btn-edit">
                                                    <BsPencil style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link>
                                                <button className="btn btn-delete" onClick={() => deleteBrand(brand.BrandId)}>
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
                                        pageCount={Math.ceil(brandsData.length / itemsPerPage)}
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

export default BrandsTable;