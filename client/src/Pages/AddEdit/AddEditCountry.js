import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

const initialState = {
    Name: "",
};

const AddEditCountry = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { CountryId } = useParams();

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                if (CountryId) {
                    const response = await axios.get(`http://localhost:6001/api/countries/get/${CountryId}`);
                    const countryData = response.data[0];

                    setState((prevState) => ({
                        ...prevState,
                        ...countryData,
                    }));
                }
            } catch (error) {
                console.error("Error fetching supplier data:", error);
            }
        };

        fetchCountryData();
    }, [CountryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.Name) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const url = CountryId
                ? `http://localhost:6001/api/countries/update/${state.CountryId}`
                : "http://localhost:6001/api/countries/post";

            const response = await axios({
                method: CountryId ? 'put' : 'post',
                url,
                data: state,
            });

            console.log(response);

            setState(initialState);
            toast.success(CountryId ? "Country updated successfully!" : "Country added successfully!");

            navigate("/admin/countries");
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
            <h2>{CountryId ? "Edit" : "Add"} Country</h2>
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

                    <input id="submit-button" type="submit" value={CountryId ? "Update" : "Save"} />
                    <Link to="/admin/countries">
                        <input id="goback-button" type="button" value="Cancel" />
                    </Link>
                </form>
            )}
        </div>
    );
};

export default AddEditCountry;