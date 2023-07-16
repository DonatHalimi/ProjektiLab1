import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddEditProductStyle.css";

// Krijojme nje objekt qe permban te dhenat fillestare te produktit
const initialState = {
  Emri: "",
  Cmimi: "",
  Valuta: "",
  Kategoria: "",
  Detajet: "",
  Foto: undefined,
};

// Krijimi i funksionit AddEditProduct per te shtuar dhe perditesuar produkte
const AddEditProduct = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { idproduct } = useParams();

  // Krijojme nje useEffect per te marrur dhe shfaqur te dhenat e produktit
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (idproduct) {
          const response = await axios.get(`http://localhost:6001/api/product/get/${idproduct}`);
          const productData = response.data[0];
          setState(productData);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [idproduct]);

  // Funksioni qe thirret kur formulari dergohet (submit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    // Validimi ne ane te klientit
    if (!state.Emri || !state.Cmimi || !state.Valuta || !state.Kategoria || !state.Detajet || !state.Foto) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Krijimi i nje objekti FormData per te derguar te dhenat e produktit dhe foton (nese ka) si form-data
      const formData = new FormData();
      formData.append("Emri", state.Emri);
      formData.append("Cmimi", state.Cmimi);
      formData.append("Valuta", state.Valuta);
      formData.append("Kategoria", state.Kategoria);
      formData.append("Detajet", state.Detajet);
      formData.append("Foto", state.Foto);

      // Krijimi i URL-se se kerkeses bazuar ne ekzistencen e idproduct (Nese ekziston behet update, nese jo shtohet nje produkt)
      const url = idproduct
        ? `http://localhost:6001/api/product/update/${idproduct}`
        : "http://localhost:6001/api/product/post";

      // Dergimi i te dhenave per ruajtjen e produktit ne server
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);

      // Pastrojme formen dhe shfaqim njoftimin per sukses
      setState(initialState);
      toast.success(idproduct ? "Product Updated Successfully" : "Product Added Successfully");

      // Navigimi prapa ne faqen e Admin-it pasi perditesimi/shtimi perfundon
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

  // Funksioni qe thirret kur ndodh ndryshimi ne input fields
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Nese ndryshimi eshte per foton, ruajme foton si file ne state
    if (name === "Foto") {
      setState((prevState) => ({ ...prevState, Foto: files[0] }));
    } else {
      // Perndryshe, ruajme te dhenat e tjera te input fields ne state
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Renderimi i HTML formes per te shtuar ose perditesuar nje produkt
  return (
    <div style={{ marginTop: "80px" }}>
      <h2>{idproduct ? "Edit" : "Add"}</h2>
      <form action="/" encType="multipart/form-data" method="post"
        style={{
          margin: "auto",
          padding: "25px",
          paddingRight: "30px",
          maxWidth: "400px",
          alignContent: "center",
          backgroundColor: "#1e1f1e",
          color: "white",
          borderRadius: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <div className="product-box">
          <label htmlFor="emri">Emri</label>
          <input value={state.Emri || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj emrin" id="emri" name="Emri"></input>
        </div>

        <div className="product-box">
          <label htmlFor='cmimi'>Çmimi</label>
          <input value={state.Cmimi || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj çmimin" id="cmimi" name="Cmimi"></input>
        </div>

        <div className="product-box">
          <label htmlFor='valuta'>Valuta</label>
          <input value={state.Valuta || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj valutën" id="valuta" name="Valuta"></input>
        </div>

        <div className="product-box">
          <label htmlFor='kategoria'>Kategoria</label>
          <input value={state.Kategoria || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj kategorinë" id="kategoria" name="Kategoria"></input>
        </div>
        <div className="product-box">
          <label htmlFor="detajet">Detajet</label>
          <textarea value={state.Detajet || ""} onChange={handleInputChange} placeholder="Shkruaj detajet" id="detajet" name="Detajet" rows={10} cols={45} style={{ marginLeft: "8px", textAlign: "justify", width: "345px" }}></textarea>
        </div>

        <div className="product-box">
          <label htmlFor="foto">Foto</label>
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