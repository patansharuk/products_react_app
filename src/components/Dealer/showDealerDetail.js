import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import { useParams } from "react-router-dom";
import { DealerDetailsApi } from "../../utils/urlUtils";
import { Card, Container, ListGroup, Row } from "react-bootstrap";
import AlertDismissible from "../CustomAlert/customAlert";
import {
  clear_local_storage_replace_to,
  fetch_token_else_redirect_login,
} from "../../utils/authUtils";
import { faker } from "@faker-js/faker";
import GlobalComponent from "../_Global";
import fetchDealerProducts from "../../Fetching/Products/fetchDealerProducts";

const states = GlobalComponent.states;

const ShowDealerDetail = () => {
  const [productsState, setProductsState] = useState(states.loading);
  const [dealerProducts, setDealerProducts] = useState([]);
  const [productsMessage, setProductsMessage] = useState("");

  const [dealerDetailId] = useState(useParams().id);
  const [state, setState] = useState(states.loading);
  const [dealerDetail, setDealerDetail] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch_dealer_detail = () => {
      setState(states.loading);
      const token = fetch_token_else_redirect_login();
      const dealers_url =
        DealerDetailsApi.show_dealer_detail_url(dealerDetailId);
      const dealers_options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(dealers_url, dealers_options)
        .then((res) => {
          res.status === 401 && clear_local_storage_replace_to("/login");
          //   if (!res.ok) {
          //     setState(states.api_error);
          //     throw "Routing error";
          //   }
          return res.json();
        })
        .then((data) => {
          setMessage(data.message);
          setDealerDetail(data.data);
          Object.values(data.data).length > 0
            ? setState(states.dealer_detail)
            : setState(states.empty_items);
        })
        .catch((e) => console.log(e));
    };
    fetch_dealer_detail();
    const fetch_dealer_detail_products = async () => {
      setProductsState(states.loading);
      const token = fetch_token_else_redirect_login();
      const data = await fetchDealerProducts(token);
      console.log(data);
      if (data.data) {
        setDealerProducts(data.data);
        setProductsState(states.data);
      }
      if (data.message) {
        setProductsMessage(data.message);
      }
    };
    fetch_dealer_detail_products();
  }, []);

  const renderDealerDetail = () => (
    <Container>
      <AlertDismissible children={message} />
      <Row className="mt-2">
        <Card className="col-lg-8 m-auto">
          <Card.Img
            variant="top"
            src={faker.image.urlPicsumPhotos()}
            height={200}
          />
          <Card.Body>
            <Card.Title>{dealerDetail.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <span className="fw-bold">Loaction: </span>
              {dealerDetail.location}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Rating: </span>
              {dealerDetail.rating}
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );

  const renderDealerProducts = () => (
    <Container>
      <AlertDismissible children={productsMessage} />
      <Row className="mt-2">
        {dealerProducts.map((product) => (
          <Card className="col-md-6 col-lg-4 m-auto mb-2">
            <Card.Img
              variant="top"
              src={faker.image.urlPicsumPhotos()}
              height={200}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <span className="fw-bold">Loaction: </span>
                {dealerDetail.location}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Price: </span>
                {product.price}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponent.renderTitleDivider("Dealer Detail")}
      </Container>
      {GlobalComponent.renderComponent(state, renderDealerDetail)}

      <Container>
        <hr />
        {GlobalComponent.renderTitleDivider("Dealer Products")}
      </Container>
      {GlobalComponent.renderComponent(productsState, renderDealerProducts)}
    </>
  );
};

export default ShowDealerDetail;
