import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faker } from "@faker-js/faker";

const StoreItem = ({ store }) => (
  <Col sm="12" md="6" lg="4" className="mb-3">
    <Card style={{ width: "18rem" }} className="w-100">
      <Card.Img variant="top" src={faker.image.urlPicsumPhotos()} />
      <Card.Body>
        <Card.Title className="text-truncate">{store.name}</Card.Title>
        <Card.Text className="text-truncate">
          Location - {store.location}
        </Card.Text>
        <Card.Text className="text-truncate">
          Rating - {store.rating}
        </Card.Text>
        <Button variant="primary" href={`/stores/${store.id}`}>View</Button>
        <Button variant="info">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  </Col>
);
export default StoreItem;
