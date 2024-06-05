import React, { useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import { useParams } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";
import { ProductsApi } from "../../utils/urlUtils";
import {
  clear_local_storage_replace_to,
  get_auth_token,
  get_user_details,
} from "../../utils/authUtils";
import GlobalComponents from "../_Global";
import AlertDismissible from "../CustomAlert/customAlert";

const states = GlobalComponents.states;

const productInitialValues = {
  title: "",
  description: "",
  price: 0,
  image_url: "",
};

const CreateProduct = () => {
  const [state, setState] = useState(states.data);
  const [message, setMessage] = useState("");
  const [storeId] = useState(useParams().id);
  const [title, setTitle] = useState(productInitialValues.title);
  const [description, setDescription] = useState(
    productInitialValues.description
  );
  const [price, setPrice] = useState(productInitialValues.price);
  const [imageUrl, setImageUrl] = useState(productInitialValues.image_url);

  const submitProduct = (e) => {
    e.preventDefault();
    const token = get_auth_token();
    const payload = {
      title: title,
      description: description,
      price: price,
      image_url: imageUrl,
    };
    const products_url = ProductsApi.create_dealer_product_url(storeId);
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
          setTitle(productInitialValues.title);
          setDescription(productInitialValues.description);
          setPrice(productInitialValues.price);
          setImageUrl(productInitialValues.image_url);
        }
      })
      .catch((e) => console.log(e));
  };

  const renderComponent = () => (
    <Container className="mt-5">
      <Row>
        <Form onSubmit={submitProduct}>
          <Form.Group className="mb-2" controlId="productForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Car, Mangoes"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="productForm.description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ex: Fresh mangoes directly from the farms."
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <div className="mb-4">
            <Form.Group className="mb-2" controlId="productForm.price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ex: 1200"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="productForm.imageurl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://image.com"
                name="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </Row>
    </Container>
  );

  const renderNothing = () => <span></span>;

  if (get_user_details().role === "customer") {
    return (
      <Container>
        <AlertDismissible>You have no access to add the product</AlertDismissible>
      </Container>
    );
  }

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponents.renderTitleDivider("Create Product")}
        <AlertDismissible>{message}</AlertDismissible>
      </Container>
      {GlobalComponents.renderComponent(state, renderNothing)}
      {renderComponent()}
    </>
  );
};

export default CreateProduct;
