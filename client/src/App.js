import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import { Register } from "./Pages/Register";
import Home from './components/Home';
import ToTop from "./components/ToTop";
import AboutUs from "./components/AboutUs";
import Admin from "./Pages/Admin";
import AddEdit from "./Pages/AddEdit";
import AddEditProduct from "./Pages/AddEditProduct";
import AddEditAboutUs from "./Pages/AddEditAboutUs";
import AddEditSlideshow from "./Pages/AddEditSlideshow";
import Product from "./components/Product";
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import { ShopContextProvider } from "./context/shop-context";
import { WishlistContextProvider } from "./context/wishlist-context";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";
import ProductDetails from './components/ProductDetails';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <WishlistContextProvider>
          <BrowserRouter>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Product />} />
              <Route path="/Success" element={<Success />} />
              <Route path="/Cancel" element={<Cancel />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Wishlist" element={<Wishlist />} />
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
            </Routes>
            <ToTop />
          </BrowserRouter>
        </WishlistContextProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;