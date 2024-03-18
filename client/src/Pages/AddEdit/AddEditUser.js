import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditStyle.css";

const AddEditUser = () => {
    const [state, setState] = useState({
        Name: "",
        Surname: "",
        Email: "",
        Password: "",
        Role: "",
        roles: [],
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rolesResponse = await axios.get("http://localhost:6001/api/roles");
                setState(prevState => ({
                    ...prevState,
                    roles: rolesResponse.data
                }));

                if (id) {
                    const userResponse = await axios.get(`http://localhost:6001/api/user/get/${id}`);
                    const userData = userResponse.data[0];
                    setState(prevState => ({
                        ...prevState,
                        ...userData
                    }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.Name || !state.Surname || !state.Email || !state.Password || !state.Role) {
            toast.error("Please fill in all fields");
        } else {
            try {
                const userData = {
                    Name: state.Name,
                    Surname: state.Surname,
                    Email: state.Email,
                    Password: state.Password,
                    Role: state.Role
                };

                const url = id
                    ? `http://localhost:6001/api/user/update/${id}`
                    : "http://localhost:6001/api/user/post";

                const method = id ? "put" : "post";

                const response = await axios[method](url, userData);

                console.log("Response:", response.data);
                toast.success(id ? "User updated successfully!" : "User added successfully!");

                setState({
                    Name: "",
                    Surname: "",
                    Email: "",
                    Password: "",
                    Role: ""
                });
                navigate('/admin/users');
            } catch (error) {
                console.error("Error:", error);
                if (error.response && error.response.data) {
                    toast.error(error.response.data);
                } else {
                    toast.error("An error occurred");
                }
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <h2>{id ? "Edit" : "Add"} User</h2>
            <form
                style={{
                    margin: "auto",
                    padding: "25px",
                    paddingTop: "50px",
                    paddingRight: "40px",
                    maxWidth: "387px",
                    alignContent: "center",
                    backgroundColor: "#222",
                    color: "white",
                    borderRadius: "10px"
                }}
                onSubmit={handleSubmit}
            >
                <div className="user-box">
                    <label htmlFor='Name' className="input-label">Name</label>
                    <input value={state.Name || ""} onChange={handleInputChange} type="text" placeholder="Enter Name" id="Name" name="Name"></input>
                </div>

                <div className="user-box">
                    <label htmlFor='Surname' className="input-label">Surname</label>
                    <input value={state.Surname || ""} onChange={handleInputChange} type="text" placeholder="Enter Surname" id="Surname" name="Surname"></input>
                </div>

                <div className="user-box">
                    <label htmlFor='Email' className="input-label">Email</label>
                    <input value={state.Email || ""} onChange={handleInputChange} type="email" placeholder="Enter Email" id="Email" name="Email"></input>
                </div>

                <div className="user-box">
                    <label htmlFor="Password" className="input-label">Password</label>
                    <input value={state.Password || ""} onChange={handleInputChange} type="password" placeholder="Enter Password" id="Password" name="Password"></input>
                </div>

                <div className="user-box">
                    <label htmlFor="Role" className="input-label">Role</label>
                    <select value={state.Role || ""} onChange={handleInputChange} id="Role" name="Role">
                        <option value="" disabled>Select a Role</option>
                        {state.roles.map(role => (
                            <option key={role.id} value={role.id}>{role.role_name}</option>
                        ))}
                    </select>
                </div>

                <input id="submit-button" type="submit" value={id ? "Update" : "Save"} />
                <Link to="/admin/users">
                    <input id="goback-button" type="button" value="Cancel" />
                </Link>
            </form>

            <div style={{ height: "250px" }}></div>
        </div>
    );
};

export default AddEditUser;
