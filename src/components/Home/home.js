import React, { useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import {
  get_user_details,
} from "../../utils/authUtils";
import GlobalComponents from "../_Global";
import DealerAnalyticsSection from "./dealerAnalyticsSection";
import AdminAnalyticsSection from "./adminAnalyticsSection";

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
  const [details] = useState(fetchUserData());

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

  const renderDealerAnalyticsSection = () => {
    return <DealerAnalyticsSection />;
  };

  const renderAdminAnalyticsSection = () => {
    return <AdminAnalyticsSection />;
  };

  const renderAdminView = () => (
    <>
      {renderProfileSection()}
      {renderAdminAnalyticsSection()}
    </>
  );

  const renderDealerView = () => (
    <>
      {renderProfileSection()}
      {renderDealerAnalyticsSection()}
    </>
  );

  const renderCustomerView = () => (
    <>
      {renderProfileSection()}
      {renderOffersSection()}
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
};

export default Home;
