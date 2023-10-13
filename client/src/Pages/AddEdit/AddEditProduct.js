import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

// Krijojme nje objekt qe permban te dhenat fillestare te produktit
const initialState = {
  id: "",
  Emri: "",
  Cmimi: "",
  Valuta: "",
  Detajet: "",
  Foto: undefined,
  idcategory: "",
  categories: [],
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

  // Krijojme nje useEffect per te marrur dhe shfaqur te dhenat e kategorive
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:6001/api/category/get");
        setState((prevState) => ({
          ...prevState,
          categories: response.data,
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Funksioni qe thirret kur formulari dergohet (submit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    // Validimi ne ane te klientit
    if (!state.id || !state.Emri || !state.Cmimi || !state.Valuta || !state.Detajet || !state.Foto || !state.idcategory) {
      toast.error("Ju lutemi plotësoni të gjitha fushat");
      return;
    }

    try {
      // Krijimi i nje objekti FormData per te derguar te dhenat e produktit dhe foton (nese ka) si form-data
      const formData = new FormData();
      formData.append("id", state.id);
      formData.append("Emri", state.Emri);
      formData.append("Cmimi", state.Cmimi);
      formData.append("Valuta", state.Valuta);
      formData.append("Detajet", state.Detajet);
      formData.append("Foto", state.Foto);
      formData.append("idcategory", state.idcategory);

      // Krijimi i URL-se se kerkeses bazuar ne ekzistencen e id-se (Nese ekziston behet update, nese jo shtohet nje produkt)
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
      toast.success(idproduct ? "Produkti është perditësuar me sukses!" : "Produkti është shtuar me sukses!");

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
  // handleInputChange I VJETER
  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  //   console.log("Input changed - Name:", name, "Value:", value);

  //   // Nese ndryshimi eshte per foton, ruajme foton si file ne state
  //   if (name === "Foto") {
  //     console.log("Changing Foto - Files:", files);
  //     setState((prevState) => ({ ...prevState, Foto: files[0] }));
  //   } else {
  //     // Perndryshe, ruajme te dhenat e tjera te input fields ne state
  //     setState((prevState) => ({ ...prevState, [name]: value }));
  //   }
  // };

  // Funksioni qe thirret kur ndodh ndryshimi ne input fields
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log("Input changed - Name:", name, "Value:", value);
  
    // Nese ndryshimi eshte per foton, ruajme foton si file ne state
    if (name === "Foto") {
      console.log("Changing Foto - Files:", files);
  
      if (files.length > 0) {
        // Merre file-in e pare prej listes se file-ave
        const file = files[0];
  
        // Lexoje file-in edhe konvertoje ne base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          // Beje update state me te dhenat base64 te foto-se
          setState((prevState) => ({
            ...prevState,
            Foto: file, // This should store the file object
            fotoName: file.name, // Add a property to store the file name
          }));
        };
  
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };
      } else {
        // Nese nuk zgjedhet asnje file, fshije state
        setState((prevState) => ({
          ...prevState,
          Foto: null,
          fotoName: '', // Clear the file name
        }));
      }
    } else {
      // Perndryshe, ruajme te dhenat e tjera te input fields ne state
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Renderimi i HTML formes per te shtuar ose perditesuar nje produkt
  return (
        <div style={{ marginTop: "10px", transform: 'scale(0.9)' }}>
          <h2>{idproduct ? "Edit" : "Add"}</h2>
          {state && (
            <form action="/" encType="multipart/form-data" method="post"
              style={{
                margin: "auto",
                padding: "25px",
                paddingRight: "30px",
                paddingTop: "30px",
                maxWidth: "387px",
                alignContent: "center",
                backgroundColor: "#1e1f1e",
                color: "white",
                borderRadius: "10px",
              }}
              onSubmit={handleSubmit}
            >
              <div className="product-box">
                <label htmlFor="id" className="input-label">ID</label>
                <input value={state.id || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj id" id="id" name="id"></input>
              </div>
              <div className="product-box">
                <label htmlFor="emri" className="input-label">Emri</label>
                <input value={state.Emri || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj emrin" id="emri" name="Emri"></input>
              </div>

              <div className="product-box">
                <label htmlFor='cmimi' className="input-label">Çmimi</label>
                <input value={state.Cmimi || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj çmimin" id="cmimi" name="Cmimi"></input>
              </div>

              <div className="product-box">
                <label htmlFor='valuta' className="input-label">Valuta</label>
                <input value={state.Valuta || ""} onChange={handleInputChange} type="text" placeholder="Shkruaj valutën" id="valuta" name="Valuta"></input>
              </div>

              <div className="product-box">
                <label htmlFor="categoryDropdown" className="input-label">Kategoria</label>
                <select id="categoryDropdown" value={state.idcategory} onChange={handleInputChange} name="idcategory">
                  <option value="" disabled selected hidden>Zgjedh kategorinë</option>
                  {state.categories && state.categories.length > 0 &&
                    state.categories.map((category) => (
                      <option key={category.idcategory} value={category.idcategory}>
                        {category.EmriKategorise}
                      </option>
                    ))}
                </select>
              </div>

              <div className="product-box">
                <label htmlFor="detajet" className="input-label detajet-label">Detajet</label>
                <textarea value={state.Detajet || ""} onChange={handleInputChange} placeholder="Shkruaj detajet" id="detajet" name="Detajet" rows={10} cols={45} style={{ marginLeft: "8px", textAlign: "justify", width: "345px" }}></textarea>
              </div>

              <div className="product-box">
                <label htmlFor="foto" className="input-label">Foto</label>
                <input onChange={handleInputChange} type="file" id="foto" name="Foto" accept="image/*" value={state.Foto ? state.Foto.name : ''} />
              </div>

              <input id="submit-button" type="submit" value={idproduct ? "Update" : "Save"} />
              <Link to="/admin/products">
                <input id="goback-button" type="button" value="Cancel" />
              </Link>
            </form>
          )}
        </div>
  );
}

export default AddEditProduct;