import React from "react";
import { Button } from "react-bootstrap";

const AddToCartButton = ({ product }) => {
  const renderIncrementButton = () => {
    return <Button variant="primary">+</Button>;
  };

  const renderDecrementButton = () => {
    let should_disable = product.quantity === 1 ? "disabled" : "";
    return (
      <Button variant="primary" className={should_disable}>
        -
      </Button>
    );
  };

  const renderAddButton = () => {
    return <Button variant="primary">Add to Cart</Button>;
  };

  const renderComponent = () => {
    if (product.quantity === undefined || product.quantity === 0) {
      return renderAddButton();
    } else {
      return (
        <div class="btn-group" role="group" aria-label="Basic example">
          {renderDecrementButton()}
          <Button variant="primary" disabled>
            {product.quantity || 0}
          </Button>
          {renderIncrementButton()}
        </div>
      );
    }
  };

  return renderComponent();
};

export default AddToCartButton;
