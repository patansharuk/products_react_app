import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { faker } from "@faker-js/faker";
import AddToCartButton from "../AddToCartButton/addToCartButton";

const ProductItem = ({ product, onAddProduct }) => {
  return (
    <Col sm="12" md="6" lg="4" className="mb-3">
      <Card style={{ width: "18rem" }} className="w-100">
        <Card.Img variant="top" src={faker.image.urlPicsumPhotos()} />
        <Card.Body>
          <Card.Title className="text-truncate">{product.title}</Card.Title>
          <Card.Text className="text-truncate">{product.description}</Card.Text>
          <Card.Title className="text-truncate">$ {product.price}</Card.Title>
          <hr />
          <AddToCartButton product={product} onAddProduct={onAddProduct}/>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
