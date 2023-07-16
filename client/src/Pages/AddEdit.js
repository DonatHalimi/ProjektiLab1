import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/AddEditStyle.css";

// Krijojme nje objekt qe permban te dhenat fillestare te perdoruesit
const initialState = {
    Name: "",
    Surname: "",
    Email: "",
    Password: "",
    Role: ""
}

// Krijimi i funksionit AddEdit per te shtuar dhe perditesuar perdorues
const AddEdit = () => {

    // Definimi i state me useState hook dhe destruktirimi i elementeve te states
    const [state, setState] = useState(initialState);
    const { Name, Surname, Email, Password, Role } = state;

    // Definimi i hooks per te kaluar ne nje faqe tjeter dhe per te marrur ID
    const navigate = useNavigate();
    const { id } = useParams();

    // Krijojme nje useEffect per te marrur dhe shfaqur te dhenat e perdoruesit
    useEffect(() => {
        axios.get(`http://localhost:6001/api/user/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((err) => console.log(err));
    }, [id]);


    // Funksioni qe thirret kur formulari dergohet (submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        // Validimi ne ane te klientit
        if (!Name || !Surname || !Email || !Password || !Role) {
            toast.error("Please fill out all the fields");
        } else {
            // Dergojme kerkesen duke u bazuar ne ekzistencen e id
            const requestPromise = id
                ? axios.put(`http://localhost:6001/api/user/update/${id}`, { id, Name, Surname, Email, Password, Role })
                : axios.post(`http://localhost:6001/api/user/post`, { Name, Surname, Email, Password, Role });

            // Ekzekutojme kerkesen
            requestPromise
                .then(() => {
                    setState({ ...state, Name: "", Surname: "", Email: "", Password: "", Role: "" });
                    if (id) {
                        toast.success("Përdoruesi është perditësuar me sukses!");
                    } else {
                        toast.success("Përdoruesi është shtuar me sukses!");
                    }
                    setTimeout(() => navigate("/Admin"), 500); // Kalohet ne faqen Admin pasi qe id eshte shtuar ose perditesuar
                })
                .catch((err) => toast.error(err.response.data));
        }
    };

    // Deklarimi i funksionit handleInputChange per te ruajtur ndryshimet ne input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    // Renderimi i HTML formes per te shtuar ose perditesuar nje user
    return (
        <div style={{ marginTop: "150px" }}>
            <h2>{id ? "Edit" : "Add"}</h2>
            <form style={{
                margin: "auto",
                padding: "25px",
                paddingTop: "50px",
                paddingRight: "40px",
                maxWidth: "387px",
                alignContent: "center",
                backgroundColor: "#222",
                color: "white",
                borderRadius: "10px"
            }}
                onSubmit={handleSubmit}
            >

                <div className="user-box">
                    <label htmlFor='Name' className="input-label">Emri</label>
                    <input value={Name || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj emrin" id="name" name="Name"></input>
                </div>

                <div className="user-box">
                    <label htmlFor='Surname' className="input-label">Mbiemri</label>
                    <input value={Surname || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj mbiemrin" id="surname" name="Surname"></input>
                </div>

                <div className="user-box">
                    <label htmlFor='Email' className="input-label">E-mail</label>
                    <input value={Email || ""} onChange={handleInputChange} type="email" placeholder="Shkruaj e-mail" id="Email" name="Email"></input>
                </div>

                <div className="user-box">
                    <label htmlFor="Password" className="input-label">Password</label>
                    <input value={Password || ""} onChange={handleInputChange} type="password" placeholder="Shkruaj password" id="password" name="Password"></input>
                </div>

                <div className="user-box">
                    <label htmlFor="Role" className="input-label">Role</label>
                    <select value={Role || ""} onChange={handleInputChange} id="role" name="Role">
                        <option value="" disabled selected hidden>Zgjedh rolin</option>
                        <option value="2">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>

                <input id="submit-button" type="submit" value={id ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input id="goback-button" type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
};

export default AddEdit;