import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddEditCategoryStyle.css";

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
            if (idcategory) {
                try {
                    const response = await axios.get(`http://localhost:6001/api/category/get/${idcategory}`);
                    const { EmriKategorise, FotoKategori } = response.data[0];
                    setState({ EmriKategorise, FotoKategori, FotoFile: null });
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        };

        fetchCategoryData();
    }, [idcategory]);

    // Funksioni qe thirret kur formulari dergohet (submit)
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
            navigate('/Admin');
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

        // Nese ndryshimi eshte per foton, ruajme foton si file ne state
        if (name === "FotoKategori") {
            // Kontrollon nese eshte zgjedh nje foto e re, nese jo e mban vleren ekzistuese
            const newFile = files.length > 0 ? files[0] : state.FotoKategori;
            setState((prevState) => ({ ...prevState, FotoKategori: newFile }));
        } else {
            // Perndryshe, ruajme te dhenat e tjera te input fields ne state
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };


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
                }}
                onSubmit={handleSubmit}
            >
                <div className="product-box">
                    <label htmlFor="emrikategorise" className="input-label">Emri</label>
                    <input value={state.EmriKategorise || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj emrin e kategorisë" id="emrikategorise" name="EmriKategorise"></input>
                </div>

                <div className="product-box">
                    <label htmlFor="fotokategori" className="input-label">Foto</label>
                    <input onChange={handleInputChange} type="file" id="foto" name="FotoKategori" accept="image/*" />
                </div>


                <input id="submit-button" type="submit" value={idcategory ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input id="goback-button" type="button" value="Cancel"></input>
                </Link>
            </form>
        </div>
    );
}

export default AddEditCategory;