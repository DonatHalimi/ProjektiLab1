import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddEditProductStyle.css";

const initialState = {
  Emri: "",
  Cmimi: "",
  Valuta: "",
  Kategoria: "",
  Detajet: "",
  Foto: undefined,
};

const AddEditProduct = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { idproduct } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    // Client-side validation
    if (!state.Emri || !state.Cmimi || !state.Valuta || !state.Kategoria || !state.Detajet || !state.Foto) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Emri", state.Emri);
      formData.append("Cmimi", state.Cmimi);
      formData.append("Valuta", state.Valuta);
      formData.append("Kategoria", state.Kategoria);
      formData.append("Detajet", state.Detajet);
      formData.append("Foto", state.Foto);

      const url = idproduct
        ? `http://localhost:6001/api/product/update/${idproduct}`
        : "http://localhost:6001/api/product/post";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);

      setState(initialState);
      toast.success(idproduct ? "Product Updated Successfully" : "Product Added Successfully");
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
      <h2>{idproduct ? "Edit" : "Add"}</h2>
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
          <label htmlFor="Emri">Emri</label>
          <input value={state.Emri || ""} onChange={handleInputChange} type="text" placeholder="Type name" id="emri" name="Emri"></input>
        </div>

        <div className="product-box">
          <label htmlFor='Cmimi'>Cmimi</label>
          <input value={state.Cmimi || ""} onChange={handleInputChange} type="text" placeholder="Type price" id="cmimi" name="Cmimi"></input>
        </div>

        <div className="product-box">
          <label htmlFor='Valuta'>Valuta</label>
          <input value={state.Valuta || ""} onChange={handleInputChange} type="text" placeholder="Type currency" id="valuta" name="Valuta"></input>
        </div>

        <div className="product-box">
          <label htmlFor='Kategoria'>Kategoria</label>
          <input value={state.Kategoria || ""} onChange={handleInputChange} type="text" placeholder="Type category" id="kategoria" name="Kategoria"></input>
        </div>

        <div className="product-box">
          <label htmlFor='Detajet'>Detajet</label>
          <input value={state.Detajet || ""} onChange={handleInputChange} type="text" placeholder="Type details" id="detajet" name="Detajet"></input>
        </div>

        <div className="product-box">
          <label htmlFor="Foto">Foto</label>
          <input onChange={handleInputChange} type="file" id="foto" name="Foto" accept="image/*" />
        </div>


        <input id="submit-button" type="submit" value={idproduct ? "Update" : "Save"} />
        <Link to="/Admin">
          <input id="goback-button" type="button" value="Go Back"></input>
        </Link>
      </form>
    </div>
  );
}

export default AddEditProduct;