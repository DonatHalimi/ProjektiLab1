import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddEditProductStyle.css";

const initialState = {
  id: "",
  Emri: "",
  Cmimi: "",
  Valuta: "",
  Detajet: "",
  Foto: null,
  existingFoto: "",
  idcategory: "",
  categories: [],
  idsupplier: "",
  suppliers: [],
  idbrand: "",
  brands: [],
};

const AddEditProduct = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { idproduct } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (idproduct) {
          console.log(`Fetching data for product ID: ${idproduct}`);
          const response = await axios.get(
            `http://localhost:6001/api/product/get/${idproduct}`
          );
          const productData = response.data[0];
          console.log("Product data fetched:", productData);

          if (productData.Foto) {
            console.log("productData.Foto:", productData.Foto);
            const fileReader = new FileReader();

            fileReader.onloadend = () => {
              console.log("fileReader.onloadend called");
              // Check if the result is a valid base64 string
              if (fileReader.result && fileReader.result.split(',')[1]) {
                const base64String = fileReader.result.split(',')[1];

                // Set the fotoName property in the state
                setState((prevState) => ({
                  ...prevState,
                  ...productData,
                  existingFoto: `data:image/jpeg;base64,${base64String}`,
                }));
              } else {
                console.error("Invalid file type. Expected base64 string.");
              }
            };

            fileReader.readAsDataURL(new Blob([new Uint8Array(productData.Foto.data)]));
          } else {
            // If not, set the state without existingFoto
            setState((prevState) => ({
              ...prevState,
              ...productData,
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories");
        const response = await axios.get(
          "http://localhost:6001/api/category/get"
        );
        console.log("Categories fetched:", response.data);
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
        console.log("Fetching suppliers");
        const response = await axios.get(
          "http://localhost:6001/api/suppliers/get"
        );
        console.log("Suppliers fetched:", response.data);
        setState((prevState) => ({
          ...prevState,
          suppliers: response.data,
        }));
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        console.log("Fetching brands");
        const response = await axios.get(
          "http://localhost:6001/api/brands/get"
        );
        console.log("Brands fetched:", response.data);
        setState((prevState) => ({
          ...prevState,
          brands: response.data,
        }));
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    if (
      !state.id || !state.Emri || !state.Cmimi || !state.Valuta || !state.Detajet || (!state.Foto && !state.existingFoto) || !state.idcategory || !state.idsupplier || !state.idbrand) {
      toast.error("Ju lutemi plotësoni të gjitha fushat");
      console.log("Form validation failed");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("id", state.id);
      formData.append("Emri", state.Emri);
      formData.append("Cmimi", state.Cmimi);
      formData.append("Valuta", state.Valuta);
      formData.append("Detajet", state.Detajet);
      if (state.Foto) formData.append("Foto", state.Foto);
      formData.append("idcategory", state.idcategory);
      formData.append("idsupplier", state.idsupplier);
      formData.append("idbrand", state.idbrand);

      console.log("Submitting form data:", {
        id: state.id,
        Emri: state.Emri,
        Cmimi: state.Cmimi,
        Valuta: state.Valuta,
        Detajet: state.Detajet,
        idcategory: state.idcategory,
        idsupplier: state.idsupplier,
        idbrand: state.idbrand,
      });

      const url = idproduct
        ? `http://localhost:6001/api/product/update/${idproduct}`
        : "http://localhost:6001/api/product/post";

      console.log("Submitting form data to URL:", url);

      const response = await axios({
        method: idproduct ? "put" : "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);

      setState(initialState);
      toast.success(
        idproduct
          ? "Produkti është përditësuar me sukses!"
          : "Produkti është shtuar me sukses!"
      );
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log("Input changed:", name, value, files);

    if (name === "Foto") {
      if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          console.log("File read successfully:", reader.result);
          setState((prevState) => ({
            ...prevState,
            Foto: file,
            existingFoto: reader.result,
          }));
        };

        reader.readAsDataURL(file);
      } else {
        setState((prevState) => ({
          ...prevState,
          Foto: null,
          existingFoto: "",
        }));
      }
    } else if (name === "idcategory") {
      setState((prevState) => ({
        ...prevState,
        idcategory: value, // Directly set the value as it should be the ID
      }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <div style={{ marginTop: "10px", transform: "scale(0.9)" }}>
      <h2>{idproduct ? "Edit" : "Add"} Product</h2>
      {state && (
        <form
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
            <label htmlFor="id" className="input-label">
              ID
            </label>
            <input
              value={state.id || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Shkruaj id"
              id="id"
              name="id"
            />
          </div>
          <div className="product-box">
            <label htmlFor="emri" className="input-label">
              Emri
            </label>
            <input
              value={state.Emri || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Shkruaj emrin"
              id="emri"
              name="Emri"
            />
          </div>
          <div className="product-box">
            <label htmlFor="cmimi" className="input-label">
              Çmimi
            </label>
            <input
              value={state.Cmimi || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Shkruaj çmimin"
              id="cmimi"
              name="Cmimi"
            />
          </div>
          <div className="product-box">
            <label htmlFor="valuta" className="input-label">
              Valuta
            </label>
            <input
              value={state.Valuta || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Shkruaj valuten"
              id="valuta"
              name="Valuta"
            />
          </div>

          <div className="product-box">
            <label htmlFor="detajet" className="input-label detajet-label">Detajet</label>
            <textarea value={state.Detajet || ""} onChange={handleInputChange} placeholder="Shkruaj detajet" id="detajet" name="Detajet" rows={10} cols={45} style={{ marginLeft: "8px", textAlign: "justify", width: "345px" }}></textarea>
          </div>

          <div className="product-box">
            <label htmlFor="foto" className="input-label">
              Foto
            </label>
            <input
              type="file"
              placeholder="Zgjidh foton"
              id="foto"
              name="Foto"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          {state.existingFoto && (
            <img
              src={state.existingFoto}
              alt="Existing Product"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <div className="product-box">
            <label htmlFor="categoryDropdown" className="input-label">
              Category
            </label>
            <select
              value={state.idcategory}
              onChange={handleInputChange}
              name="idcategory"
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              {state.categories &&
                state.categories.length > 0 &&
                state.categories.map((category) => (
                  <option key={category.idcategory} value={category.idcategory}>
                    {category.EmriKategorise}
                  </option>
                ))}
            </select>
          </div>
          <div className="product-box" style={{ marginTop: '15px' }}>
            <label htmlFor="supplierDropdown" className="input-label">Supplier</label>
            <select value={state.idsupplier} onChange={handleInputChange} name="idsupplier">
              <option value="" disabled hidden>Select a supplier</option>
              {state.suppliers &&
                state.suppliers.length > 0 &&
                state.suppliers.map((supplier) => (
                  <option
                    key={supplier.SupplierId}
                    value={supplier.SupplierId}
                  >
                    {supplier.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="product-box" style={{ marginTop: '15px' }}>
            <label htmlFor="brandDropdown" className="input-label">
              Brand
            </label>
            <select
              value={state.idbrand}
              onChange={handleInputChange}
              name="idbrand"
            >
              <option value="" disabled hidden>
                Select a brand
              </option>
              {state.brands &&
                state.brands.length > 0 &&
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
