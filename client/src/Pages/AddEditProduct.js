import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditProductStyle.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    Emri: "",
    Detajet: "",
    FotoSource: ""
}

const AddEditProduct = () => {
    const [state, setState] = useState(initialState);

    const { Emri, Detajet, FotoSource } = state;

    const navigate = useNavigate();

    const { idproduct } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:6001/api/get/${idproduct}`)
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((err) => console.log(err));
    }, [idproduct]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        if (!Emri || !Detajet || !FotoSource) {
            toast.error("Please fill out all the fields");
        } else {
            if (!idproduct) {
                axios.post('http://localhost:6001/api/add-product', {
                    Emri,
                    Detajet,
                    FotoSource
                }).then(() => {
                    setState({ ...state, Emri: "", Detajet: "", FotoSource: "", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("Product Added Successfully");
            } else {
                axios.put(`http://localhost:6001/api/update/${idproduct}`, {
                    idproduct,
                    Emri,
                    Detajet,
                    FotoSource
                }).then(() => {
                    setState({ ...state, Emri: "", Detajet: "", FotoSource: "", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("Product Added Successfully");
            }

            setTimeout(() =>
                navigate("/Admin")
            )
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div style={{ marginTop: "150px" }}>

            <h2>Add Edit</h2>

            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
                onSubmit={handleSubmit}
            >

                <label htmlFor='Emri'>Emri</label>
                <input value={Emri || ""} onChange={handleInputChange} type="text" placeholder="Type name" id="emri" name="Emri"></input>

                <div className="product-box">
                    <label htmlFor='Detajet'>Detajet</label>
                    <input value={Detajet || ""} onChange={handleInputChange} type="text" placeholder="Type details" id="detajet" name="Detajet"></input>
                </div>

                <div className="product-box">
                    <label htmlFor="FotoSource">FotoSource</label>
                    <input value={FotoSource || ""} onChange={handleInputChange} type="text" placeholder="Type photo source" id="fotosource" name="FotoSource"></input>
                </div>

                <input type="submit" value={idproduct ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
};

export default AddEditProduct;