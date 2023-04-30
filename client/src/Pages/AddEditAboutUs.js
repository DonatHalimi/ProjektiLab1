import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditAboutUsStyle.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inicializimi i nje objekti i cili ka fushat per shtimin e nje teksti te ri
const initialState = {
    teksti: ""
}

// Krijimi i funksionit AddEditAboutUs duke perdorur React hooks
const AddEditAboutUs = () => {

    // Deklarimi i useState hook per ruajtjen e gjendjes se komponentit
    const [state, setState] = useState(initialState);

    // Deklarimi i variablave teksti duke i dekonstuktuar nga gjendja e komponentit
    const { teksti } = state;

    // Deklarimi i useNavigate hook per te kaluar ne nje faqe tjeter
    const navigate = useNavigate();

    // Deklarimi i useParams hook per te marre nje parameter nga URL
    const { idaboutus } = useParams();

    // Deklarimi i useEffect hook per te ekzekutuar nje kerkese pasi komponenti eshte renderizuar per here te pare
    useEffect(() => {
        axios.get(`http://localhost:6001/api/aboutus/get/${idaboutus}`)
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((err) => console.log(err));
    }, [idaboutus]);


    // Deklarimi i funksionit handleSubmit per te shtuar ose perditesuar tekstin
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");
        // Kontrolli i plotesimit te te gjitha fushave te formes
        if (!teksti) {
            toast.error("Please fill out all the fields");
        } else {
            if (!idaboutus) {
                // Nese teksti nuk ekziston, kryejme nje post request per ta shtuar
                axios.post('http://localhost:6001/api/post', {
                    teksti
                }).then(() => {
                    setState({ ...state, teksti: "", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("Text Added Successfully");
            } else {
                // Nese teksti ekziston, kryejme nje put request per ta perditesuar
                axios.put(`http://localhost:6001/api/aboutus/update/${idaboutus}`, {
                    idaboutus,
                    teksti
                }).then(() => {
                    setState({ ...state, teksti: "", })

                }).catch((err) => toast.error(err.response.data))
                toast.success("Text Added Successfully");
            }

            // Kalohet ne faqen Admin pasi qe teksti eshte shtuar ose perditesuar
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
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
                onSubmit={handleSubmit}
            >

                <div className="user-box">
                    <label htmlFor='teksti '>Teksti</label>
                    <input value={teksti || ""} onChange={handleInputChange} type="text" placeholder="Type teksti" id="teksti" name="teksti"></input>
                </div>

                <input type="submit" value={idaboutus ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
};

export default AddEditAboutUs;