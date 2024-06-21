import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditCategoryStyle.css";

const initialState = {
    EmriKategorise: "",
    FotoKategori: null,
    existingFoto: null,
};

const AddEditCategory = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { categoryId } = useParams();

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:6001/api/category/get/${categoryId}`);
                const categoryData = response.data[0];
                console.log("Category data:", categoryData);

                let base64String = null;
                if (categoryData.FotoKategori) {
                    if (typeof categoryData.FotoKategori === 'string') {
                        base64String = categoryData.FotoKategori;
                    } else if (categoryData.FotoKategori.data) {
                        const uint8Array = new Uint8Array(categoryData.FotoKategori.data);
                        base64String = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
                        base64String = btoa(base64String);
                    } else {
                        console.error("Unexpected FotoKategori structure:", categoryData.FotoKategori);
                    }
                }

                setState(prevState => ({
                    ...prevState,
                    EmriKategorise: categoryData.EmriKategorise,
                    existingFoto: base64String ? `data:image/jpeg;base64,${base64String}` : null,
                    FotoKategori: null
                }));

            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };

        if (categoryId) {
            fetchCategoryData();
        } else {
            setState(initialState);
        }
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.EmriKategorise || (!state.FotoKategori && !state.existingFoto)) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("EmriKategorise", state.EmriKategorise);
            if (state.FotoKategori) {
                formData.append("FotoKategori", state.FotoKategori);
            }

            let url = "http://localhost:6001/api/category/post";
            let method = "post";

            if (categoryId) {
                url = `http://localhost:6001/api/category/update/${categoryId}`;
                method = "put";
            }

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setState(initialState);
            toast.success(categoryId ? "Category updated successfully!" : "Category added successfully!");
            navigate("/admin/categories");
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "FotoKategori" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setState((prevState) => ({
                    ...prevState,
                    FotoKategori: file,
                    existingFoto: `data:image/jpeg;base64,${base64String}`,
                }));
            };

            reader.readAsDataURL(file);
        } else {
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <h2>{categoryId ? "Edit" : "Add"} Category</h2>
            <form
                style={{
                    margin: "auto",
                    padding: "25px",
                    paddingTop: "30px",
                    paddingRight: "40px",
                    maxWidth: "400px",
                    alignContent: "center",
                    backgroundColor: "#1e1f1e",
                    color: "white",
                    borderRadius: "10px",
                    height: "auto",
                }}
                onSubmit={handleSubmit}
            >
                <div className="product-box">
                    <label htmlFor="emrikategorise" className="input-label">
                        Emri
                    </label>
                    <input
                        value={state.EmriKategorise || ""}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Shkruaj emrin e kategorisë"
                        id="emrikategorise"
                        name="EmriKategorise"
                        onInput={(e) => console.log('Input value:', e.target.value)}
                    />
                </div>

                <div className="product-box">
                    <label htmlFor="foto" className="input-label">
                        Foto
                    </label>
                    <input
                        onChange={handleInputChange}
                        type="file"
                        id="foto"
                        name="FotoKategori"
                        accept="image/*"
                    />
                    {state.FotoKategori && (
                        <span className="file-name">{state.FotoKategori.name}</span>
                    )}

                    {state.existingFoto && (
                        <img
                            src={state.existingFoto}
                            alt="Existing Product"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                </div>

                <input id="submit-button" type="submit" value={categoryId ? "Update" : "Save"} />
                <Link to="/admin/categories">
                    <input id="goback-button" type="button" value="Cancel" />
                </Link>
            </form>

            <div style={{ height: "465px" }}></div>
        </div>
    );
};

export default AddEditCategory;