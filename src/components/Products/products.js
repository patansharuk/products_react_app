import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import Alert from "react-bootstrap/Alert";
import ProductItem from "../ProductItem/product_item";
import { Container, Row } from "react-bootstrap";
import { clear_local_storage_replace_to, get_auth_token } from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";
import { redirect_to_login } from "../../utils/redirectUtils";
import AlertDismissible from "../CustomAlert/customAlert";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetch_products = () => {
      const token = get_auth_token();
      if (token === null) {
        redirect_to_login()
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
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            clear_local_storage_replace_to("/login");
          } else {
            setMessage("fetched data successfully!");
            setProducts(data);
          }
        })
        .catch((e) => console.log(e));
    };
    fetch_products();
  }, []);

  return (
    <>
      <CustomNavbar />
      <Container>
        <AlertDismissible children={message}/>
        <Row className="mt-2">
          {products.map((product) => {
            return <ProductItem product={product} key={product.id} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default Products;
