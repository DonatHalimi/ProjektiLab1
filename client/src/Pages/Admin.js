import React, { useState, useEffect, Fragment } from 'react';
import Navbar from "../components/Navbar";
import "./AdminStyle.css"
import AdminSidebar from './AdminSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
  // Shtojme dy variabla per te mbajtur te dhenat e user-ave, produkteve dhe aboutus
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);

  const [activeTab, setActiveTab] = useState('users');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const navigate = useNavigate();

  // Funksioni per te marre te dhenat e user-ave nga API
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

  // Funksioni per te marre te dhenat e aboutus nga API
  const loadDataAboutUs = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/aboutus/get');
      if (response && response.data) {
        setAboutUsData(response.data);
      } else {
        console.log('API endpoint did not return any data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect hook per te marre te dhenat e user-ave, produkteve dhe aboutus
  useEffect(() => {
    loadData();
    loadDataProduct();
    loadDataAboutUs();
  }, []);

  console.log(data);


  // Funksioni per te fshire user-in nga API
  const deleteUser = async (id) => {
    const confirmDialog = () => {
      confirmAlert({
        title: 'Confirm Deletion\n',
        message: 'Are you sure that you want to delete this user?',
        buttons: [
          {
            label: 'Cancel',
            onClick: () => { },
            className: 'cancel-btn'
          },
          {
            label: 'Yes',
            onClick: async () => {
              try {
                // Dergojme kerkesen per fshirje ne server
                await axios.delete(`http://localhost:6001/api/user/remove/${id}`);
                toast.success("User deleted successfully");
                setTimeout(() => loadData(), 500);
              } catch (error) {
                toast.error(`Error deleting user: ${error.message}`);
              }
            },
            className: 'yes-btn'
          }
        ]
      });
    };

    // Thirrja e confirm dialog custom
    confirmDialog();
  }


  // Funksioni per te fshire produktin nga API
  const deleteProduct = async (id) => {
    const confirmDialog = () => {
      confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure that you want to delete this product?',
        buttons: [
          {
            label: 'Cancel',
            onClick: () => { },
            className: 'cancel-btn'
          },
          {
            label: 'Yes',
            onClick: async () => {
              try {
                // Dergojme kerkesen per fshirje ne server
                await axios.delete(`http://localhost:6001/api/product/remove/${id}`);
                toast.success("Product deleted successfully");
                setTimeout(() => loadData(), 500);
              } catch (error) {
                toast.error(`Error deleting product: ${error.message}`);
              }
            },
            className: 'yes-btn'
          }
        ]
      });
    };

    // Thirrja e confirm dialog custom
    confirmDialog();
  }


  // Funksioni per te fshire tekstin nga API
  const deleteAboutUs = async (id) => {
    const confirmDialog = () => {
      confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure that you want to delete this?',
        buttons: [
          {
            label: 'Cancel',
            onClick: () => { },
            className: 'cancel-btn'
          },
          {
            label: 'Yes',
            onClick: async () => {
              try {
                // Dergojme kerkesen per fshirje ne server
                await axios.delete(`http://localhost:6001/api/aboutus/remove/${id}`);
                toast.success("Text deleted successfully");
                setTimeout(() => loadData(), 500);
              } catch (error) {
                toast.error(`Error deleting text: ${error.message}`);
              }
            },
            className: 'yes-btn'
          }
        ]
      });
    };

    // Thirrja e confirm dialog custom
    confirmDialog();
  };

  // Funksioni per krijimin e tabelave per CRUD te user-ave
  const renderUsersTable = () => {
    return (
      <div className='table-container'>
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

                    <td>
                      <Link to={`/user/addUser`}>
                        <button className="btn btn-User">
                          <i class="fa-solid fa-user-plus"></i>
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/user/update/${item.id}`}>
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
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Funksioni per krijimin e tabelave per CRUD te produkteve
  const renderProductsTable = () => {
    return (
      <div className='table-container'>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Cmimi</th>
              <th>Valuta</th>
              <th>Detajet</th>
              <th>Kategoria</th>
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
                    <td>{product.Cmimi}</td>
                    <td>{product.Valuta}</td>
                    <td>{product.Detajet}</td>
                    <td>{product.Kategoria}</td>
                    <td>{product.FotoSource}</td>

                    <td>
                      <Link to={"/addProduct"}>
                        <button className="btn btn-User">
                          <i class="fa-solid fa-cart-plus"></i>
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/update/${product.idproduct}`}>
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
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Funksioni per krijimin e tabelave per CRUD te aboutUs
  const renderAboutUsTable = () => {
    return (
      <div className='table-container'>
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
                      <Link to={"/aboutus/addAboutUs"}>
                        <button className="btn btn-User">
                          <i class="fa-solid fa-plus"></i>
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/aboutus/update/${aboutus.idaboutus}`}>
                        <button className="btn btn-edit">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteAboutUs(aboutus.idaboutus)}>
                          <i class="fa-solid fa-trash-can"></i>
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
    );
  };

  // Funksioni per leximin e tabelave varesisht se qka kerkohet te shikohet
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return renderUsersTable();
      case 'products':
        return renderProductsTable();
      case 'aboutUs':
        return renderAboutUsTable();
      case 'home':
        return navigate('/');
      default:
        return renderUsersTable();
    }
  };

  // Renderimi i HTML formes per faqen e Adminit
  return (
    <div>
      {/* <Navbar /> */}
      <AdminSidebar
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className={`content`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;