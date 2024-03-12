import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

const initialState = {
    Name: "",
    Phone: "",
    Address: "",
};

const AddEditSupplier = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { SupplierId } = useParams();

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                if (SupplierId) {
                    const response = await axios.get(`http://localhost:6001/api/suppliers/get/${SupplierId}`);
                    const supplierData = response.data[0];

                    setState((prevState) => ({
                        ...prevState,
                        ...supplierData,
                    }));
                }
            } catch (error) {
                console.error("Error fetching supplier data:", error);
            }
        };

        fetchSupplierData();
    }, [SupplierId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.Name || !state.Phone || !state.Address) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const url = SupplierId
                ? `http://localhost:6001/api/suppliers/update/${state.SupplierId}`
                : "http://localhost:6001/api/suppliers/post";

            const response = await axios({
                method: SupplierId ? 'put' : 'post',
                url,
                data: state,
            });

            console.log(response);

            setState(initialState);
            toast.success(SupplierId ? "Supplier updated successfully!" : "Supplier added successfully!");

            navigate("/admin/suppliers");
        } catch (error) {
            console.log("Error:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "150px", transform: 'scale(0.9)' }}>
            <h2>{SupplierId ? "Edit" : "Add"} Supplier</h2>
            {state && (
                <form
                    action="/"
                    encType="multipart/form-data"
                    method="post"
                    style={{
                        margin: "auto",
                        padding: "25px",
                        paddingRight: "30px",
                        paddingTop: "30px",
                        maxWidth: "387px",
                        alignContent: "center",
                        backgroundColor: "#1e1f1e",
                        color: "white",
                        borderRadius: "10px",
                        height: "auto",
                    }}
                    onSubmit={handleSubmit}
                >
                    <div className="product-box">
                        <label htmlFor="Name" className="input-label">
                            Name
                        </label>
                        <input value={state.Name || ""} onChange={handleInputChange} type="text" placeholder="Enter Name" id="Name" name="Name"></input>
                    </div>

                    <div className="product-box">
                        <label htmlFor="Phone" className="input-label">Phone</label>
                        <input
                            value={state.Phone || ""}
                            onChange={handleInputChange}
                            type="text"
                            id="Phone"
                            pattern="(044|045)[0-9]{3}[0-9]{3}"
                            placeholder="044-###-### or 045-###-###"
                            name="Phone"
                            required
                        />
                    </div>

                    <div className="product-box">
                        <label htmlFor='Address' className="input-label">
                            Address
                        </label>
                        <input value={state.Address || ""} onChange={handleInputChange} type="text" placeholder="Enter Address" id="Address" name="Address"></input>
                    </div>

                    <input id="submit-button" type="submit" value={SupplierId ? "Update" : "Save"} />
                    <Link to="/admin/suppliers">
                        <input id="goback-button" type="button" value="Cancel" />
                    </Link>
                </form>
            )}
        </div>
    );
};

export default AddEditSupplier;
