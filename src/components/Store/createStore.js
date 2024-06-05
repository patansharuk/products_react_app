import React, { useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import GlobalComponents from "../_Global/index";
import {
  clear_local_storage_replace_to,
  get_auth_token,
  get_user_details,
} from "../../utils/authUtils";
import { StoresApi } from "../../utils/urlUtils";
import { Button, Container, Form, Row } from "react-bootstrap";
import AlertDismissible from "../CustomAlert/customAlert";

const states = GlobalComponents.states;

const dealerDetailInitialValues = {
  name: "",
  location: "",
  rating: 0,
};

const CreateStore = () => {
  const [state, setState] = useState(states.data);
  const [message, setMessage] = useState("");
  const [current_user] = useState(get_user_details());
  const [name, setName] = useState(current_user.name);
  const [location, setLocation] = useState(dealerDetailInitialValues.location);
  const [rating, setRating] = useState(dealerDetailInitialValues.rating);

  const submitDealerDetails = (e) => {
    e.preventDefault();
    const token = get_auth_token();
    const payload = {
      name: name,
      location: location,
      rating: rating,
    };
    const products_url = StoresApi.create_store_url();
    const products_options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };
    fetch(products_url, products_options)
      .then((res) => {
        if (res.status === 401) {
          clear_local_storage_replace_to("/login");
        } else if (res.status === 404) {
          setState(states.api_error);
          throw Error("api error");
        }
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        }
        if (data.data) {
          setName(dealerDetailInitialValues.name);
          setLocation(dealerDetailInitialValues.location);
          setRating(dealerDetailInitialValues.rating);
        }
      })
      .catch((e) => console.log(e));
  };

  const renderNothing = () => <span></span>;

  const renderComponent = () => (
    <Container className="mt-5">
      <Row>
        <Form onSubmit={submitDealerDetails}>
          <Form.Group className="mb-2 col-md-6" controlId="productForm.name">
            <Form.Label>Dealer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Sharukhan"
              name="name"
              value={current_user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-2 col-md-6"
            controlId="productForm.location"
          >
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              rows={3}
              placeholder="Ex: Chennai"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2 col-2" controlId="productForm.rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ex: 3"
              name="rating"
              value={rating}
              disabled
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Row>
    </Container>
  );

  if (current_user.role === "customer") {
    return (
      <>
        <CustomNavbar />
        <Container>
          <AlertDismissible>
            You must be dealer to access this page.
          </AlertDismissible>
        </Container>
      </>
    );
  }

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponents.renderTitleDivider("Create Store")}
        <AlertDismissible>{message}</AlertDismissible>
      </Container>
      {GlobalComponents.renderComponent(state, renderNothing)}
      {renderComponent()}
    </>
  );
};

export default CreateStore;
