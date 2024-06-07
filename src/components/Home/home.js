import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import fetchProducts from "../../Fetching/Products/fetchProducts";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import AlertDismissible from "../CustomAlert/customAlert";
import ProductItem from "../ProductItem/product_item";
import {
  fetch_token_else_redirect_login,
  get_user_details,
} from "../../utils/authUtils";
import GlobalComponents from "../_Global";
import fetchStores from "../../Fetching/Store/fetchStores";
import StoreItem from "../Store/storeItem";

const states = GlobalComponents.states;

const fetchUserData = () => {
  const userDetails = get_user_details();
  if (userDetails !== null) {
    const details = {
      name: userDetails.name,
      description: userDetails.role,
      email: userDetails.email,
      bg_url:
        "https://png.pngtree.com/thumb_back/fh260/back_our/20190625/ourmid/pngtree-blue-geometric-flattened-taobao-e-commerce-coupon-background-image_262564.jpg",
      image_url:
        "https://media.licdn.com/dms/image/D5603AQGpEr5CVfqYYw/profile-displayphoto-shrink_200_200/0/1687967904545?e=1723075200&v=beta&t=fZnIcy1Barj5KrmdZJEEsAq3ZkmFFvGbBxWC0ltxRhQ",
    };
    return details;
  }
  return {};
};

const Home = () => {
  const [productsState, setProductsState] = useState(states.loading);
  const [storeState, setStoreState] = useState(states.loading);
  const [products, setProducts] = useState([]);
  const [stores, setStore] = useState([]);
  const [storeMessage, setStoreMessage] = useState("");
  const [productsMessage, setProductsMessage] = useState("");
  const [details, setDetails] = useState(fetchUserData());

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
      if (data?.status === 404) {
        setStoreState(states.empty_items);
      } else {
        if (data.data) {
          setStore(data.data);
          setStoreState(states.data);
        }
        if (data.message) {
          setStoreMessage(data.message);
        }
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

  const renderProfileSection = () => (
    <Container>
      <Row className="border">
        <Col
          style={{
            height: "100px",
            backgroundColor: "silver",
          }}
          xs={12}
          className="border bg-img"
        ></Col>
        <Col xs={12}>
          <a href="/">
            <img
              src={details.image_url}
              width={100}
              style={{ borderRadius: "50%", marginTop: "-50px" }}
              className="border border-5 border-primary"
            />
            <h2>{details.name}</h2>
          </a>
          <p>{details.description}</p>
          <div className="mb-3">
            <a href="/">{details.email}</a>
          </div>
        </Col>
      </Row>
    </Container>
  );

  const renderOffersSection = () => (
    <Container className="mt-3">
      <Row>
        <Carousel>
          <Carousel.Item>
            <img
              src="https://media.istockphoto.com/id/1178423206/vector/cyber-monday-sale-banner-template-for-business-promotion-vector-illustration.jpg?s=612x612&w=0&k=20&c=ApQ8cW6N7iEKd18nzklHg7BwqVVEQd5Rv1gMLMYbZsk="
              style={{ width: "100%", height: "400px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://media.istockphoto.com/id/1052093922/vector/hot-autumn-sale-brochure-design.jpg?s=612x612&w=0&k=20&c=o6Bfwp0RPss1s9rk8a2Uq7hD_BaNic_2GE-wB9WKvwU="
              style={{ width: "100%", height: "400px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://media.istockphoto.com/id/1392374079/vector/mega-sale-special-offer-stage-podium-percent-stage-podium-scene-with-for-award-decor-element.jpg?s=612x612&w=0&k=20&c=IyOg98qWlS54Sj0tbTgG7IpBtESRU9CE91x-LUktfVs="
              style={{ width: "100%", height: "400px" }}
            />
          </Carousel.Item>
        </Carousel>
      </Row>
    </Container>
  );

  const renderProductsSection = () => (
    <>
      {GlobalComponents.renderTitleDivider("Products")}
      <Container>
        {finalProductsResult()}
      </Container>
    </>
  )
  

  const renderAdminView = () => (
    <>
      {renderProfileSection()}
      {/* {renderDealerAnalyticsSection()}
      {renderAnalyticsSection()} */}
    </>
  );

  const renderDealerView = () => (
    <>
      {renderProfileSection()}
      {/* {renderAnalyticsSection()} */}
    </>
  );

  const renderCustomerView = () => (
    <>
      {renderProfileSection()}
      {renderOffersSection()}
      {renderProductsSection()}
    </>
  );
  const views = {
    admin: renderAdminView(),
    dealer: renderDealerView(),
    customer: renderCustomerView(),
  };

  return (
    <>
      <CustomNavbar />
      {GlobalComponents.renderBasedOnRole(views)}
    </>
  );

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponents.renderTitleDivider("Products")}
        <AlertDismissible children={productsMessage} />
        {GlobalComponents.renderComponent(productsState, finalProductsResult)}
      </Container>
    </>
  );
};

export default Home;
