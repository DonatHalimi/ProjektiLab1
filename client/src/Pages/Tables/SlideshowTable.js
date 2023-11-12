import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsCartPlus, BsPencil, BsTrash3 } from 'react-icons/bs';
import "../../styles/AddEditStyle.css"
import AdminSidebar from '../Admin/AdminSidebar';
import ReactPaginate from 'react-paginate';
import '../../styles/SlideshowTableStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const SlideshowTable = () => {
    const [slideshowData, setSlideshowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;

    const location = useLocation();
    const navigate = useNavigate();

    // Funksioni per mi marr te dhenat e slideshow nga API
    const loadSlideshowData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/slideshow/get');
            if (response && response.data) {
                setSlideshowData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje slideshow item
    const deleteSlideshow = async (idslideshow) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this Slideshow entry?',
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
                                await axios.delete(`http://localhost:6001/api/slideshow/remove/${idslideshow}`);
                                toast.success('Slideshow entry deleted successfully!');
                                setTimeout(() => loadSlideshowData(), 500);
                            } catch (error) {
                                toast.error(`Error deleting Slideshow entry: ${error.message}`);
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
        loadSlideshowData();

        // Per mu shfaq "?page={pageNumber}" ne URL
        const urlSearchParams = new URLSearchParams(location.search);
        const pageParam = urlSearchParams.get('page');

        if (!pageParam) {
            navigate(`${location.pathname}?page=1`);
        }

        document.title = `Slideshow Table | Page ${pageParam || 1}`;
    }, [location.pathname, location.search, navigate]);

    const offset = currentPage * itemsPerPage;

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        navigate(`?page=${selectedPage.selected + 1}`);
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className='table-container' style={{ position: 'relative', top: '-90px' }}>
                <table className='styled-table' style={{ transform: 'scale(0.60)', position: "relative", top: "10px", fontSize: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EmriFoto</th>
                            <th>Foto</th>
                            <th>
                                <Link to='/addSlideshow' className='clickable-header'>
                                    Insert
                                </Link>
                            </th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slideshowData.slice(offset, offset + itemsPerPage).map((slideshow, indexslideshow) => (
                            <Fragment key={slideshow.idslideshow}>
                                <tr>
                                    <th scope='row'>{indexslideshow + 1}</th>
                                    <td>{slideshow.EmriFoto}</td>
                                    <td>
                                        {slideshow.Foto && (
                                            <img src={`data:image/jpeg;base64,${slideshow.Foto.toString('base64')}`} alt='Slideshow' id='fotoSizeSlideshow' />
                                        )}
                                    </td>
                                    <td>
                                        <Link to='/addSlideshow'>
                                            <button className='btn btn-User'>
                                                <BsCartPlus style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/updateSlideshow/${slideshow.idslideshow}`}>
                                            <button className='btn btn-edit'>
                                                <BsPencil style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className='btn btn-delete' onClick={() => deleteSlideshow(slideshow.idslideshow)}>
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
                                        pageCount={Math.ceil(slideshowData.length / itemsPerPage)}
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

export default SlideshowTable;
