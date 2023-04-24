import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
          </Routes>
        </BrowserRouter>
      </> */}
    </div>
  )
}

export default App;