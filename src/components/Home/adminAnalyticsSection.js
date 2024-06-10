import React, { useEffect, useState } from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import { fetch_token_else_redirect_login } from "../../utils/authUtils";
import { Miss } from "../../utils/urlUtils";

const AdminAnalyticsSection = () => {
  const [customersCount, setCustomersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [storesCount, setStoresCount] = useState(0);
  const [dealersCount, setDealersCount] = useState(0);

  useEffect(() => {
    const fetch_admin_dashboard = () => {
      const token = fetch_token_else_redirect_login();
      const url = Miss.admin_dashboard_url();
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
            setCustomersCount(data.data.customers_count);
            setProductsCount(data.data.products_count);
            setStoresCount(data.data.stores_count);
            setDealersCount(data.data.dealers_count);
          }
        })
        .catch((e) => console.log(e));
    };

    fetch_admin_dashboard();
  });

  const renderGlobalTab = () => (
    <Card className="container p-0 mb-2">
      <Card.Body>
        <Card.Title className="fs-5">Products</Card.Title>
        <Card.Text className="fs-1">{productsCount}</Card.Text>
        <Button variant="primary" href="/stores/19/product/create" disabled>
          Add Product
        </Button>
        <Button variant="primary" className="ms-2" href="/stores/19" disabled>
          View Products
        </Button>
      </Card.Body>
      <Card.Body>
        <Card.Title className="fs-5">Stores</Card.Title>
        <Card.Text className="fs-1">{storesCount}</Card.Text>
        <Button variant="primary" href="/stores/19/product/create" disabled>
          Add Store
        </Button>
        <Button variant="primary" className="ms-2" href="/stores/19" disabled>
          View Stores
        </Button>
      </Card.Body>
      <Card.Body>
        <Card.Title className="fs-5">Dealers</Card.Title>
        <Card.Text className="fs-1">{dealersCount}</Card.Text>
        <Button variant="primary" href="/stores/19/product/create" disabled>
          Add Dealer
        </Button>
        <Button variant="primary" className="ms-2" href="/stores/19" disabled>
          View Dealers
        </Button>
      </Card.Body>
      <Card.Body>
        <Card.Title className="fs-5">Customers</Card.Title>
        <Card.Text className="fs-1">{customersCount}</Card.Text>
        <Button variant="primary" href="/stores/19/product/create" disabled>
          Add Customer
        </Button>
        <Button variant="primary" className="ms-2" href="/stores/19" disabled>
          View Customers
        </Button>
      </Card.Body>
    </Card>
  );

  const renderStoreTab = () => (
    <Card className="container p-0 mb-2">
      <Card.Body>
        <Card.Title className="fs-5">Active Stores</Card.Title>
        <Card.Text className="fs-1">{storesCount}</Card.Text>
        <Button variant="primary" disabled>
          Check
        </Button>
      </Card.Body>
      <Card.Body>
        <Card.Title className="fs-5">Inactive Stores</Card.Title>
        <Card.Text className="fs-1">{storesCount}</Card.Text>
        <Button variant="primary" disabled>
          Check
        </Button>
      </Card.Body>
    </Card>
  );

  const renderUserTab = () => (
    <Card className="container p-0 mb-2">
      <Card.Body>
        <Card.Title className="fs-5">Active Users</Card.Title>
        <Card.Text className="fs-1">{storesCount}</Card.Text>
        <Button variant="primary" disabled>
          Check
        </Button>
      </Card.Body>
      <Card.Body>
        <Card.Title className="fs-5">Inactive Users</Card.Title>
        <Card.Text className="fs-1">{storesCount}</Card.Text>
        <Button variant="primary" disabled>
          Check
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <Tabs
      defaultActiveKey="global"
      id="uncontrolled-tab-example"
      className="container mb-3 mt-3"
    >
      <Tab eventKey="global" title="Global Analytics">
        {renderGlobalTab()}
      </Tab>
      <Tab eventKey="store" title="Store Analytics">
        {renderStoreTab()}
      </Tab>
      <Tab eventKey="user" title="User Analytics">
        {renderUserTab()}
      </Tab>
    </Tabs>
  );
};

export default AdminAnalyticsSection;
