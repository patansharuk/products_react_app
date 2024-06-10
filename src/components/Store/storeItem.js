import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faker } from "@faker-js/faker";

const StoreItem = ({ store, hideOptions = false }) => (
  <Col sm="12" md="6" lg="4" className="mb-3">
    <Card style={{ width: "18rem" }} className="w-100">
      <Card.Img variant="top" src={faker.image.urlPicsumPhotos()} />
      <Card.Body>
        <Card.Title className="text-truncate">{store.name}</Card.Title>
        <Card.Text className="text-truncate">
          Location - {store.location}
        </Card.Text>
        <Card.Text className="text-truncate">Rating - {store.rating}</Card.Text>
        {!hideOptions && (
          <>
            <Button
              variant="primary"
              className="me-1"
              href={`/stores/${store.id}`}
            >
              View
            </Button>
            <Button variant="info" className="me-1" disabled>
              Edit
            </Button>
            <Button variant="danger" disabled>Delete</Button>
          </>
        )}
      </Card.Body>
    </Card>
  </Col>
);
export default StoreItem;
