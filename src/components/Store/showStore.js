import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import { useParams } from "react-router-dom";
import { StoresApi } from "../../utils/urlUtils";
import { Card, Container, ListGroup, Row } from "react-bootstrap";
import {
  clear_local_storage_replace_to,
  fetch_token_else_redirect_login,
} from "../../utils/authUtils";
import { faker } from "@faker-js/faker";
import GlobalComponent from "../_Global";
import fetchStoreProducts from "../../Fetching/Products/fetchStoreProducts";
import StoreItem from "./storeItem";
import ProductItem from "../ProductItem/product_item";

const states = GlobalComponent.states;

const ShowStore = () => {
  const [productsState, setProductsState] = useState(states.loading);
  const [storeProducts, setStoreProducts] = useState([]);
  const [productsMessage, setProductsMessage] = useState("");

  const [storeId] = useState(useParams().id);
  const [state, setState] = useState(states.loading);
  const [store, setStore] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch_store = () => {
      setState(states.loading);
      const token = fetch_token_else_redirect_login();
      const store_url = StoresApi.show_store_url(storeId);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(store_url, options)
        .then((res) => {
          res.status === 401 && clear_local_storage_replace_to("/login");
          if (res.status === 404) {
            setState(states.empty_items);
            throw new Error("Routing error");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          data.message && setMessage(data.message);
          if (data.data) {
            setStore(data.data);
            Object.values(data.data).length > 0
              ? setState(states.dealer_detail)
              : setState(states.empty_items);
          }
        })
        .catch((e) => console.log(e));
    };
    fetch_store();

    const fetch_store_products = async () => {
      setProductsState(states.loading);
      const token = fetch_token_else_redirect_login();
      const data = await fetchStoreProducts(token, storeId);

      if (data?.status === 404) {
        setProductsState(states.empty_items);
      }
      if (data.data) {
        setStoreProducts(data.data);
        setProductsState(states.data);
      }
      if (data.message) {
        setProductsMessage(data.message);
      }
    };
    fetch_store_products();
  }, []);

  const renderStore = () => (
    <Container>
      <StoreItem store={store} key={store.id} hideOptions={true}/>
      <Card>
        <Card.Body>
          <Card.Link
            className="btn btn-primary"
            href={`/stores/${storeId}/product/create`}
          >
            Add Product
          </Card.Link>
          <Card.Link className="btn btn-info disabled" href={`/stores/${storeId}/edit`}>
            Edit Store
          </Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );

  const renderStoreProducts = () => (
    <Container>
      <Row className="mt-2">
        {storeProducts.map((product) => (
          <ProductItem product={product} />
        ))}
      </Row>
    </Container>
  );

  return (
    <>
      <CustomNavbar />
      {GlobalComponent.renderTitleDivider("Store")}
      {GlobalComponent.renderComponent(state, renderStore)}

      <hr className="container" />
      {GlobalComponent.renderTitleDivider("Store Products")}
      {GlobalComponent.renderComponent(productsState, renderStoreProducts)}
    </>
  );
};

export default ShowStore;
