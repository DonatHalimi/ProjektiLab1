import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddEditSlideshowStyle.css";

// Krijojme nje objekt qe permban te dhenat fillestare te fotove te slideshow
const initialState = {
    EmriFoto: "",
    Foto: undefined,
    FotoFile: null,
};

// Krijimi i funksionit AddEditSlideshow per te shtuar dhe perditesuar fotot e slideshow
const AddEditSlideshow = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { idslideshow } = useParams();

    // Krijojme nje useEffect per te marrur dhe shfaqur te dhenat e slideshow nga databaza
    useEffect(() => {
        const fetchSlideshowData = async () => {
            if (idslideshow) {
                try {
                    const response = await axios.get(`http://localhost:6001/api/slideshow/get/${idslideshow}`);
                    const { EmriFoto, Foto } = response.data[0];
                    setState({ EmriFoto, Foto, FotoFile: null });
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        };

        fetchSlideshowData();
    }, [idslideshow]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        // Validimi ne ane te klientit
        if (!state.EmriFoto || (!state.Foto && !state.FotoFile)) {
            toast.error("Ju lutemi plotësoni të gjitha fushat");
            return;
        }

        try {
            // Krijimi i nje objekti FormData per te derguar te dhenat e slideshow dhe foton si form-data
            const formData = new FormData();
            formData.append("EmriFoto", state.EmriFoto);

            // Shtimi i imazhit ekzistues ose te dosjes te zgjedhur ne FormData
            if (state.FotoFile) {
                formData.append("Foto", state.FotoFile);
            } else if (state.Foto) {
                formData.append("Foto", state.Foto);
            }

            // Krijimi i URL-se se kerkeses bazuar ne ekzistencen e idslideshow (Nese ekziston behet update, nese jo shtohet nje slideshow)
            const url = idslideshow
                ? `http://localhost:6001/api/slideshow/update/${idslideshow}`
                : "http://localhost:6001/api/slideshow/post";

            // Dergimi i te dhenave per ruajtjen e produktit ne server
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response:", response.data);

            // Pastrojme formen dhe shfaqim njoftimin per sukses
            setState(initialState);
            toast.success(idslideshow ? "Fotoja është perditësuar me sukses!" : "Fotoja është shtuar me sukses!");

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
        if (name === "Foto") {
            setState((prevState) => ({ ...prevState, Foto: files[0], FotoFile: files[0] }));
        } else {
            // Perndryshe, ruajme te dhenat e tjera te input fields ne state
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    // Renderimi i HTML formes per te shtuar ose perditesuar nje slideshow foto
    return (
        <div style={{ marginTop: "150px" }}>
            <h2>{idslideshow ? "Edit" : "Add"}</h2>
            <form action="/" encType="multipart/form-data" method="post"
                style={{
                    margin: "auto",
                    padding: "25px",
                    paddingRight: "40px",
                    paddingTop: "30px",
                    maxWidth: "400px",
                    alignContent: "center",
                    backgroundColor: "#1e1f1e",
                    color: "white",
                    borderRadius: "10px",
                }}
                onSubmit={handleSubmit}
            >
                <div className="product-box">
                    <label htmlFor="emrifoto" className="input-label">EmriFoto</label>
                    <input value={state.EmriFoto || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj emrin" id="emrifoto" name="EmriFoto"></input>
                </div>

                <div className="product-box">
                    <label htmlFor="foto" className="input-label">Foto</label>
                    <input onChange={handleInputChange} type="file" id="foto" name="Foto" accept="image/*" />
                </div>


                <input id="submit-button" type="submit" value={idslideshow ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input id="goback-button" type="button" value="Cancel"></input>
                </Link>
            </form>

            <div style={{height: "460px"}}></div>
        </div>
    );
}

export default AddEditSlideshow;