import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToTop from "./components/ToTop";
import Navbar from "./components/Navbar";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToTop />
      </BrowserRouter>
    </div>
  );
}

export default App;