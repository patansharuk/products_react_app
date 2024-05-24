import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductItem = ({ product }) => {
  return (
    <Col sm="12" md="6" lg="4" className="mb-3">
      <Card style={{ width: "18rem" }} className="w-100"> 
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg"
        />
        <Card.Body>
          <Card.Title className="text-truncate">{product.title}</Card.Title>
          <Card.Text className="text-truncate">{product.description}</Card.Text>
          <Button variant="primary">Add</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
