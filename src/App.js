import { Route, BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/login";
import Home from "./components/Home/home";
import Products from "./components/Products/products";
import Signup from "./components/Auth/signup";
import Swagger from "./components/Swagger/swagger";
import DealerDetails from "./components/Dealer/dealerDetails";
import EditDealerDetail from "./components/Dealer/editDealerDetail";
import ShowDealerDetail from "./components/Dealer/showDealerDetail";
import Cart from "./components/Cart/cart";
import { fetch_token_else_redirect_login } from "./utils/authUtils";

const App = () => {
  const check_for_authentication = () => {
    fetch_token_else_redirect_login();
  };

  const renderAuthenticationRoutes = () => (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  );

  const renderProductRoutes = () => (
    <>
      <Route path="/products" element={<Products />} />
      {/* <Route path="/product/create" element={<CreateProduct/>}/>
        <Route path="/product/:id/edit" element={<EditProduct/>}/>
        <Route path="/product/:id" element={<ViewProduct/>}/> */}
    </>
  );

  const renderDealerRoutes = () => (
    <>
      <Route path="/dealer_details" element={<DealerDetails />} />
      <Route path="/dealer_detail/:id/edit" element={<EditDealerDetail />} />
      <Route path="/dealer_detail/:id" element={<ShowDealerDetail />} />
    </>
  );

  const renderRootRoute = () => <Route path="/" element={<Home />} />;

  const renderSwaggerRoute = () => (
    <Route path="/swagger" element={<Swagger />} />
  );

  const renderCartRoute = () => <Route path="/cart" element={<Cart />} />;
  return (
    <BrowserRouter>
      <Routes>
        {renderAuthenticationRoutes()}
        {check_for_authentication()}

        {renderRootRoute()}

        {renderDealerRoutes()}
        {renderProductRoutes()}
        {renderCartRoute()}

        {renderSwaggerRoute()}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
