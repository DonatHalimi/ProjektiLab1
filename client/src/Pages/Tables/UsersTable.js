import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this line to import Link
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AdminSidebar from '../AdminSidebar';
import { BsPersonAdd, BsPersonDash, BsPersonX } from 'react-icons/bs';

const UsersTable = () => {
    const [usersData, setUsersData] = useState([]);

    // Funksioni per mi marr te dhenat e user-ave nga API
    const loadUsersData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/user/get');
            if (response && response.data) {
                setUsersData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funksioni per te fshire nje user
    const deleteUser = async (id) => {
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
                                await axios.delete(`http://localhost:6001/api/user/remove/${id}`);
                                toast.success('User deleted successfully!');
                                setTimeout(() => loadUsersData(), 500);
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
        loadUsersData();
    }, []);

    return (
        <div className="admin-page">

            <AdminSidebar />

            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Insert</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.Name}</td>
                                <td>{user.Surname}</td>
                                <td>{user.Email}</td>
                                <td>●●●●●●</td>
                                <td>{user.Role === 1 ? 'Admin' : 'User'}</td>
                                <td>
                                    <button className="btn btn-User">
                                        <BsPersonAdd style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/user/update/${user.id}`}>
                                        <button className="btn btn-edit">
                                            <BsPersonDash style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-delete" onClick={() => deleteUser(user.id)}>
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

export default UsersTable;
