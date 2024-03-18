import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

const initialState = {
    role_name: "",
};

const AddEditRoles = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { idroles } = useParams();

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                if (idroles) {
                    const response = await axios.get(`http://localhost:6001/api/roles/get/${idroles}`);
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

        if (!state.role_name) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const url = idroles
                ? `http://localhost:6001/api/roles/update/${state.idroles}`
                : "http://localhost:6001/api/roles/post";

            const response = await axios({
                method: idroles ? 'put' : 'post',
                url,
                data: state,
            });

            console.log(response);

            setState(initialState);
            toast.success(idroles ? "Role updated successfully!" : "Role added successfully!");

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
            <h2>{idroles ? "Edit" : "Add"} Roles</h2>
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
                        <label htmlFor="role_name" className="input-label">
                            Role Name
                        </label>
                        <input value={state.role_name || ""} onChange={handleInputChange} type="text" placeholder="Enter Role name" id="role_name" name="role_name"></input>
                    </div>

                   

                    <input id="submit-button" type="submit" value={idroles ? "Update" : "Save"} />
                    <Link to="/admin/roles">
                        <input id="goback-button" type="button" value="Cancel" />
                    </Link>
                </form>
            )}
        </div>
    );
};

export default AddEditRoles;
