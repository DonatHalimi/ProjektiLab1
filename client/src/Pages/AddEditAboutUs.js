import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditAboutUsStyle.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
   teksti:""
}

const AddEditAboutUs = () => {
    const [state, setState] = useState(initialState);


    const { teksti} = state;

    const navigate = useNavigate();

    const { idaboutus } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:6001/api/aboutus/get/${idaboutus}`)
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((err) => console.log(err));
    }, [idaboutus]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");
        if (!teksti) {
            toast.error("Please fill out all the fields");
        } else {
            if (!idaboutus) {
                axios.post('http://localhost:6001/api/post', {
                    teksti
                }).then(() => {
                    setState({ ...state, teksti:"", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("User Added Successfully");
            } else {
                axios.put(`http://localhost:6001/api/aboutus/update/${idaboutus}`, {
                    idaboutus,
                    teksti
                }).then(() => {
                    setState({ ...state, teksti:"", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("User Added Successfully");
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
                
                <div className="user-box">
                    <label htmlFor='teksti '>Teksti</label>
                    <input value={teksti || ""} onChange={handleInputChange} type="text" placeholder="Type teksti" id="teksti" name="teksti"></input>

                </div>
                

                <input type="submit" value={idaboutus ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
};

export default AddEditAboutUs;