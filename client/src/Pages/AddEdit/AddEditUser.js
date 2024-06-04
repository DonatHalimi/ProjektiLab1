import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditStyle.css";

const initialState = {
    id: "",
    username: "",
    email: "",
    password: "",
    role_id: "",
    roles: [],
};
const AddEditUser = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:6001/api/user/get/${id}`);
                    const userData = response.data[0];

                    setState((prevState) => ({
                        ...prevState,
                        ...userData,
                    }));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://localhost:6001/api/roles/get");
                setState((prevState) => ({
                    ...prevState,
                    roles: response.data,
                }));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.username || !state.email || !state.password || !state.role_id) {
            toast.error("Please fill in all fields");
        } else {
            try {
                const userData = {
                    username: state.username,
                    email: state.email,
                    password: state.password,
                    role_id: state.role_id
                };

                const url = id
                    ? `http://localhost:6001/api/user/update/${id}`
                    : "http://localhost:6001/api/user/post";

                const method = id ? "put" : "post";

                const response = await axios[method](url, userData);

                console.log("Response:", response.data);
                toast.success(id ? "User updated successfully!" : "User added successfully!");

                setState({
                    username: "",
                    email: "",
                    password: "",
                    role_id: ""
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

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
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
                    <label htmlFor='username' className="input-label">Username</label>
                    <input value={state.username || ""} onChange={handleInputChange} type="text" placeholder="Enter Username" name="username"></input>
                </div>

                <div className="user-box">
                    <label htmlFor='email' className="input-label">Email</label>
                    <input value={state.email|| ""} onChange={handleInputChange} type="email" placeholder="Enter Email" id="email" name="email"></input>
                </div>

                <div className="user-box">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input value={state.password || ""} onChange={handleInputChange} type="password" placeholder="Enter Password" id="password" name="password"></input>
                </div>

                <div className="user-box">
                    <label htmlFor="Role" className="input-label">Role</label>
                    <select value={state.role_id || ""} onChange={handleInputChange} id="role_id" name="role_id">
                        <option value="" disabled>Select a Role</option>
                        {state.roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
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
