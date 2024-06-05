import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/login";
import Home from "./components/Home/home";
import Products from "./components/Products/products";
import Signup from "./components/Auth/signup";
import Swagger from "./components/Swagger/swagger";
import Cart from "./components/Cart/cart";
import { get_auth_token } from "./utils/authUtils";
import CreateProduct from "./components/Products/createProduct";
import Stores from "./components/Store/stores";
import CreateStore from "./components/Store/createStore";
import EditStore from "./components/Store/editStore";
import ShowStore from "./components/Store/showStore";

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

  const renderStoreRoutes = () => (
    <>
      <Route
        path="/stores"
        element={<PrivateRoute element={<Stores />} />}
      />
      <Route
        path="/stores/profile"
        element={<PrivateRoute element={<CreateStore />} />}
      />
      <Route
        path="/stores/:id/edit"
        element={<PrivateRoute element={<EditStore />} />}
      />
      <Route
        path="/stores/:id"
        element={<PrivateRoute element={<ShowStore />} />}
      />
      <Route
        path="/stores/products"
        element={<PrivateRoute element={<Products />} />}
      />
      <Route
        path="/stores/:id/product/create"
        element={<PrivateRoute element={<CreateProduct />} />}
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

        {renderStoreRoutes()}
        {renderCartRoute()}

        {renderSwaggerRoute()}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
