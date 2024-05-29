import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import Alert from "react-bootstrap/Alert";
import ProductItem from "../ProductItem/product_item";
import { Container, Row, Spinner } from "react-bootstrap";
import {
  clear_local_storage_replace_to,
  get_auth_token,
} from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";
import { redirect_to_login } from "../../utils/redirectUtils";
import AlertDismissible from "../CustomAlert/customAlert";
import ItemNotFound from "../ItemNotFound/itemNotFound";

const states = {
  api_error: "API_ERROR",
  loading: "LOADING",
  products: "PRODUCTS",
  empty_items: "EMPTY_ITEMS",
};

const Products = () => {
  const [state, setState] = useState(states.loading);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch_products = () => {
      setState(states.loading);
      const token = get_auth_token();
      if (token === null) {
        redirect_to_login();
      }
      const products_url = ProductsApi.products_url();
      const products_options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(products_url, products_options)
        .then((res) => {
          if (res.ok) {
            res.json();
          } else {
            setState(states.api_error);
            throw "Routing error";
          }
        })
        .then((data) => {
          if (data.errors) {
            clear_local_storage_replace_to("/login");
          } else {
            setMessage("fetched data successfully!");
            setProducts(data);
            setState(states.products);
          }
        })
        .catch((e) => console.log(e));
    };
    fetch_products();
  }, []);

  const renderProducts = () => (
    <Container>
      <AlertDismissible children={message} />
      <Row className="mt-2">
        {products.map((product) => {
          return <ProductItem product={product} key={product.id} />;
        })}
      </Row>
    </Container>
  );

  const renderSpinner = () => (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" className="text-center m-5" />
    </div>
  );

  const renderApiError = () => (
    <Alert variant="danger" className="container m-auto mt-2">
      Something went wrong! Try after sometime.
    </Alert>
  );

  const renderComponent = () => {
    switch (state) {
      case states.loading:
        return renderSpinner();
      case states.api_error:
        return renderApiError();
      case states.empty_items:
        return <ItemNotFound />;
      default:
        renderProducts();
    }
  };

  return (
    <>
      <CustomNavbar />
      {renderComponent()}
    </>
  );
};

export default Products;
