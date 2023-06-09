import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddEditSlideshowStyle.css";

const initialState = {
    EmriFoto: "",
    Foto: undefined,
};

const AddEditSlideshow = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { idslideshow } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        // Client-side validation
        if (!state.EmriFoto || !state.Foto) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("EmriFoto", state.Emri);
            formData.append("Foto", state.Foto);

            const url = idslideshow
                ? `http://localhost:6001/api/slideshow/update/${idslideshow}`
                : "http://localhost:6001/api/slideshow/post";

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response:", response.data);

            setState(initialState);
            toast.success(idslideshow ? "Slideshow Photo Updated Successfully" : "Slideshow Photo Added Successfully");
            navigate("/Admin");
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
        const { name, value, files } = e.target;

        if (name === "Foto") {
            setState((prevState) => ({ ...prevState, Foto: files[0] }));
        } else {
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <h2>Add/Edit</h2>
            <form action="/" encType="multipart/form-data" method="post"
                style={{
                    margin: "auto",
                    padding: "25px",
                    paddingRight: "40px",
                    maxWidth: "400px",
                    alignContent: "center",
                    backgroundColor: "#1e1f1e",
                    color: "white",
                    borderRadius: "10px",
                }}
                onSubmit={handleSubmit}
            >
                <div className="product-box">
                    <label htmlFor="EmriFoto">EmriFoto</label>
                    <input value={state.EmriFoto || ""} onChange={handleInputChange} type="text" placeholder="Type name" id="emrifoto" name="EmriFoto"></input>
                </div>

                <div className="product-box">
                    <label htmlFor="Foto">Foto</label>
                    <input onChange={handleInputChange} type="file" id="foto" name="Foto" accept="image/*" />
                </div>


                <input id="submit-button" type="submit" value={idslideshow ? "Update" : "Save"} />
                <Link to="/Admin">
                    <input id="goback-button" type="button" value="Go Back"></input>
                </Link>
            </form>
        </div>
    );
}

export default AddEditSlideshow;