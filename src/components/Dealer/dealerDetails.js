import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import DealerDetailItem from "./dealerDetailItem";
import { Container, Row } from "react-bootstrap";
import {
  clear_local_storage_replace_to,
  fetch_token_else_redirect_login,
} from "../../utils/authUtils";
import { DealerDetailsApi } from "../../utils/urlUtils";
import AlertDismissible from "../CustomAlert/customAlert";
import GlobalComponents from "../_Global";

const states = GlobalComponents.states;

const DealerDetails = () => {
  const [state, setState] = useState(states.loading);
  const [dealer_details, setDealerDetails] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch_dealers = () => {
      setState(states.loading);
      const token = fetch_token_else_redirect_login()
      const dealers_url = DealerDetailsApi.dealer_details_url();
      const dealers_options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(dealers_url, dealers_options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            setState(states.api_error);
            throw "Routing error";
          }
        })
        .then((data) => {
          if (data.errors) {
            clear_local_storage_replace_to("/login");
          } else {
            setMessage(data.message);
            setDealerDetails(data.data);
            data.data.length > 0
              ? setState(states.data)
              : setState(states.empty_items);
          }
        })
        .catch((e) => console.log(e));
    };
    fetch_dealers();
  }, []);

  const renderDealerDetails = () => (
    <Container>
      <AlertDismissible children={message} />
      <Row className="mt-2">
        {dealer_details.map((dealer_detail) => (
          <DealerDetailItem
            dealer_detail={dealer_detail}
            key={dealer_detail.id}
          />
        ))}
      </Row>
    </Container>
  );

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponents.renderTitleDivider("Dealer Details")}
      </Container>
      {GlobalComponents.renderComponent(state, renderDealerDetails)}
    </>
  );
};

export default DealerDetails;
