import { useState } from 'react';
import { Fade, Alert } from 'react-bootstrap';

function AlertDismissible({children}) {
  const [show, setShow] = useState(true);

  if (show && (children !== '') && (children !== null)) {
    return (
      <Fade in={show} onExited={()=> setShow(false)}>
        <Alert variant="danger" className='mt-2' onClose={() => setShow(false)} dismissible>
          <Alert.Heading className='m-0'>{children}</Alert.Heading>
        </Alert>
      </Fade>
    );
  }
  return <span></span>
}

export default AlertDismissible;