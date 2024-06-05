import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import fetchProducts from "../../Fetching/Products/fetchProducts";
import { Container, Row } from "react-bootstrap";
import AlertDismissible from "../CustomAlert/customAlert";
import ProductItem from "../ProductItem/product_item";
import { fetch_token_else_redirect_login } from "../../utils/authUtils";
import GlobalComponents from "../_Global";
import fetchStores from "../../Fetching/Store/fetchStores";
import StoreItem from "../Store/storeItem";

const states = GlobalComponents.states;

const Home = () => {
  const [productsState, setProductsState] = useState(states.loading);
  const [storeState, setStoreState] = useState(states.loading);
  const [products, setProducts] = useState([]);
  const [stores, setStore] = useState([]);
  const [storeMessage, setStoreMessage] = useState("");
  const [productsMessage, setProductsMessage] = useState("");

  useEffect(() => {
    const fetchingProducts = async () => {
      const token = fetch_token_else_redirect_login();
      const data = await fetchProducts(token);
      if (data.data) {
        setProducts(data.data);
        setProductsState(states.data);
      }
      if (data.message) {
        setProductsMessage(data.message);
      }
    };
    fetchingProducts();

    const fetchingStores = async () => {
      const token = fetch_token_else_redirect_login();
      const data = await fetchStores(token);
      if (data.data) {
        setStore(data.data);
        setStoreState(states.data);
      }
      if (data.message) {
        setStoreMessage(data.message);
      }
    };
    fetchingStores();
  }, []);

  const finalProductsResult = () => (
    <Row className="mt-2">
      {products.map((product) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </Row>
  );

  const finalStoresResult = () => (
    <Row className="mt-2">
      {stores.map((store) => {
        return <StoreItem store={store} key={store.id} />;
      })}
    </Row>
  );

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponents.renderTitleDivider("Products")}
        <AlertDismissible children={productsMessage} />
        {GlobalComponents.renderComponent(productsState, finalProductsResult)}

        {GlobalComponents.renderTitleDivider("Stores")}
        <AlertDismissible children={storeMessage} />
        {GlobalComponents.renderComponent(storeState, finalStoresResult)}
      </Container>
    </>
  );
};

export default Home;
