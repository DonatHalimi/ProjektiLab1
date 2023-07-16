import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import AdminSidebar from './AdminSidebar';
import ToTop from '../components/ToTop.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../styles/AdminStyle.css";

function Admin() {
  // Shtojme dy variabla per te mbajtur te dhenat e user-ave, produkteve dhe aboutus
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [slideshowData, setSlideshowData] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  // Perditesimi i tab-it aktiv kur ndryshohet prej admin-it
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

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

  const loadDataSlideshow = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/slideshow/get');
      if (response && response.data) {
        setSlideshowData(response.data);
      } else {
        console.log('API endpoint did not return any data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect hook per te marre te dhenat e user-ave, produkteve, aboutus dhe slideshow
  useEffect(() => {
    loadData();
    loadDataProduct();
    loadDataAboutUs();
    loadDataSlideshow();
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
                toast.success("Përdoruesi është fshirë me sukses!");
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
                toast.success("Produkti është fshirë me sukses!");
                setTimeout(() => loadDataProduct(), 500);
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
        message: 'Are you sure that you want to delete this text?',
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
                toast.success("Teksti është fshirë me sukses!");
                setTimeout(() => loadDataAboutUs(), 500);
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

  // Fshirja e fotos nga slideshow
  const deleteSlideshow = async (id) => {
    const confirmDialog = () => {
      confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure that you want to delete this photo?',
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
                await axios.delete(`http://localhost:6001/api/slideshow/remove/${id}`);
                toast.success("Fotoja është fshirë me sukses!");

                setTimeout(() => loadDataSlideshow(), 500);
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

  // Funksioni per krijimin e tabelave per CRUD te user-ave
  const renderUsersTable = () => {

    const getRoleLabel = (roleId) => {
      return roleId === 1 ? 'Admin' : 'User';
    };

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
              <th>
                <Link to='/user/addUser' className='clickable-header'>
                  Insert
                </Link>
              </th>
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
                    <td>●●●●●●</td>
                    <td>{getRoleLabel(item.Role)}</td>

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
      <div className='table-container' style={{ position: 'fixed', top: '100px' }}>
        <table className='styled-table' style={{ transform: 'scale(0.79)', position: 'relative', bottom: '590px', overflowY: 'auto', fontSize: '17px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Cmimi</th>
              <th>Valuta</th>
              <th>Kategoria</th>
              <th>Detajet</th>
              <th>Foto</th>
              <th>
                <Link to='/addProduct' className='clickable-header'>
                  Insert
                </Link>
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, indexproduct) => {
              console.log(product.Foto);
              return (
                <Fragment key={product.idproduct}>
                  <tr>
                    <th scope="row">{indexproduct + 1}</th>
                    <td>{product.Emri}</td>
                    <td>{product.Cmimi}</td>
                    <td>{product.Valuta}</td>
                    <td>{product.Kategoria}</td>
                    <td style={{ textAlign: 'justify' }}>{product.Detajet}</td>
                    <td>
                      {product.Foto && (
                        <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Product" id='fotoSize' />
                      )}
                    </td>
                    <td>
                      <Link to={"/addProduct"}>
                        <button className="btn btn-User">
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/updateProduct/${product.idproduct}`}>
                        <button className="btn btn-edit">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteProduct(product.idproduct)}>
                          <i className="fa-solid fa-trash-can"></i>
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

      <div className='table-container' style={{ position: 'fixed', top: '100px' }}>
        <table className='styled-table' style={{ transform: 'scale(0.79)', fontSize: '20px' }}>
          {/* <div className='table-container'>
        <table className='styled-table'> */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Teksti</th>
              <th>
                <Link to='/aboutus/addAboutUs' className='clickable-header'>
                  Insert
                </Link>
              </th>
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
                    <td style={{ textAlign: 'justify' }}>{aboutus.teksti}</td>

                    <td>
                      <Link to={"/aboutus/addAboutUs"}>
                        <button className="btn btn-User">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/aboutus/update/${aboutus.idaboutus}`}>
                        <button className="btn btn-edit">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteAboutUs(aboutus.idaboutus)}>
                          <i className="fa-solid fa-trash-can"></i>
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

  const renderSlideshowTable = () => {
    return (
      <div className='table-container' style={{ position: 'relative', top: '-90px' }}>
        <table className='styled-table' style={{ transform: 'scale(0.79)', fontSize: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>EmriFoto</th>
              <th>Foto</th>
              <th>
                <Link to='/addSlideshow' className='clickable-header'>
                  Insert
                </Link>
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {slideshowData.map((slideshow, indexslideshow) => {
              console.log(slideshow.Foto);
              return (
                <Fragment key={slideshow.idslideshow}>
                  <tr>
                    <th scope="row">{indexslideshow + 1}</th>
                    <td>{slideshow.EmriFoto}</td>
                    <td>
                      {slideshow.Foto && (
                        <img src={`data:image/jpeg;base64,${slideshow.Foto.toString('base64')}`} alt="Slideshow" id='fotoSizeSlideshow' />
                      )}
                    </td>
                    <td>
                      <Link to={"/addSlideshow"}>
                        <button className="btn btn-User">
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/updateSlideshow/${slideshow.idslideshow}`}>
                        <button className="btn btn-edit">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteSlideshow(slideshow.idslideshow)}>
                          <i className="fa-solid fa-trash-can"></i>
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


  // Funksioni per dialogun e konfirmimit per te derguar adminin ne home page 
  const handleHomeButtonClick = () => {
    confirmAlert({
      title: 'Confirm Navigation',
      message: 'Are you sure you want to go to the Home page?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => {
            handleTabChange('users');
          },
          className: 'cancel-btn'
        },
        {
          label: 'Yes',
          onClick: () => {
            navigate('/');
          },
          className: 'yes-btn'
        }
      ]
    });
  };

  const renderTableForTab = (tabName) => {
    if (tabName === 'users') {
      return renderUsersTable();
    } else if (tabName === 'products') {
      return renderProductsTable();
    } else if (tabName === 'aboutUs') {
      return renderAboutUsTable();
    } else if (tabName === 'slideshow') {
      return renderSlideshowTable();
    } else if (tabName === 'home') {
      return handleHomeButtonClick();
    } else {
      return null;
    }
  };

  // Funksioni per leximin e tabelave varesisht se qka kerkohet te shikohet
  const renderContent = () => {
    let fallbackTab;

    switch (activeTab) {
      case 'users':
        fallbackTab = 'users';
        return renderUsersTable();
      case 'products':
        fallbackTab = 'products';
        return renderProductsTable();
      case 'aboutUs':
        fallbackTab = 'aboutUs';
        return renderAboutUsTable();
      case 'slideshow':
        fallbackTab = 'slideshow';
        return renderSlideshowTable();
      case 'home':
        fallbackTab = 'home';
        return handleHomeButtonClick();
      default:
        return fallbackTab ? renderTableForTab(fallbackTab) : null;
    }
  };

  // Renderimi i HTML formes per faqen e Adminit
  return (
    <div>
      <ToTop />
      <AdminSidebar activeTab={activeTab} handleTabChange={handleTabChange} />
      <div className={`content`}>{renderContent()}</div>
    </div>
  );
};

export default Admin;