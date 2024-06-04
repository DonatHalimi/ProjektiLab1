import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

const initialState = {
    name: "",
};

const AddEditRoles = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:6001/api/roles/get/${id}`);
                    const roleData = response.data;
                    setState(roleData);
                }
            } catch (error) {
                console.error("Error fetching role data:", error);
            }
        };

        fetchRoleData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.name) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const url = id
                ? `http://localhost:6001/api/roles/update/${id}`
                : "http://localhost:6001/api/roles/post";

            await axios({
                method: id ? 'put' : 'post',
                url,
                data: state,
            });

            setState(initialState);
            toast.success(id ? "Role updated successfully!" : "Role added successfully!");
            navigate("/admin/roles");
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
            <h2>{id ? "Edit" : "Add"} Roles</h2>
            <form
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
                    <label htmlFor="name" className="input-label">
                        Role Name
                    </label>
                    <input value={state.name || ""} onChange={handleInputChange} type="text" placeholder="Enter Role Name" id="name" name="name"></input>
                </div>

                <input id="submit-button" type="submit" value={id ? "Update" : "Save"} />
                <Link to="/admin/roles">
                    <input id="goback-button" type="button" value="Cancel" />
                </Link>
            </form>
        </div>
    );
};

export default AddEditRoles;
