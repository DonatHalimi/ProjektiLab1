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
import AddEditSupplier from "./Pages/AddEdit/AddEditSupplier"
import SuppliersTable from "./Pages/Tables/SuppliersTable"
import AddEditBrands from "./Pages/AddEdit/AddEditBrands"
import BrandsTable from "./Pages/Tables/BrandsTable"
import CountryTable from "./Pages/Tables/CountryTable"
import AddEditCountry from "./Pages/AddEdit/AddEditCountry"
import PaymentsTable from "./Pages/Tables/PaymentsTable"
import RolesTable from "./Pages/Tables/RolesTable"
import AddEditRoles from "./Pages/AddEdit/AddEditRoles"

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
              <Route path="/" element={<ProductItem />} />
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
              <Route path="/updateCategory/:CategoryId" element={<AddEditCategory />} />
              <Route path="/products/:categoryId" element={<ProductList />} />

              <Route path="/addSupplier" element={<AddEditSupplier />} />
              <Route path="/updateSupplier/:SupplierId" element={<AddEditSupplier />} />

              <Route path="/addBrand" element={<AddEditBrands />} />
              <Route path="/updateBrand/:BrandId" element={<AddEditBrands />} />

              <Route path="/addCountry" element={<AddEditCountry />} />
              <Route path="/updateCountry/:CountryId" element={<AddEditCountry />} />

              <Route path="/admin/users" element={<UsersTable />} />
              <Route path="/admin/products" element={<ProductsTable />} />
              <Route path="/admin/categories" element={<CategoryTable />} />
              <Route path="/admin/slideshow" element={<SlideshowTable />} />
              <Route path="/admin/aboutus" element={<AboutUsTable />} />
              <Route path="/admin/suppliers" element={<SuppliersTable />} />
              <Route path="/admin/brands" element={<BrandsTable />} />
              <Route path="/admin/countries" element={<CountryTable />} />
              <Route path="/admin/payments" element={<PaymentsTable/>} />

              <Route path="/admin/roles" element={<RolesTable />} />
              <Route path="/roles/addRole" element={<AddEditRoles />} />
              <Route path="/roles/updateRoles/:idroles" element={<AddEditRoles />} />
            </Routes>
            <ToTop />
          </BrowserRouter>
        </WishlistContextProvider>
      </ShopContextProvider>
    </div>
  )
}

export default App