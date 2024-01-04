import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditCategoryStyle.css";

// Krijojme nje objekt qe permban te dhenat fillestare te kategorive
const initialState = {
    EmriKategorise: "",
    FotoKategori: undefined,
    FotoFile: null,
};

// Krijimi i funksionit AddEditCategory per te shtuar ose perditesuar kategorite
const AddEditCategory = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { idcategory } = useParams();

    // Krijojme nje useEffect per te marrur dhe shfaqur te dhenat e kategorive
    useEffect(() => {
        const fetchCategoryData = async () => {
            let fileReader;
            try {
                if (idcategory) {
                    const response = await axios.get(`http://localhost:6001/api/category/get/${idcategory}`);
                    const categoryData = response.data[0];

                    // Check if the product has a photo
                    if (categoryData.FotoKategori) {
                        console.log("categoryData.FotoKategori:", categoryData.FotoKategori);
                        fileReader = new FileReader();

                        fileReader.onloadend = () => {
                            console.log("fileReader.onloadend called");

                            if (fileReader.result && fileReader.result.split(',')[1]) {
                                const base64String = fileReader.result.split(',')[1];

                                // If yes, set the fotoName property in the state
                                setState((prevState) => ({
                                    ...prevState,
                                    ...categoryData,
                                    fotoName: categoryData.FotoKategori.name,
                                    existingFoto: base64String,
                                }));

                                let formData = new FormData();
                                formData.append("EmriKategorise", categoryData.EmriKategorise);
                                formData.append("FotoKategori", categoryData.FotoKategori);

                                console.log("FormData:", formData);
                            } else {
                                console.error("Invalid file type. Expected base64 string.");
                            }
                        };

                        fileReader.readAsDataURL(new Blob([new Uint8Array(categoryData.FotoKategori.data)]));
                    } else {
                        // If not, set the state without fotoName and existingFoto
                        setState((prevState) => ({
                            ...prevState,
                            ...categoryData,
                            fotoName: '',
                            existingFoto: '',
                        }));
                    }
                }
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };

        fetchCategoryData();
    }, [idcategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        // Validimi ne ane te klientit
        if (!state.EmriKategorise || (!state.FotoKategori && !state.FotoFile)) {
            toast.error("Ju lutemi plotësoni të gjitha fushat");
            return;
        }

        try {
            // Krijimi i nje objekti FormData per te derguar te dhenat e kategorive dhe foton si form-data
            const formData = new FormData();
            formData.append("EmriKategorise", state.EmriKategorise);

            // Shtimi i imazhit ekzistues ose te dosjes te zgjedhur ne FormData
            if (state.FotoFile) {
                formData.append("FotoKategori", state.FotoFile);
            } else if (state.FotoKategori) {
                formData.append("FotoKategori", state.FotoKategori);
            }

            // Krijimi i URL-se se kerkeses bazuar ne ekzistencen e idcategory (Nese ekziston behet update, nese jo shtohet nje kategori e re)
            const url = idcategory
                ? `http://localhost:6001/api/category/update/${idcategory}`
                : "http://localhost:6001/api/category/post";

            // Dergimi i te dhenave per ruajtjen e produktit ne server
            let response;
            if (idcategory) {
                // Nese kategoria ekziston, do te thote se po e perditesojme, pra perdorim axios.put
                response = await axios.put(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                // Nese kategoria nuk ekziston, do te thote se po e shtojme, pra perdorim axios.post
                response = await axios.post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            console.log("Response:", response.data);

            // Pastrojme formen dhe shfaqim njoftimin per sukses
            setState(initialState);
            toast.success(idcategory ? "Kategoria është perditësuar me sukses!" : "Kategoria është shtuar me sukses!");

            // Navigimi prapa ne faqen e Admin-it pasi perditesimi/shtimi perfundon
            navigate('/admin/categories');
        } catch (error) {
            console.log("Error:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    // Funksioni qe thirret kur ndodh ndryshimi ne input fields
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "FotoKategori") {
            if (files.length > 0) {
                const file = files[0];
                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    setState((prevState) => ({
                        ...prevState,
                        FotoKategori: file,
                        existingFoto: base64String,
                    }));
                };

                reader.readAsDataURL(file);
            } else {
                setState((prevState) => ({
                    ...prevState,
                    FotoKategori: undefined,
                    existingFoto: '',
                }));
            }
        } else {
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const imageUrl = `data:image/jpeg;base64,${state.FotoKategori}`;

    // Renderimi i HTML formes per te shtuar ose perditesuar nje kategori
    return (
        <div style={{ marginTop: "150px" }}>
            <h2>{idcategory ? "Edit" : "Add"}</h2>
            <form action="/" encType="multipart/form-data" method="post"
                style={{
                    margin: "auto",
                    padding: "25px",
                    paddingTop: "30px",
                    paddingRight: "40px",
                    maxWidth: "400px",
                    height: "350px",
                    alignContent: "center",
                    backgroundColor: "#1e1f1e",
                    color: "white",
                    borderRadius: "10px",
                    height: "auto",
                }}
                onSubmit={handleSubmit}
            >
                <div className="product-box">
                    <label htmlFor="emrikategorise" className="input-label">Emri</label>
                    <input value={state.EmriKategorise || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj emrin e kategorisë" id="emrikategorise" name="EmriKategorise"></input>
                </div>

                <div className="product-box">
                    <label htmlFor="foto" className="input-label">Foto</label>
                    <input onChange={handleInputChange} type="file" id="foto" name="FotoKategori" accept="image/*" />
                    {state.Foto && (
                        <span className="file-name">{state.Foto.name}</span>
                    )}

                    {state.existingFoto && (
                        <img src={`data:image/jpeg;base64,${state.existingFoto}`} alt="Existing Product" style={{ maxWidth: '100%', height: 'auto' }} />
                    )}
                </div>

                <input id="submit-button" type="submit" value={idcategory ? "Update" : "Save"} />
                <Link to="/admin/categories">
                    <input id="goback-button" type="button" value="Cancel"></input>
                </Link>
            </form>

            <div style={{ height: "465px" }}></div>
        </div>
    );
}

export default AddEditCategory;