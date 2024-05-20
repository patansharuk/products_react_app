import { Route, BrowserRouter, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Auth/login";
import Products from "./components/Products/products";
import Signup from "./components/Auth/signup";
import Swagger from "./components/Swagger/swagger";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/swagger" element={<Swagger/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
