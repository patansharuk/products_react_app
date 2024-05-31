import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import ProductItem from "../ProductItem/product_item";
import { Container, Row } from "react-bootstrap";
import {
  clear_local_storage_replace_to,
  fetch_token_else_redirect_login,
} from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";
import AlertDismissible from "../CustomAlert/customAlert";
import GlobalComponents from "../_Global";
import CartItemsUtil from "../../utils/cartUtils";

const states = GlobalComponents.states;

const Products = () => {
  const [state, setState] = useState(states.loading);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch_products = () => {
      setState(states.loading);
      const token = fetch_token_else_redirect_login();
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
          if (res.status === 401) {
            clear_local_storage_replace_to("/login");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setMessage(data.message);
          setProducts(data.data);
          setState(states.products);
        })
        .catch((e) => console.log(e));
    };
    fetch_products();
  }, []);

  const onAddProduct = (id) => {
    const mod_products = products.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: 1 };
      }
      return product;
    });
    const modCartItems = mod_products.filter((product) => product.quantity !== undefined)
    CartItemsUtil.addCartItems(modCartItems);
    setProducts(mod_products);
  };

  const incrementProduct = (product_id) => {
    const filtered_product = products.filter(
      (product) => product.id === product_id
    );
  };

  const decrementProduct = () => {};

  const renderProducts = () => (
    <Container>
      <AlertDismissible children={message} />
      <Row className="mt-2">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product.id}
              onAddProduct={onAddProduct}
            />
          );
        })}
      </Row>
    </Container>
  );

  return (
    <>
      <CustomNavbar />
      <Container>{GlobalComponents.renderTitleDivider("Products")}</Container>
      {GlobalComponents.renderComponent(state, renderProducts)}
    </>
  );
};

export default Products;
