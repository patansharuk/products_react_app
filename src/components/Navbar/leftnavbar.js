import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Menu from './menu';

const Leftnavbar = ({user_details, make_logout}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose} className='d-md-none' backdropClassName='d-md-none'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Products React</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Menu user_details={user_details} make_logout={make_logout}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Leftnavbar;