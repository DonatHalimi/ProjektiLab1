import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import AdminSidebar from './AdminSidebar';
import ToTop from '../components/ToTop.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../styles/AdminStyle.css";
import { BsPersonAdd, BsPersonDash, BsPersonX, BsCartPlus, BsPencil, BsTrash3, BsPlusLg } from "react-icons/bs";

function Admin() {

  // Shtimi i variablave per usera, produkte, aboutus, slideshow, kategori etj.
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [slideshowData, setSlideshowData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
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

  // Funksioni per te marre te dhenat e slideshow nga API
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

  // Funksioni per te marre te dhenat e kategorive nga API
  const loadDataCategory = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/category/get');
      if (response && response.data) {
        setCategoryData(response.data);
      } else {
        console.log('API endpoint did not return any data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect hook per te marre te dhenat e user-ave, produkteve, aboutus, slideshow dhe kategorive
  useEffect(() => {
    loadData();
    loadDataProduct();
    loadDataAboutUs();
    loadDataSlideshow();
    loadDataCategory();
  }, []);


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
    const confirmDialogg = () => {
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
    confirmDialogg();
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

  // Funksioni per te fshire slideshow nga API
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
                toast.error(`Error deleting slideshow: ${error.message}`);
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

  // Funksioni per te fshire kategorine nga API
  const deleteCategory = async (id) => {
    const confirmDialog = () => {
      confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure that you want to delete this category?',
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
                await axios.delete(`http://localhost:6001/api/category/remove/${id}`);
                toast.success("Kategoria është fshirë me sukses!");

                setTimeout(() => loadDataCategory(), 500);
              } catch (error) {
                toast.error(`Error deleting category: ${error.message}`);
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

  
  // Funksioni per renderimin e tabeles se user-ave
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
              <th>Emri</th>
              <th>Mbiemri</th>
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
                          <BsPersonAdd style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/user/update/${item.id}`}>
                        <button className="btn btn-edit">
                          <BsPersonDash style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteUser(item.id)}>
                          <BsPersonX style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
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

  // Funksioni per renderimin e tabeles se produkteve
  const renderProductsTable = () => {

    // Krijojme nje funksion i cili kthen emrin e kategorise ose nje string empty nese nuk gjindet emri
    const getCategoryNameById = (categoryId) => {
      const category = categoryData.find((cat) => cat.idcategory === categoryId);
      return category ? category.EmriKategorise : "";
    };

    return (
      <div className='table-container' style={{ position: 'fixed', top: '100px' }}>
        <table className='styled-table' style={{ transform: 'scale(0.72)', position: 'relative', bottom: '530px', overflowY: 'auto', fontSize: '17px', marginTop: "5px", marginBottom: "200px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Çmimi</th>
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

              return (
                <Fragment key={product.id}>
                  <tr>
                    <th scope="row">{indexproduct + 1}</th>
                    <td>{product.Emri}</td>
                    <td>{product.Cmimi}</td>
                    <td>{product.Valuta}</td>
                    <td>{getCategoryNameById(product.idcategory)}</td>
                    <td style={{ textAlign: 'justify' }}>{product.Detajet}</td>
                    <td>
                      {product.Foto && (
                        <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Product" id='fotoSizeProduct' />
                      )}
                    </td>
                    <td>
                      <Link to={"/addProduct"}>
                        <button className="btn btn-User">
                          <BsCartPlus style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/updateProduct/${product.id}`}>
                        <button className="btn btn-edit">
                          <BsPencil style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteProduct(product.id)}>
                          <BsTrash3 style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
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

  // Funksioni per renderimin e tabeles se about us
  const renderAboutUsTable = () => {
    return (

      <div className='table-container' style={{ position: 'fixed', top: '100px' }}>
        <table className='styled-table' style={{ transform: 'scale(0.79)', fontSize: '20px' }}>
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
                          <BsPlusLg style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/aboutus/update/${aboutus.idaboutus}`}>
                        <button className="btn btn-edit">
                          <BsPencil style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteAboutUs(aboutus.idaboutus)}>
                          <BsTrash3 style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
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

  // Funksioni per renderimin e tabeles se slideshow
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
                          <BsCartPlus style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/updateSlideshow/${slideshow.idslideshow}`}>
                        <button className="btn btn-edit">
                          <BsPencil style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteSlideshow(slideshow.idslideshow)}>
                          <BsTrash3 style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
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

  // Funksioni per renderimin e tabeles se kategorive
  const renderCategoryTable = () => {
    return (
      <div className='table-container' style={{ position: "relative", top: "-60px" }}>
        <table className='styled-table' style={{ transform: 'scale(0.79)', fontSize: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>EmriKategorise</th>
              <th>FotoKategorise</th>
              <th>
                <Link to='/addCategory' className='clickable-header'>
                  Insert
                </Link>
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((category, indexcategory) => {
              console.log(category.FotoKategori);
              return (
                <Fragment key={category.idcategory}>
                  <tr>
                    <th scope="row">{indexcategory + 1}</th>
                    <td>{category.EmriKategorise}</td>
                    <td>
                      {category.FotoKategori && (
                        <img src={`data:image/jpeg;base64,${category.FotoKategori.toString('base64')}`} alt="Category" id='fotoSizeCategory' />
                      )}
                    </td>
                    <td>
                      <Link to={"/addCategory"}>
                        <button className="btn btn-User">
                          <BsCartPlus style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/updateCategory/${category.idcategory}`}>
                        <button className="btn btn-edit">
                          <BsPencil style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <button className="btn btn-delete" onClick={() => deleteCategory(category.idcategory)}>
                          <BsTrash3 style={{ color: "black", fontSize: "20px", fontWeight: "600" }} />
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

  // Funksioni qe kthen tabelen per tab-in e caktuar varesisht prej tab-it
  const renderTableForTab = (tabName) => {
    if (tabName === 'users') {
      return renderUsersTable();
    } else if (tabName === 'products') {
      return renderProductsTable();
    } else if (tabName === 'category') {
      return renderCategoryTable();
    } else if (tabName === 'slideshow') {
      return renderSlideshowTable();
    } else if (tabName === 'aboutUs') {
      return renderAboutUsTable();
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
      case 'category':
        fallbackTab = 'category'
        return renderCategoryTable();
      case 'slideshow':
        fallbackTab = 'slideshow';
        return renderSlideshowTable();
      case 'aboutUs':
        fallbackTab = 'aboutUs';
        return renderAboutUsTable();
      case 'home':
        fallbackTab = 'home';
        return handleHomeButtonClick();
      default:
        return fallbackTab ? renderTableForTab(fallbackTab) : null;
    }
  };

  // Renderimi i HTML formes per shfaqjen e Adminit dashboard
  return (
    <div>
      <ToTop />
      <AdminSidebar activeTab={activeTab} handleTabChange={handleTabChange} />
      <div className={`content`}>{renderContent()}</div>
    </div>
  );
};

export default Admin;