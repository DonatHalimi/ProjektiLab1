import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

const initialState = {
    Name: "",
    Description: "",
    idcountry: "",
    countries: [],
};

const AddEditBrands = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { BrandId } = useParams();

    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                if (BrandId) {
                    const response = await axios.get(`http://localhost:6001/api/brands/get/${BrandId}`);
                    const brandData = response.data[0];

                    setState((prevState) => ({
                        ...prevState,
                        ...brandData,
                    }));
                }
            } catch (error) {
                console.error("Error fetching supplier data:", error);
            }
        };

        fetchBrandData();
    }, [BrandId]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("http://localhost:6001/api/countries/get");
                console.log('Countries Data in AddEditBrands:', response.data);

                setState((prevState) => ({
                    ...prevState,
                    countries: response.data,
                }));
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.Name || !state.Description || !state.idcountry) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            // Use the country name as the value
            const url = BrandId
                ? `http://localhost:6001/api/brands/update/${state.BrandId}`
                : "http://localhost:6001/api/brands/post";

            const response = await axios({
                method: BrandId ? 'put' : 'post',
                url,
                data: state,
            });

            console.log(response);

            setState(initialState);
            toast.success(BrandId ? "Brand updated successfully!" : "Brand added successfully!");

            navigate("/admin/brands");
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

        // Check if the name is 'idcountry' and parse the value accordingly
        const parsedValue = name === 'idcountry' ? parseInt(value, 10) : value;

        setState({ ...state, [name]: parsedValue });
    };

    return (
        <div style={{ marginTop: "150px", transform: 'scale(0.9)' }}>
            <h2>{BrandId ? "Edit" : "Add"} Brand</h2>
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
                        <label htmlFor="Description" className="input-label">
                            Description
                        </label>
                        <input value={state.Description || ""} onChange={handleInputChange} type="text" placeholder="Enter Description" id="Description" name="Description"></input>
                    </div>

                    <div className="product-box">
                        <label htmlFor="countryDropdown" className="input-label">Country</label>
                        <select value={state.idcountry} onChange={handleInputChange} name="idcountry">
                            <option value="" disabled hidden>Select a country</option>
                            {state.countries && state.countries.length > 0 &&
                                state.countries.map((country) => (
                                    <option key={country.CountryId} value={country.CountryId}>
                                        {country.Name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <input id="submit-button" type="submit" value={BrandId ? "Update" : "Save"} />
                    <Link to="/admin/brands">
                        <input id="goback-button" type="button" value="Cancel" />
                    </Link>
                </form>
            )}
        </div>
    );
};

export default AddEditBrands;