import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { ToastContainer } from 'react-toastify'

import AboutUs from "./components/AboutUs"
import Home from './components/Home'
import ToTop from "./components/ToTop"
import ProductItem from "./components/ProductItem"
import Categories from './components/Categories'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import ProductDetails from './components/ProductDetails'
import CookiePopup from "./components/CookiePopup"
import ProductList from './components/ProductList'

// import { ShopContextProvider } from "./context/shop-context"
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

import AddEditSupplier from "./Pages/AddEdit/AddEditSupplier"
import SuppliersTable from "./Pages/Tables/SuppliersTable"
import AddEditBrands from "./Pages/AddEdit/AddEditBrands"
import BrandsTable from "./Pages/Tables/BrandsTable"
import CountryTable from "./Pages/Tables/CountryTable"
import AddEditCountry from "./Pages/AddEdit/AddEditCountry"
import PaymentsTable from "./Pages/Tables/PaymentsTable"
import RolesTable from "./Pages/Tables/RolesTable"
import AddEditRoles from "./Pages/AddEdit/AddEditRoles"
import FAQs from "./components/FAQs"
import { Contact } from "./components/Contact"
import TransportTable from "./Pages/Tables/TransportTable"
import AddEditTransport from "./Pages/AddEdit/AddEditTransport"

import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

import NotAllowed from './components/NotAllowed';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <WishlistContextProvider>
        <BrowserRouter>
          <CookiePopup />
          <ToastContainer />
          <Routes>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<ProductItem />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/Cancel" element={<Cancel />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/Contact" element={<Contact />} />

            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products/:categoryId" element={<ProductList />} />

            <Route path="/not-allowed" element={<NotAllowed />} />

            <Route path="/Admin" element={<Navigate replace to="/admin/users" />} />

            {/* Protected routes */}

            {/* User related */}
            <Route path="/user/addUser" element={
              <ProtectedRoute adminOnly>
                <AddEditUser />
              </ProtectedRoute>
            } />

            <Route path="/user/update/:id" element={
              <ProtectedRoute adminOnly>
                <AddEditUser />
              </ProtectedRoute>
            } />

            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly>
                <UsersTable />
              </ProtectedRoute>
            } />

            {/* Roles related */}

            <Route path="/roles/addRole" element={
              <ProtectedRoute adminOnly>
                <AddEditRoles />
              </ProtectedRoute>
            } />

            <Route path="/roles/updateRoles/:id" element={
              <ProtectedRoute adminOnly>
                <AddEditRoles />
              </ProtectedRoute>
            } />

            <Route path="/admin/roles" element={
              <ProtectedRoute adminOnly>
                <RolesTable />
              </ProtectedRoute>
            } />

            {/* Product related */}

            <Route path="/addProduct" element={
              <ProtectedRoute adminOnly>
                <AddEditProduct />
              </ProtectedRoute>
            } />

            <Route path="/updateProduct/:idproduct" element={
              <ProtectedRoute adminOnly>
                <AddEditProduct />
              </ProtectedRoute>
            } />

            <Route path="/admin/products" element={
              <ProtectedRoute adminOnly>
                <ProductsTable />
              </ProtectedRoute>
            } />

            {/* Categories related */}

            <Route path="/addCategory" element={
              <ProtectedRoute adminOnly>
                <AddEditCategory />
              </ProtectedRoute>
            } />

            <Route path="/update/:categoryId" element={
              <ProtectedRoute adminOnly>
                <AddEditCategory />
              </ProtectedRoute>
            } />

            <Route path="/admin/categories" element={
              <ProtectedRoute adminOnly>
                <CategoryTable />
              </ProtectedRoute>
            } />

            {/* Supplier related */}

            <Route path="/addSupplier" element={
              <ProtectedRoute adminOnly>
                <AddEditSupplier />
              </ProtectedRoute>
            } />

            <Route path="/updateSupplier/:SupplierId" element={
              <ProtectedRoute adminOnly>
                <AddEditSupplier />
              </ProtectedRoute>
            } />

            <Route path="/admin/suppliers" element={
              <ProtectedRoute adminOnly>
                <SuppliersTable />
              </ProtectedRoute>
            } />

            {/* Brand related */}

            <Route path="/addBrand" element={
              <ProtectedRoute adminOnly>
                <AddEditBrands />
              </ProtectedRoute>
            } />

            <Route path="/updateBrand/:BrandId" element={
              <ProtectedRoute adminOnly>
                <AddEditBrands />
              </ProtectedRoute>
            } />

            <Route path="/admin/brands" element={
              <ProtectedRoute adminOnly>
                <BrandsTable />
              </ProtectedRoute>
            } />

            {/* Country related */}

            <Route path="/addCountry" element={
              <ProtectedRoute adminOnly>
                <AddEditCountry />
              </ProtectedRoute>
            } />

            <Route path="/updateCountry/:CountryId" element={
              <ProtectedRoute adminOnly>
                <AddEditCountry />
              </ProtectedRoute>
            } />

            <Route path="/admin/countries" element={
              <ProtectedRoute adminOnly>
                <CountryTable />
              </ProtectedRoute>
            } />

            {/* Transport related */}

            <Route path="/addTransport" element={
              <ProtectedRoute adminOnly>
                <AddEditTransport />
              </ProtectedRoute>
            } />

            <Route path="/transport/updateTransport/:transportId" element={
              <ProtectedRoute adminOnly>
                <AddEditTransport />
              </ProtectedRoute>
            } />

            <Route path="/admin/transport" element={
              <ProtectedRoute adminOnly>
                <TransportTable />
              </ProtectedRoute>
            } />

            {/* Payment related */}

            <Route path="/admin/payments" element={
              <ProtectedRoute adminOnly>
                <PaymentsTable />
              </ProtectedRoute>
            } />

            {/* Slideshow related */}

            <Route path="/addSlideshow" element={
              <ProtectedRoute adminOnly>
                <AddEditSlideshow />
              </ProtectedRoute>
            } />

            <Route path="/updateSlideshow/:idslideshow" element={
              <ProtectedRoute adminOnly>
                <AddEditSlideshow />
              </ProtectedRoute>
            } />

            <Route path="/admin/slideshow" element={
              <ProtectedRoute adminOnly>
                <SlideshowTable />
              </ProtectedRoute>
            } />

            {/* About us related */}

            <Route path="/aboutus/addAboutUs" element={
              <ProtectedRoute adminOnly>
                <AddEditAboutUs />
              </ProtectedRoute>
            } />

            <Route path="/aboutus/update/:idaboutus" element={
              <ProtectedRoute adminOnly>
                <AddEditAboutUs />
              </ProtectedRoute>
            } />

            <Route path="/admin/aboutus" element={
              <ProtectedRoute adminOnly>
                <AboutUsTable />
              </ProtectedRoute>
            } />

          </Routes>
          <ToTop />
        </BrowserRouter>
      </WishlistContextProvider>
    </div>
  )
}

export default App