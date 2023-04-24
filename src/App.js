import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

function App(){
  return(
    <div className="App">
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App;