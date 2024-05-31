import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsPersonAdd, BsPersonDash, BsPersonX } from 'react-icons/bs';
import "../../styles/AdminStyle.css";
import AdminSidebar from '../Admin/AdminSidebar';

const UsersTable = () => {
    const [usersData, setUsersData] = useState([]);

    const loadUsersData = async () => {
        try {
            const response = await axios.get('http://localhost:6001/api/user/get', {
                headers: { 'x-access-token': localStorage.getItem('token') } // Ensure token is sent with the request
            });
            if (response.data) {
                setUsersData(response.data);
            } else {
                console.log('API endpoint did not return any data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const deleteUser = async (id) => {
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
                            await axios.delete(`http://localhost:6001/api/user/remove/${id}`, {
                                headers: { 'x-access-token': localStorage.getItem('token') }
                            });
                            toast.success('Përdoruesi është fshirë me sukses!');
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

    useEffect(() => {
        loadUsersData();
        document.title = 'Users Table';
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
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>
                                <Link to='/user/addUser' className='clickable-header-user'>
                                    Insert
                                </Link>
                            </th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user) => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>●●●●●●</td>
                                <td>{user.role_id === 2 ? 'Admin' : 'User'}</td>
                                <td>
                                    <Link to='/user/addUser'>
                                        <button className="btn btn-User">
                                            <BsPersonAdd style={{ color: 'black', fontSize: '20px', fontWeight: '600' }} />
                                        </button>
                                    </Link>
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
