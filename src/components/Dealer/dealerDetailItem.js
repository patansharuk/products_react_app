import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faker } from "@faker-js/faker";

const DealerDetailItem = ({ dealer_detail }) => (
  <Col sm="12" md="6" lg="4" className="mb-3">
    <Card style={{ width: "18rem" }} className="w-100">
      <Card.Img variant="top" src={faker.image.urlPicsumPhotos()} />
      <Card.Body>
        <Card.Title className="text-truncate">{dealer_detail.name}</Card.Title>
        <Card.Text className="text-truncate">
          Location - {dealer_detail.location}
        </Card.Text>
        <Card.Text className="text-truncate">
          Rating - {dealer_detail.rating}
        </Card.Text>
        <Button variant="primary" href={`/dealer_detail/${dealer_detail.id}`}>View</Button>
        <Button variant="info">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  </Col>
);
export default DealerDetailItem;
