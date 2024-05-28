import { useEffect } from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({children}) {
  const [show, setShow] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
        setShow(false)
    }, 5000)
  },[])

  if (show && (children !== '') && (children !== null)) {
    return (
      <Alert variant="danger" className='mt-2' onClose={() => setShow(false)} dismissible>
        <Alert.Heading className='m-0'>{children}</Alert.Heading>
      </Alert>
    );
  }
  return <span></span>
}

export default AlertDismissible;