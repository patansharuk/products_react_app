import React, { useEffect, useState } from "react";
import { JWT_TOKEN } from "../Auth/auth_crud";
import CustomNavbar from "../Navbar/navbar";
import Alert from "react-bootstrap/Alert";
import ProductItem from "../ProductItem/product_item";
import { Container, Row } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetch_products = () => {
      const token = JSON.parse(localStorage.getItem(JWT_TOKEN));
      if (token == null) {
        window.location.replace("/login");
      }
      const products_url = "http://localhost:3002/products";
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
            window.location.replace("/login");
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
      {message && (
        <Alert key={"success"} variant={"success"}>
          {message}
        </Alert>
      )}
      <Container>
        <Row>
          {products.map((product) => {
            return <ProductItem product={product} key={product.id} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default Products;
