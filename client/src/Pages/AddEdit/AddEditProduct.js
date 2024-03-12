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
  idsupplier: "",
  suppliers: [],
  idbrand: "",
  brands: [],
};

// Krijimi i funksionit AddEditProduct per te shtuar dhe perditesuar produkte
const AddEditProduct = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { idproduct } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      let fileReader;
      try {
        if (idproduct) {
          const response = await axios.get(`http://localhost:6001/api/product/get/${idproduct}`);
          const productData = response.data[0];

          // Check if the product has a photo
          if (productData.Foto) {
            console.log("productData.Foto:", productData.Foto);
            fileReader = new FileReader();

            fileReader.onloadend = () => {
              console.log("fileReader.onloadend called");
              // Check if the result is a valid base64 string
              if (fileReader.result && fileReader.result.split(',')[1]) {
                const base64String = fileReader.result.split(',')[1];

                // Set the fotoName property in the state
                setState((prevState) => ({
                  ...prevState,
                  ...productData,
                  fotoName: productData.Foto.name,
                  existingFoto: base64String,
                }));

                // Append to formData
                let formData = new FormData();
                formData.append("id", productData.id);
                formData.append("Emri", productData.Emri);
                formData.append("Cmimi", productData.Cmimi);
                formData.append("Valuta", productData.Valuta);
                formData.append("Detajet", productData.Detajet);
                formData.append("Foto", productData.Foto);
                formData.append("idcategory", productData.idcategory);
                formData.append("idsupplier", productData.idsupplier);
                formData.append("idbrand", productData.idbrand);

                // Log formData after append inside the callback
                console.log("FormData:", formData);
              } else {
                console.error("Invalid file type. Expected base64 string.");
              }
            };

            fileReader.readAsDataURL(new Blob([new Uint8Array(productData.Foto.data)]));
          } else {
            // If not, set the state without fotoName and existingFoto
            setState((prevState) => ({
              ...prevState,
              ...productData,
              fotoName: '',
              existingFoto: '',
            }));
          }
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

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:6001/api/suppliers/get");
        setState((prevState) => ({
          ...prevState,
          suppliers: response.data,
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:6001/api/brands/get");
        setState((prevState) => ({
          ...prevState,
          brands: response.data,
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrands();
  }, []);

  // Funksioni qe thirret kur formulari dergohet (submit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    // Validimi ne ane te klientit
    if (!state.id || !state.Emri || !state.Cmimi || !state.Valuta || !state.Detajet || !state.Foto || !state.idcategory || !state.idsupplier || !state.idbrand) {
      toast.error("Ju lutemi plotësoni të gjitha fushat");
      return;
    }

    try {
      // Krijimi i nje objekti FormData per te derguar te dhenat e produktit dhe foton (nese ka) si form-data
      console.log("State Before FormData Append:", state);
      let formData = new FormData();

      // Append to formData
      formData.append("id", state.id);
      formData.append("Emri", state.Emri);
      formData.append("Cmimi", state.Cmimi);
      formData.append("Valuta", state.Valuta);
      formData.append("Detajet", state.Detajet);
      formData.append("Foto", state.Foto);
      formData.append("idcategory", state.idcategory);
      formData.append("idsupplier", state.idsupplier);
      formData.append("idbrand", state.idbrand);

      // Log formData after append inside the callback
      console.log("FormData:", formData);

      // Krijimi i URL-se se kerkeses bazuar ne ekzistencen e id-se (Nese ekziston behet update, nese jo shtohet nje produkt)
      const url = state.idproduct
        ? `http://localhost:6001/api/product/update/${state.id}`
        : "http://localhost:6001/api/product/post";

      console.log("Request URL:", url);

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
      navigate("/admin/products");
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

    if (name === "Foto") {
      if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          setState((prevState) => ({
            ...prevState,
            Foto: file,
            existingFoto: base64String,
          }));
        };

        reader.readAsDataURL(file);
      } else {
        setState((prevState) => ({
          ...prevState,
          Foto: undefined,
          existingFoto: '',
        }));
      }
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  console.log("Base64 String:", state.Foto);

  const imageUrl = `data:image/jpeg;base64,${state.Foto}`;

  // Renderimi i HTML formes per te shtuar ose perditesuar nje produkt
  return (
    <div style={{ marginTop: "10px", transform: 'scale(0.9)' }}>
      <h2>{idproduct ? "Edit" : "Add"} Product</h2>
      {state && (
        <form action="/" encType="multipart/form-data" method="post"
          style={{
            margin: "auto",
            marginTop: "20px",
            padding: "25px",
            paddingRight: "30px",
            paddingTop: "30px",
            maxWidth: "387px",
            alignContent: "center",
            backgroundColor: "#1e1f1e",
            color: "white",
            borderRadius: "10px",
            height: "auto",
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
            <select value={state.idcategory} onChange={handleInputChange} name="idcategory">
              <option value="" disabled hidden>Select a category</option>
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
            <input onChange={handleInputChange} type="file" id="foto" name="Foto" accept="image/*" />
            {state.Foto && (
              <span className="file-name">{state.Foto.name}</span>
            )}

            {state.existingFoto && (
              <img src={`data:image/jpeg;base64,${state.existingFoto}`} alt="Existing Product" style={{ maxWidth: '100%', height: 'auto' }} />
            )}
          </div>

          <div className="product-box">
            <label htmlFor="supplierDropdown" className="input-label">Supplier</label>
            <select value={state.idsupplier} onChange={handleInputChange} name="idsupplier">
              <option value="" disabled hidden>Select a supplier</option>
              {state.suppliers && state.suppliers.length > 0 &&
                state.suppliers.map((supplier) => (
                  <option key={supplier.SupplierId} value={supplier.SupplierId}>
                    {supplier.Name}
                  </option>
                ))}
            </select>
          </div>

          <div className="product-box">
            <label htmlFor="brandDropdown" className="input-label">Brand</label>
            <select value={state.idbrand} onChange={handleInputChange} name="idbrand">
              <option value="" disabled hidden>Select a brand</option>
              {state.brands && state.brands.length > 0 &&
                state.brands.map((brand) => (
                  <option key={brand.BrandId} value={brand.BrandId}>
                    {brand.Name}
                  </option>
                ))}
            </select>
          </div>

          <input id="submit-button" type="submit" value={idproduct ? "Update" : "Save"} />
          <Link to="/admin/products">
            <input id="goback-button" type="button" value="Cancel" />
          </Link>
        </form>
      )}
    </div>
  );
};

export default AddEditProduct;