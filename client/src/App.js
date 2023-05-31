import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import ToTop from "./components/ToTop";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import AboutUs from "./Pages/aboutUs";
import Admin from "./Pages/Admin";
import AddEdit from "./Pages/AddEdit";
import AddEditProduct from "./Pages/AddEditProduct";
import AddEditAboutUs from "./Pages/AddEditAboutUs";
import Product from "./components/Product";
import './App.css'
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import { ShopContextProvider } from "./context/shop-context";
import { WishlistContextProvider } from "./context/wishlist-context";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <WishlistContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Product />} />
              <Route path="/Success" element={<Success />} />
              <Route path="/Cancel" element={<Cancel />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/user/addUser" element={<AddEdit />} />
              <Route path="/user/update/:id" element={<AddEdit />} />
              <Route path="/addProduct" element={<AddEditProduct />} />
              <Route path="/update/:idproduct" element={<AddEditProduct />} />
              <Route path="/aboutus/addAboutUs" element={<AddEditAboutUs />} />
              <Route path="/aboutus/update/:idaboutus" element={<AddEditAboutUs />} />
            </Routes>
            <ToTop />
          </BrowserRouter>
        </WishlistContextProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;
