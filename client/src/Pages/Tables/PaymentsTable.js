import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import AdminSidebar from '../Admin/AdminSidebar';
import '../../styles/CategoryTableStyle.css';

const PaymentsTable = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Fetch payments data from the server
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('http://localhost:6001/api/payments/fetch-payments');
                const paymentsData = await response.json();
                setPayments(paymentsData);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };
        fetchPayments();
    }, []);

    const offset = currentPage * itemsPerPage;
    const pageCount = Math.ceil(payments.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Function to format amount from cents to dollars
    const formatAmount = (amountInCents) => {
        const amountInDollars = (amountInCents / 100).toFixed(2);
        return `$${amountInDollars}`;
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.slice(offset, offset + itemsPerPage).map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{formatAmount(payment.amount)}</td>
                                <td>{payment.billing_details.email}</td>
                                <td>{payment.billing_details.name}</td>
                                <td>{payment.payment_method_details.type}</td>
                                <td>{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>

                    {/* Pagination */}
                    <tfoot>
                        <tr>
                            <td colSpan="10">
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
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default PaymentsTable;
