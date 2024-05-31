import React from "react";
import { Button } from "react-bootstrap";

const AddToCartButton = ({ product, onAddProduct }) => {
  const renderIncrementButton = () => {
    return <Button variant="primary">+</Button>;
  };

  const renderDecrementButton = () => {
    return (
      <Button variant="primary">
        -
      </Button>
    );
  };

  const renderAddButton = () => {
    return <Button variant="primary" onClick={()=>onAddProduct(product.id)}>Add to Cart</Button>;
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
