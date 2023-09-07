import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Home from './components/Home';
import ToTop from "./components/ToTop";
import AboutUs from "./components/AboutUs";
import Product from "./components/Product";
import Categories from './components/Categories';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import ProductDetails from './components/ProductDetails';
import CookiePopup from "./components/CookiePopup";
import ProductList from './components/ProductList';
import { ShopContextProvider } from "./context/shop-context";
import { WishlistContextProvider } from "./context/wishlist-context";
import Login from "./Pages/Login";
import { Register } from "./Pages/Register";
import Admin from "./Pages/Admin";
import AddEdit from "./Pages/AddEdit";
import AddEditProduct from "./Pages/AddEditProduct";
import AddEditAboutUs from "./Pages/AddEditAboutUs";
import AddEditSlideshow from "./Pages/AddEditSlideshow";
import AddEditCategory from "./Pages/AddEditCategory";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <WishlistContextProvider>
          <BrowserRouter>
            <CookiePopup />
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Product />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/Success" element={<Success />} />
              <Route path="/Cancel" element={<Cancel />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/user/addUser" element={<AddEdit />} />
              <Route path="/user/update/:id" element={<AddEdit />} />
              <Route path="/addProduct" element={<AddEditProduct />} />
              <Route path="/updateProduct/:idproduct" element={<AddEditProduct />} />
              <Route path="/aboutus/addAboutUs" element={<AddEditAboutUs />} />
              <Route path="/aboutus/update/:idaboutus" element={<AddEditAboutUs />} />
              <Route path="/addSlideshow" element={<AddEditSlideshow />} />
              <Route path="/updateSlideshow/:idslideshow" element={<AddEditSlideshow />} />
              <Route path="/addCategory" element={<AddEditCategory />} />
              <Route path="/updateCategory/:idcategory" element={<AddEditCategory />} />
              <Route path="/products/:categoryId" element={<ProductList />} />
            </Routes>
            <ToTop />
          </BrowserRouter>
        </WishlistContextProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;