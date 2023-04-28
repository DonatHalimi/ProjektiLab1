import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import ToTop from "./components/ToTop";
import Navbar from "./components/Navbar";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import Slider from "./components/Slider";
import  Admin  from "./Pages/Admin";
import AddEdit from "./Pages/AddEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Slider />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/addUser" element={<AddEdit/>}/>
        </Routes>
        <ToTop />
      </BrowserRouter>
    </div>
  );
}

export default App;