import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsPlusLg, BsPencil, BsTrash3 } from 'react-icons/bs';
import AdminSidebar from '../Admin/AdminSidebar';

const AboutUsTable = () => {
    // State for About Us data
    const [aboutUsData, setAboutUsData] = useState([]);

    // Funksioni per mi marr te dhenat e aboutus nga API
    const loadAboutUsData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/aboutus/get');
            if (response && response.data) {
                setAboutUsData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire te dhenat e aboutus
    const deleteAboutUs = async (idaboutus) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this About Us entry?',
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
                                await axios.delete(`http://localhost:6001/api/aboutus/remove/${idaboutus}`);
                                toast.success('About Us entry deleted successfully!');
                                setTimeout(() => loadAboutUsData(), 500);
                            } catch (error) {
                                toast.error(`Error deleting About Us entry: ${error.message}`);
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
        loadAboutUsData();
    }, []);

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className='table-container' style={{ position: 'fixed', top: '100px' }}>
                <table className='styled-table' style={{ transform: 'scale(0.79)', fontSize: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Teksti</th>
                            <th>
                                <Link to='/aboutus/addAboutUs' className='clickable-header'>
                                    Insert
                                </Link>
                            </th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aboutUsData.map((aboutus, indexaboutus) => {
                            return (
                                <Fragment key={aboutus.idaboutus}>
                                    <tr>
                                        <th scope='row'>{indexaboutus + 1}</th>
                                        <td style={{ textAlign: 'justify' }}>{aboutus.teksti}</td>
                                        <td>
                                            <Link to='/aboutus/addAboutUs'>
                                                <button className='btn btn-User'>
                                                    <BsPlusLg style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/aboutus/update/${aboutus.idaboutus}`}>
                                                <button className='btn btn-edit'>
                                                    <BsPencil style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-delete' onClick={() => deleteAboutUs(aboutus.idaboutus)}>
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

export default AboutUsTable;
