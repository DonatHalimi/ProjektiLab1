import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditStyle.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    Name: "",
    Surname: "",
    Email: "",
    Password: "",
    Role: ""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { Name, Surname, Email, Password, Role } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");
        if (!Name || !Surname || !Email || !Password || !Role) {
            toast.error("Please fill out all the fields");
        } else {
            axios.post('http://localhost:6001/api/post', {
                Name,
                Surname,
                Email,
                Password,
                Role
            }).then(() => {
                setState({ Name: "", Surname: "", Email: "", Password: "", Role: "", })
                
            }).catch((err) => toast.error(err.response.data))
            toast.success("Contact Added Successfully");
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

                <label htmlFor='Name'>Name</label>
                <input value={Name} onChange={handleInputChange} type="text" placeholder="Type name" id="name" name="Name"></input>


                <div className="user-box">
                    <label htmlFor='Surname'>Surname</label>
                    <input value={Surname} onChange={handleInputChange} type="text" placeholder="Type surname" id="surname" name="Surname"></input>

                </div>
                <div className="user-box">
                    <label htmlFor='Email'>Email</label>
                    <input value={Email} onChange={handleInputChange} type="email" placeholder="Type e-mail" id="Email" name="Email"></input>


                </div>
                <div className="user-box">
                    <label htmlFor="Password">Password</label>
                    <input value={Password} onChange={handleInputChange} type="password" placeholder="Type password" id="Password" name="Password"></input>
                </div>
                <div className="user-Box">
                    <label htmlFor="Role">Role</label>
                    <input value={Role} onChange={handleInputChange} type="number" placeholder="Type role" id="role" name="Role"></input>
                </div>
                <input type="submit" value="Save" />
                <Link to="/Admin">
                    <input type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
};

export default AddEdit;