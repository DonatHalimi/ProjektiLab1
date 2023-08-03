import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/AddEditAboutUsStyle.css";

// Inicializimi i nje objekti i cili ka fushat per shtimin e nje teksti te ri
const initialState = {
    teksti: ""
}

// Krijimi i funksionit AddEditAboutUs per te shtuar ose perditesuar about us page
const AddEditAboutUs = () => {
    const [state, setState] = useState(initialState);
    const { teksti } = state;
    const navigate = useNavigate();
    const { idaboutus } = useParams();

    // Krijojme nje useEffect per te marrur dhe shfaqur te dhenat e about us page nga databaza
    useEffect(() => {
        axios.get(`http://localhost:6001/api/aboutus/get/${idaboutus}`)
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((err) => console.log(err));
    }, [idaboutus]);


    // Funksioni qe thirret kur formulari dergohet (submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        // Kontrolli i plotesimit te te gjitha fushave te formes
        if (!teksti) {
            toast.error("Ju lutemi plotësoni të gjitha fushat");
        } else {
            // Dergojme kerkesen bazuar ne ekzistencen e idaboutus
            const requestPromise = idaboutus
                ? axios.put(`http://localhost:6001/api/aboutus/update/${idaboutus}`, { idaboutus, teksti })
                : axios.post('http://localhost:6001/api/aboutus/post', { teksti });

            // Ekzekutojme kerkesen
            requestPromise
                .then(() => {
                    setState({ ...state, teksti: "" });
                    const successMessage = idaboutus ? "Teksti është perditësuar me sukses!" : "Teksti është shtuar me sukses!";
                    toast.success(successMessage);
                    setTimeout(() => navigate("/Admin"), 500); // Kalohet ne faqen Admin pasi qe teksti eshte shtuar ose perditesuar
                })
                .catch((err) => toast.error(err.response.data));
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

            <h2>{idaboutus ? "Edit" : "Add"}</h2>
            <form style={{
                margin: "auto",
                padding: "25px",
                paddingRight: "40px",
                paddingTop: "50px",
                maxWidth: "400px",
                alignContent: "center",
                backgroundColor: "#1e1f1e",
                color: "white",
                borderRadius: "10px"
            }}
                onSubmit={handleSubmit}
            >

                <div className="user-box">
                    <label htmlFor="teksti" className="input-label">Teksti</label>
                    <textarea value={teksti || ""} onChange={handleInputChange} placeholder="Shkruaj tekstin" id="teksti" name="teksti" rows={20} cols={100} style={{ marginLeft: "8px", textAlign: "justify", width: "340px" }}></textarea>
                </div>

                <input id="submit-button" type="submit" value={idaboutus ? "Update" : "Save"} />

                <Link to="/Admin">
                    <input id="goback-button" type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
};

export default AddEditAboutUs;