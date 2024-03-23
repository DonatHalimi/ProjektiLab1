import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

const initialState = {
    companyName: "",
    phone:"",
    email:"",
    transportType:"",
    transportFee:""
};

const AddEditTransport = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { transportId } = useParams();

    useEffect(() => {
        const fetchTransportData = async () => {
            try {
                if (transportId) {
                    const response = await axios.get(`http://localhost:6001/api/transport/get/${transportId}`);
                    const transportData = response.data[0];

                    setState((prevState) => ({
                        ...prevState,
                        ...transportData,
                    }));
                }
            } catch (error) {
                console.error("Error fetching supplier data:", error);
            }
        };

        fetchTransportData();
    }, [transportId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.companyName || !state.phone || !state.email ||! state.transportType || !state.transportFee ) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const url = transportId
                ? `http://localhost:6001/api/transport/update/${state.transportId}`
                : "http://localhost:6001/api/transport/post";

            const response = await axios({
                method: transportId ? 'put' : 'post',
                url,
                data: state,
            });

            console.log(response);

            setState(initialState);
            toast.success(transportId ? "Country updated successfully!" : "Country added successfully!");

            navigate("/admin/transport");
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
            <h2>{transportId ? "Edit" : "Add"} Transport</h2>
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
                        <label htmlFor="companyName" className="input-label">
                            Company Name
                        </label>
                        <input value={state.companyName || ""} onChange={handleInputChange} type="text" placeholder="Enter Name" id="companyName" name="companyName"></input>
                    </div>
                    <div className="product-box">
                        <label htmlFor="phone" className="input-label">
                            Phone
                        </label>
                        <input value={state.phone || ""} onChange={handleInputChange} type="text" placeholder="Enter phone" id="phone" name="phone"></input>
                    </div>
                    <div className="product-box">
                        <label htmlFor="email" className="input-label">
                            Email
                        </label>
                        <input value={state.email || ""} onChange={handleInputChange} type="text" placeholder="Enter email" id="email" name="email"></input>
                    </div>
                    <div className="product-box">
                        <label htmlFor="transportType" className="input-label">
                            Transport Type
                        </label>
                        <input value={state.transportType || ""} onChange={handleInputChange} type="text" placeholder="Enter transportType" id="transportType" name="transportType"></input>
                    </div>
                    <div className="product-box">
                        <label htmlFor="transportFee" className="input-label">
                            Transport Fee
                        </label>
                        <input value={state.transportFee || ""} onChange={handleInputChange} type="text" placeholder="Enter transportFee" id="transportFee" name="transportFee"></input>
                    </div>

                    <input id="submit-button" type="submit" value={transportId ? "Update" : "Save"} />
                    <Link to="/admin/transport">
                        <input id="goback-button" type="button" value="Cancel" />
                    </Link>
                </form>
            )}
        </div>
    );
};

export default AddEditTransport;