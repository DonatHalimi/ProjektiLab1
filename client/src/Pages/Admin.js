import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import "./AdminStyle.css"
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";

function App() {
  // Shtojme dy variabla per te mbajtur te dhenat e user-ave dhe produkteve
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);

  const [aboutUsData, setaboutUsData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/user/get');
      if (response && response.data) {
        setData(response.data);
      } else {
        console.log('API endpoint did not return any data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funksioni per te marre te dhenat e produkteve nga API
  const loadDataProduct = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/product/get');
      if (response && response.data) {
        setProductData(response.data);
      } else {
        console.log('API endpoint did not return any data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadDataAboutUs = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/aboutus/get');
      if (response && response.data) {
        setaboutUsData(response.data);
      } else {
        console.log('API endpoint did not return any data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    loadDataProduct();
    loadDataAboutUs();
  }, []);

  console.log(data);

  // Funksioni per te fshire user-in nga API
  const deleteUser = (id) => {
    if (window.confirm("Are you sure that you want to delete that user?")) {
      axios.delete(`http://localhost:6001/api/user/remove/${id}`);
      toast.success("User deleted successfully");

      setTimeout(() => loadData(), 500)
    }
  }

  // Funksioni per te fshire produktin nga API
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure that you want to delete this product?")) {
      axios.delete(`http://localhost:6001/api/product/remove/${id}`);
      toast.success("Product deleted successfully");

      setTimeout(() => loadData, 500)
    }
  }

  const deleteAboutUs = (id) => {
    if (window.confirm("Are you sure that you want to delete that user?")) {
      axios.delete(`http://localhost:6001/api/aboutus/remove/${id}`);
      toast.success("User deleted successfully");

      setTimeout(() => loadData(), 500)
    }
  }

  return (
    <>
      <Navbar />

      <div style={{ marginTop: "50px" }}>

        <h1>Admin Page</h1>
        <br></br>
        <br></br>
        <br></br>

        { /*Tabela per ndryshime ne user-a*/}
        <table className='styled-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>E-mail</th>
              <th>Password</th>
              <th>Role</th>
              <th>Insert</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {data.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.Name}</td>
                    <td>{item.Surname}</td>
                    <td>{item.Email}</td>
                    <td>{item.Password}</td>
                    <td>{item.Role}</td>

                    <div className='button-edit-user'>
                      <td>
                        <Link to={"/addUser"}>
                          <button className="btn btn-User">
                            <i class="fa-solid fa-user-plus"></i>
                          </button>
                        </Link>
                      </td>

                      <td>
                        <Link to={`/update/${item.id}`}>
                          <button className="btn btn-edit">
                            <i className="fa-solid fa-user-pen"></i>
                          </button>
                        </Link>
                      </td>

                      <td>
                        <Link>
                          <button className="btn btn-delete" onClick={() => deleteUser(item.id)}>
                            <i class="fa-solid fa-user-minus"></i>
                          </button>
                        </Link>
                      </td>
                    </div>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>


        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <hr></hr>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        { /*Tabela per ndryshime ne produkte*/}
        <table className='styled-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Detajet</th>
              <th>FotoSource</th>
              <th>Insert</th>
              <th>Edit</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>

            {productData.map((product, indexproduct) => {
              return (
                <Fragment key={product.idproduct}>

                  <tr>
                    <th scope="row">{indexproduct + 1}</th>
                    <td>{product.Emri}</td>
                    <td>{product.Detajet}</td>
                    <td>{product.FotoSource}</td>

                    <div className='button-edit-product'>
                      <td>
                        <Link to={"/addProduct"}>
                          <button className="btn btn-product">
                            <i class="fa-solid fa-cart-plus"></i>
                          </button>
                        </Link>
                      </td>

                      <td>
                        <Link to={`/product/update/${product.idproduct}`}>
                          <button className="btn btn-edit">
                            <i class="fa-solid fa-pen"></i>
                          </button>
                        </Link>
                      </td>

                      <td>
                        <Link>
                          <button className="btn btn-delete" onClick={() => deleteProduct(product.idproduct)}>
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </Link>
                      </td>
                    </div>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>


        { /*Tabela per ndryshime ne aboutus*/}
        <table className='styled-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Teksti</th>
              <th>Insert</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {aboutUsData.map((aboutus, indexaboutus) => {
              return (
                <Fragment key={aboutus.idaboutus}>
                  <tr>
                    <th scope="row">{indexaboutus + 1}</th>
                    <td>{aboutus.teksti}</td>

                    <td>
                      <Link to={`/update/${aboutus.idaboutus}`}>
                        <button className="btn btn-edit">
                          <i className="fa-solid fa-user-pen"></i>
                        </button>
                      </Link>

                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteAboutUs(aboutus.idaboutus)}>
                          <i class="fa-solid fa-user-minus"></i>
                        </button>
                      </Link>

                      <Link to={"/addAboutUs"}>
                        <button className="btn btn-User">
                          <i class="fa-solid fa-user-plus"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};


export default App;