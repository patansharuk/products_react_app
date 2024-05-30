import { Route, BrowserRouter, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Auth/login";
import Home from "./components/Home/home";
import Products from "./components/Products/products";
import Signup from "./components/Auth/signup";
import Swagger from "./components/Swagger/swagger";
import DealerDetails from "./components/Dealer/dealerDetails";
import EditDealerDetail from "./components/Dealer/editDealerDetail";
import ShowDealerDetail from "./components/Dealer/showDealerDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dealer_details" element={<DealerDetails/>}/>
        <Route path="/dealer_detail/:id/edit" element={<EditDealerDetail/>}/>
        <Route path="/dealer_detail/:id" element={<ShowDealerDetail/>}/>
        <Route path="/products" element={<Products/>}/>
        {/* <Route path="/product/create" element={<CreateProduct/>}/>
        <Route path="/product/:id/edit" element={<EditProduct/>}/>
        <Route path="/product/:id" element={<ViewProduct/>}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/swagger" element={<Swagger/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
