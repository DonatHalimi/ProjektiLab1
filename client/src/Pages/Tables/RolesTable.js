import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsPersonAdd, BsPersonDash, BsPersonX } from 'react-icons/bs';
import "../../styles/AdminStyle.css"
import AdminSidebar from '../Admin/AdminSidebar';

const RolesTable = () => {
    const [rolesData, setRolesData] = useState([]);

    // Funksioni per mi marr te dhenat e user-ave nga API
    const loadRolesData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/roles/get');
            if (response && response.data) {
                setRolesData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje user
    const deleteRole = async (idroles) => {
        const confirmDialog = () => {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure that you want to delete this user?',
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
                                await axios.delete(`http://localhost:6001/api/roles/remove/${idroles}`);
                                toast.success('Përdoruesi është fshirë me sukses!');
                                setTimeout(() => loadRolesData(), 500);
                            } catch (error) {
                                toast.error(`Error deleting user: ${error.message}`);
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
        loadRolesData();

        document.title = `Roles Table`;
    }, []);

    return (
        <div className="admin-page">

            <AdminSidebar />

            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Role name</th>
                            <Link to='/roles/addRole' className='clickable-header-user'>
                                Insert
                            </Link>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolesData.map((role) => (
                            <tr key={role.id}>
                                <th>{role.id}</th>
                                <td>{role.name}</td>
                                <td>
                                    <Link to='/roles/addRole'>
                                        <button className="btn btn-User">
                                            <BsPersonAdd style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/roles/updateRoles/${role.idroles}`}>
                                        <button className="btn btn-edit">
                                            <BsPersonDash style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-delete" onClick={() => deleteRole(role.idroles)}>
                                        <BsPersonX style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolesTable;
