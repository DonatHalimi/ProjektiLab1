import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminEditProductStyle from "../styles/AddEditProductStyle.css";

// Inicializimi i nje objekti i cili ka fushat per shtimin e nje produkti te ri
const initialState = {
    Emri: "",
    Cmimi: "",
    Valuta: "",
    Kategoria: "",
    Detajet: "",
    Foto: null,
    FotoFile: null
};

// Krijimi i funksionit AddEditProduct per te shtuar produkte
const AddEditProduct = () => {

    // Definimi i state me useState hook dhe destruktirimi i elementeve te states
    const [state, setState] = useState(initialState);
    const { Emri, Cmimi, Valuta, Kategoria, Detajet, Foto, FotoFile } = state;

    // Deklarimi i hooks per te kaluar ne nje faqe tjeter dhe per te marrur ID
    const navigate = useNavigate();
    const { idproduct } = useParams();

    // Deklarimi i useEffect hook per te ekzekutuar nje kerkese pasi komponenti eshte renderizuar per here te pare
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        // Validimi i fushave te formes
        if (!Emri || !Cmimi || !Valuta || !Kategoria || !Detajet || !Foto) {
            toast.error("Please fill out all the fields");
        } else {
            const formData = new FormData();
            formData.append("Emri", Emri);
            formData.append("Cmimi", Cmimi);
            formData.append("Valuta", Valuta);
            formData.append("Kategoria", Kategoria);
            formData.append("Detajet", Detajet);
            formData.append("Foto", Foto);
            formData.append("FotoFile", FotoFile);

            console.log("Form Data:", formData);

            if (!idproduct) {
                // Nese produkti nuk ekziston, kryejme nje post request per ta shtuar
                axios
                    .post("http://localhost:6001/api/product/post", formData)
                    .then(() => {
                        setState(initialState);
                        toast.success("Product Added Successfully");
                        navigate("/Admin");
                    })
                    .catch((err) => {
                        if (err.response && err.response.data) {
                            toast.error(err.response.data);
                        } else {
                            toast.error("An error occurred");
                        }
                    });
            } else {
                // Nese produkti ekziston, kryejme nje put request per ta perditesuar
                axios
                    .put(
                        `http://localhost:6001/api/product/update/${idproduct}`,
                        formData
                    )
                    .then(() => {
                        setState(initialState);
                        toast.success("Product Updated Successfully");
                        navigate("/Admin");
                    })
                    .catch((err) => {
                        if (err.response && err.response.data) {
                            toast.error(err.response.data);
                        } else {
                            toast.error("An error occurred");
                        }
                    });
            }
        }
    };

    // Deklarimi i funksionit handleInputChange per te ruajtur ndryshimet ne input fields
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "Foto") {
            const selectedFile = files[0];
            const blob = new Blob([selectedFile], { type: selectedFile.type });
            setState((prevState) => ({
                ...prevState,
                Foto: blob,
                FotoFile: selectedFile,
            }));
        } else {
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    // Renderimi i HTML formes per te shtuar ose perditesuar nje produkt
    return (
        <div style={{ marginTop: "150px" }}>

            <h2>Add/Edit</h2>

            <form style={{
                margin: "auto",
                padding: "25px",
                paddingRight: "40px",
                maxWidth: "400px",
                alignContent: "center",
                backgroundColor: "#1e1f1e",
                color: "white",
                borderRadius: "10px"
            }}
                onSubmit={handleSubmit}
            >

                <div className="product-box">
                    <label htmlFor='Emri'>Emri</label>
                    <input value={Emri || ""} onChange={handleInputChange} type="text" placeholder="Type name" id="emri" name="Emri"></input>
                </div>

                <div className="product-box">
                    <label htmlFor='Cmimi'>Cmimi</label>
                    <input value={Cmimi || ""} onChange={handleInputChange} type="text" placeholder="Type price" id="cmimi" name="Cmimi"></input>
                </div>

                <div className="product-box">
                    <label htmlFor='Valuta'>Valuta</label>
                    <input value={Valuta || ""} onChange={handleInputChange} type="text" placeholder="Type currency" id="valuta" name="Valuta"></input>
                </div>

                <div className="product-box">
                    <label htmlFor='Kategoria'>Kategoria</label>
                    <input value={Kategoria || ""} onChange={handleInputChange} type="text" placeholder="Type category" id="kategoria" name="Kategoria"></input>
                </div>

                <div className="product-box">
                    <label htmlFor='Detajet'>Detajet</label>
                    <input value={Detajet || ""} onChange={handleInputChange} type="text" placeholder="Type details" id="detajet" name="Detajet"></input>
                </div>

                <div className="product-box">
                    <label htmlFor="Foto">Foto</label>
                    <input onChange={handleInputChange} type="file" id="foto" name="Foto" />
                </div>

                <input id="submit-button" type="submit" value={idproduct ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input id="goback-button" type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
};

export default AddEditProduct;