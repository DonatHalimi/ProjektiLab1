import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditProductStyle.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inicializimi i nje objekti i cili ka fushat per shtimin e nje produkti te ri
const initialState = {
    Emri: "",
    Cmimi: "",
    Valuta: "",
    Detajet: "",
    Kategoria: "",
    FotoSource: ""
}

// Krijimi i funksionit AddEditProduct duke perdorur React hooks
const AddEditProduct = () => {

    // Deklarimi i useState hook per ruajtjen e gjendjes se komponentit
    const [state, setState] = useState(initialState);

    // Deklarimi i variablave Emri, Cmimi, Detajet, Kategoria dhe FotoSource dhe i destrukturojme nga gjendja e komponentit
    const { Emri, Cmimi, Valuta, Detajet, Kategoria, FotoSource } = state;

    // Deklarimi i useNavigate hook per te kaluar ne nje faqe tjeter
    const navigate = useNavigate();

    // Deklarimi i useParams hook per te marre nje parameter nga URL
    const { idproduct } = useParams();

    // Deklarimi i useEffect hook per te ekzekutuar nje kerkese pasi komponenti eshte renderizuar per here te pare
    useEffect(() => {
        axios.get(`http://localhost:6001/api/product/get/${idproduct}`)
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((err) => console.log(err));
    }, [idproduct]);


    // Deklarimi i funksionit handleSubmit per te shtuar ose perditesuar nje produkt
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        // Kontrolli i plotesimit te te gjitha fushave te formes
        if (!Emri || !Cmimi || !Valuta || !Detajet || !Kategoria || !FotoSource) {
            toast.error("Please fill out all the fields");
        } else {
            if (!idproduct) {
                // Nese produkti nuk ekziston, kryejme nje post request per ta shtuar
                axios.post('http://localhost:6001/api/product/post', {
                    Emri,
                    Cmimi,
                    Valuta,
                    Detajet,
                    Kategoria,
                    FotoSource
                }).then(() => {
                    setState({ ...state, Emri: "", Cmimi: "", Valuta: "", Detajet: "", Kategoria: "", FotoSource: "", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("Product Added Successfully");
            } else {
                // Nese produkti ekziston, kryejme nje put request per ta perditesuar
                axios.put(`http://localhost:6001/api/product/update/${idproduct}`, {
                    idproduct,
                    Emri,
                    Cmimi,
                    Valuta,
                    Detajet,
                    FotoSource
                }).then(() => {
                    setState({ ...state, Emri: "", Cmimi: "", Valuta: "", Detajet: "", Kategoria: "", FotoSource: "", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("Product Added Successfully");
            }

            // Kalohet ne faqen Admin pasi qe produkti eshte shtuar ose perditesuar
            setTimeout(() =>
                navigate("/Admin")
            )
        }
    };

    // Deklarimi i funksionit handleInputChange per te ruajtur ndryshimet ne input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    // Renderimi i HTML formes per te shtuar ose perditesuar nje produkt
    return (
        <div style={{ marginTop: "150px" }}>

            <h2>Add Edit</h2>

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
                <label htmlFor='Emri'>Emri</label>
                <input value={Emri || ""} onChange={handleInputChange} type="text" placeholder="Type name" id="emri" name="Emri"></input>

                <div className="product-box">
                    <label htmlFor='Cmimi'>Cmimi</label>
                    <input value={Cmimi || ""} onChange={handleInputChange} type="text" placeholder="Type price" id="cmimi" name="Cmimi"></input>
                </div>

                <div className="product-box">
                    <label htmlFor='Valuta'>Valuta</label>
                    <input value={Valuta || ""} onChange={handleInputChange} type="text" placeholder="Type currency" id="valuta" name="Valuta"></input>
                </div>

                <div className="product-box">
                    <label htmlFor='Detajet'>Detajet</label>
                    <input value={Detajet || ""} onChange={handleInputChange} type="text" placeholder="Type details" id="detajet" name="Detajet"></input>
                </div>

                <div className="product-box">
                    <label htmlFor='Kategoria'>Kategoria</label>
                    <input value={Kategoria || ""} onChange={handleInputChange} type="text" placeholder="Type category" id="kategoria" name="Kategoria"></input>
                </div>

                <div className="product-box">
                    <label htmlFor="FotoSource">FotoSource</label>
                    <input value={FotoSource || ""} onChange={handleInputChange} type="text" placeholder="Type photo source" id="fotosource" name="FotoSource"></input>
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