import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
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
import { get_auth_token } from "./utils/authUtils";
import CreateProduct from "./components/Products/createProduct";

const PrivateRoute = ({ element }) => {
  const token = get_auth_token();
  if (token === null) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

const App = () => {
  const renderAuthenticationRoutes = () => (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  );

  const renderProductRoutes = () => (
    <>
      <Route
        path="/products"
        element={<PrivateRoute element={<Products />} />}
      />
      <Route
        path="/product/create"
        element={<PrivateRoute element={<CreateProduct />} />}
      />
      {/* <Route path="/product/:id/edit" element={<EditProduct/>}/>
        <Route path="/product/:id" element={<ViewProduct/>}/> */}
    </>
  );

  const renderDealerRoutes = () => (
    <>
      <Route
        path="/dealer_details"
        element={<PrivateRoute element={<DealerDetails />} />}
      />
      <Route
        path="/dealer_detail/:id/edit"
        element={<PrivateRoute element={<EditDealerDetail />} />}
      />
      <Route
        path="/dealer_detail/:id"
        element={<PrivateRoute element={<ShowDealerDetail />} />}
      />
    </>
  );

  const renderRootRoute = () => (
    <Route path="/" element={<PrivateRoute element={<Home />} />} />
  );

  const renderSwaggerRoute = () => (
    <Route path="/swagger" element={<PrivateRoute element={<Swagger />} />} />
  );

  const renderCartRoute = () => (
    <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
  );
  return (
    <BrowserRouter>
      <Routes>
        {renderAuthenticationRoutes()}

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
