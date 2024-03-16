import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import AdminSidebar from '../Admin/AdminSidebar';
import '../../styles/CategoryTableStyle.css'; // Assuming this CSS file contains the desired table styling


const PaymentsTable = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Adjust this value as needed

    // Fetch payments data from the server
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('http://localhost:6001/fetch-payments');
                const paymentsData = await response.json();
                setPayments(paymentsData);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };
        fetchPayments();
    }, []);

    // Pagination
    const offset = currentPage * itemsPerPage;
    const pageCount = Math.ceil(payments.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className="table-container">
                <h1>Payment Data</h1>
                <table className="styled-table">
                    {/* Table headers */}
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            {/* Add more headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows */}
                        {payments.slice(offset, offset + itemsPerPage).map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.billing_details.email}</td>
                                <td>{payment.billing_details.name}</td>
                                <td>{payment.payment_method_details.type}</td>
                                <td>{payment.status}</td>
                                {/* Render more cells if needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        initialPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentsTable;
