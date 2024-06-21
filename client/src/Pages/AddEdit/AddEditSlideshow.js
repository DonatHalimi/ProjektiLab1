import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditSlideshowStyle.css";

const initialState = {
    EmriFoto: "",
    FotoFile: null,
    existingFoto: null,
};

const AddEditSlideshow = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { idslideshow } = useParams();

    useEffect(() => {
        const fetchSlideshowData = async () => {
            if (idslideshow) {
                try {
                    const response = await axios.get(`http://localhost:6001/api/slideshow/get/${idslideshow}`);
                    const slideshowData = response.data[0];

                    if (slideshowData.Foto) {
                        const base64Image = `data:image/jpeg;base64,${slideshowData.Foto}`;
                        console.log("Fetched Base64 Image:", base64Image); // Debugging: Log the base64 string
                        setState({
                            EmriFoto: slideshowData.EmriFoto,
                            existingFoto: base64Image,
                            FotoFile: null,
                        });
                    } else {
                        setState({
                            EmriFoto: slideshowData.EmriFoto,
                            existingFoto: null,
                            FotoFile: null,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching slideshow data:", error);
                }
            }
        };

        fetchSlideshowData();
    }, [idslideshow]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.EmriFoto) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("EmriFoto", state.EmriFoto);

            if (state.FotoFile) {
                formData.append("Foto", state.FotoFile);
            }

            const url = idslideshow
                ? `http://localhost:6001/api/slideshow/update/${idslideshow}`
                : "http://localhost:6001/api/slideshow/post";
            const method = idslideshow ? "PUT" : "POST";

            await axios({
                method,
                url,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(idslideshow ? "Slideshow updated successfully!" : "Slideshow added successfully!");
            navigate("/admin/slideshow");
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred");
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "Foto" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                console.log("Selected Base64 Image:", `data:image/jpeg;base64,${base64String}`); // Debugging: Log the base64 string
                setState((prevState) => ({
                    ...prevState,
                    FotoFile: file,
                    existingFoto: `data:image/jpeg;base64,${base64String}`,
                }));
            };

            reader.readAsDataURL(file);
        } else {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <h2>{idslideshow ? "Edit" : "Add"} Slideshow</h2>
            <form
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
                    <label htmlFor="emrifoto" className="input-label">
                        Emri
                    </label>
                    <input
                        value={state.EmriFoto}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Shkruaj emrin"
                        id="emrifoto"
                        name="EmriFoto"
                    />
                </div>

                <div className="product-box">
                    <label htmlFor="foto" className="input-label">
                        Foto
                    </label>
                    <input onChange={handleInputChange} type="file" id="foto" name="Foto" accept="image/*" />
                    {state.FotoFile && (
                        <span className="file-name">{state.FotoFile.name}</span>
                    )}

                    {state.existingFoto && (
                        <img
                            src={state.existingFoto}
                            alt="Existing Slideshow"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                </div>

                <input id="submit-button" type="submit" value={idslideshow ? "Update" : "Save"} />
                <Link to="/admin/slideshow">
                    <input id="goback-button" type="button" value="Cancel" />
                </Link>
            </form>
            <div style={{ height: "460px" }}></div>
        </div>
    );
};

export default AddEditSlideshow;
