import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import fetchProducts from "../../Fetching/Products/fetchProducts";
import { Container, Row } from "react-bootstrap";
import AlertDismissible from "../CustomAlert/customAlert";
import ProductItem from "../ProductItem/product_item";
import { fetch_token_else_redirect_login } from "../../utils/authUtils";
import GlobalComponents from "../_Global";
import fetchDealerDetails from "../../Fetching/DealerDetails/fetchDealerDetails";
import DealerDetailItem from "../Dealer/dealerDetailItem";

const states = GlobalComponents.states;

const Home = () => {
  const [productsState, setProductsState] = useState(states.loading);
  const [dealerDetailsState, setDealerDetailsState] = useState(states.loading);
  const [products, setProducts] = useState([]);
  const [dealerDetails, setDealerDetails] = useState([]);
  const [dealerDetailsMessage, setdealerDetailsMessage] = useState("");
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

    const fetchingDealerDetails = async () => {
      const token = fetch_token_else_redirect_login();
      const data = await fetchDealerDetails(token);
      if (data.data) {
        setDealerDetails(data.data);
        setDealerDetailsState(states.data);
      }
      if (data.message) {
        setdealerDetailsMessage(data.message);
      }
    };
    fetchingDealerDetails();
  }, []);

  const finalProductsResult = () => (
    <Row className="mt-2">
      {products.map((product) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </Row>
  );

  const finalDealerDetailsResult = () => (
    <Row className="mt-2">
      {dealerDetails.map((dealerDetail) => {
        return (
          <DealerDetailItem
            dealer_detail={dealerDetail}
            key={dealerDetail.id}
          />
        );
      })}
    </Row>
  );

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponents.renderTitleDivider('Products')}
        <AlertDismissible children={productsMessage} />
        {GlobalComponents.renderComponent(productsState, finalProductsResult)}
        
        {GlobalComponents.renderTitleDivider('Dealer Details')}
        <AlertDismissible children={dealerDetailsMessage} />
        {GlobalComponents.renderComponent(
          dealerDetailsState,
          finalDealerDetailsResult
        )}
      </Container>
    </>
  );
};

export default Home;
