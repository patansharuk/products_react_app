import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import { Container, Row } from "react-bootstrap";
import {
  clear_local_storage_replace_to,
  fetch_token_else_redirect_login,
} from "../../utils/authUtils";
import { StoresApi } from "../../utils/urlUtils";
import GlobalComponents from "../_Global";
import StoreItem from "./storeItem";

const states = GlobalComponents.states;

const Stores = () => {
  const [state, setState] = useState(states.loading);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetch_stores = () => {
      setState(states.loading);
      const token = fetch_token_else_redirect_login();
      const stores_url = StoresApi.stores_url();
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(stores_url, options)
        .then((res) => {
          if (res.status === 401) {
            clear_local_storage_replace_to("/login");
          } else if (res.status === 404) {
            setState(states.empty_items);
            throw Error("Api error");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setStores(data.data);
          data.data.length > 0
            ? setState(states.data)
            : setState(states.empty_items);
        })
        .catch((e) => console.log(e));
    };
    fetch_stores();
  }, []);

  const renderStores = () => (
    <Container>
      <Row className="mt-2">
        {stores.map((store) => (
          <StoreItem store={store} key={store.id} />
        ))}
      </Row>
    </Container>
  );

  return (
    <>
      <CustomNavbar />
      {GlobalComponents.renderTitleDivider("Stores")}
      {GlobalComponents.renderComponent(state, renderStores)}
    </>
  );
};

export default Stores;
