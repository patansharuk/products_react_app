import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faker } from "@faker-js/faker";

const ProductItem = ({ product }) => {
  return (
    <Col sm="12" md="6" lg="4" className="mb-3">
      <Card style={{ width: "18rem" }} className="w-100"> 
        <Card.Img
          variant="top"
          src={faker.image.urlPicsumPhotos()}
        />
        <Card.Body>
          <Card.Title className="text-truncate">{product.title}</Card.Title>
          <Card.Text className="text-truncate">{product.description}</Card.Text>
          <Card.Title className="text-truncate">{faker.commerce.price({min:10, max: 10000, symbol: '$'})}</Card.Title>
          <Button variant="primary">Add</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
