import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavLinks from "./navlinks";

const Leftnavbar = ({ user_details, make_logout }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="d-md-none"
        backdropClassName="d-md-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Products React</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Signed in as:{" "}
          <span className="badge bg-info">{user_details.email}</span>
          <hr />
          <NavLinks/>
          <hr />
          <Button variant="danger" className="ms-2" onClick={make_logout}>
            Logout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Leftnavbar;
