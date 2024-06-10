import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { fetch_token_else_redirect_login } from "../../utils/authUtils";
import { StoresApi } from "../../utils/urlUtils";

const DealerAnalyticsSection = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [competitors, setCompetitors] = useState(0);

  useEffect(() => {
    const fetch_store_analytics = () => {
      const token = fetch_token_else_redirect_login();
      const url = StoresApi.store_analytics(1);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setTotalProducts(data.data.total_dealer_products);
            setCompetitors(data.data.competitors);
          }
        })
        .catch((e) => console.log(e));
    };

    fetch_store_analytics();
  });

  return (
    <Card className="container mt-2 mb-2 p-0">
      <Card.Header>Analytics</Card.Header>
      <Card.Body>
        <Card.Title className="fs-5">Total Products</Card.Title>
        <Card.Text className="fs-1">{totalProducts}</Card.Text>
        <Button variant="primary" href="/stores/19/product/create">Add Product</Button>
        <Button variant="primary" className="ms-2" href="/stores/19">View Products</Button>
      </Card.Body>

      <Card.Body>
        <Card.Title className="fs-5">Your Competitors</Card.Title>
        <Card.Text className="fs-1">{competitors}</Card.Text>
        <Button variant="primary" disabled>
          Check
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DealerAnalyticsSection;
