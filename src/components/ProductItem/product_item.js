import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { faker } from "@faker-js/faker";
import AddToCartButton from "../AddToCartButton/addToCartButton";
import { is_customer } from "../../utils/authUtils";

const ProductItem = ({
  product,
  onAddProduct = "",
  onIncrementProduct = "",
}) => {
  return (
    <Col sm="6" md="4" lg="3" className="mb-3">
      <Card style={{ width: "18rem" }} className="w-100">
        <Card.Img variant="top" src={faker.image.urlPicsumPhotos()} />
        <Card.Body>
          <Card.Title className="text-truncate">{product.title}</Card.Title>
          <Card.Text className="text-truncate">{product.description}</Card.Text>
          <Card.Title className="text-truncate">$ {product.price}</Card.Title>
          {is_customer() ? (
            <>
              <hr />
              <AddToCartButton
                product={product}
                onAddProduct={onAddProduct}
                onIncrementProduct={onIncrementProduct}
              />
            </>
          ) : (
            <>
              <hr />
              <Button variant="info" className="me-1" size="sm" disabled>
                View
              </Button>
              <Button variant="warning" className="me-1" size="sm" disabled>
                Edit
              </Button>
              <Button variant="danger" size="sm" disabled>
                Delete
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
