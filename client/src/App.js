import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { ToastContainer } from 'react-toastify'

import AboutUs from "./components/AboutUs"
import Home from './components/Home'
import ToTop from "./components/ToTop"
import Product from "./components/Product"
import Categories from './components/Categories'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import ProductDetails from './components/ProductDetails'
import CookiePopup from "./components/CookiePopup"
import ProductList from './components/ProductList'

import { ShopContextProvider } from "./context/shop-context"
import { WishlistContextProvider } from "./context/wishlist-context"

import AddEditAboutUs from "./Pages/AddEdit/AddEditAboutUs"
import AddEditCategory from "./Pages/AddEdit/AddEditCategory"
import AddEditProduct from "./Pages/AddEdit/AddEditProduct"
import AddEditSlideshow from "./Pages/AddEdit/AddEditSlideshow"
import AddEditUser from "./Pages/AddEdit/AddEditUser"
import UsersTable from './Pages/Tables/UsersTable'
import ProductsTable from './Pages/Tables/ProductsTable'
import CategoryTable from './Pages/Tables/CategoryTable'
import SlideshowTable from './Pages/Tables/SlideshowTable'
import AboutUsTable from './Pages/Tables/AboutUsTable'
import Cancel from "./Pages/Cancel"
import Success from "./Pages/Success"
import Login from "./Pages/Login"
import { Register } from "./Pages/Register"

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
              <Route path="/Home" element={<Home />} />
              <Route path="/" element={<Product />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/Success" element={<Success />} />
              <Route path="/Cancel" element={<Cancel />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Admin" element={<Navigate replace to="/admin/users" />} />
              <Route path="/user/addUser" element={<AddEditUser />} />
              <Route path="/user/update/:id" element={<AddEditUser />} />
              <Route path="/addProduct" element={<AddEditProduct />} />
              <Route path="/updateProduct/:idproduct" element={<AddEditProduct />} />
              <Route path="/aboutus/addAboutUs" element={<AddEditAboutUs />} />
              <Route path="/aboutus/update/:idaboutus" element={<AddEditAboutUs />} />
              <Route path="/addSlideshow" element={<AddEditSlideshow />} />
              <Route path="/updateSlideshow/:idslideshow" element={<AddEditSlideshow />} />
              <Route path="/addCategory" element={<AddEditCategory />} />
              <Route path="/updateCategory/:idcategory" element={<AddEditCategory />} />
              <Route path="/products/:categoryId" element={<ProductList />} />

              <Route path="/admin/users" element={<UsersTable />} />
              <Route path="/admin/products" element={<ProductsTable />} />
              <Route path="/admin/categories" element={<CategoryTable />} />
              <Route path="/admin/slideshow" element={<SlideshowTable />} />
              <Route path="/admin/aboutus" element={<AboutUsTable />} />
            </Routes>
            <ToTop />
          </BrowserRouter>
        </WishlistContextProvider>
      </ShopContextProvider>
    </div>
  )
}

export default App