import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { JWT_TOKEN, USER_DETAILS_KEY } from "../Auth/auth_crud";
import { Button } from "react-bootstrap";

const CustomNavbar = () => {
  const user_details = JSON.parse(localStorage.getItem(USER_DETAILS_KEY)) || {};

  const make_logout = () => {
    const token = JSON.parse(localStorage.getItem(JWT_TOKEN));
    const logout_url = "http://localhost:3002/logout";
    const options = {
      method: "delete",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(logout_url, options)
      .then((res) => res.json())
      .then((data) => {
        if(data.status === 200){
            localStorage.removeItem(JWT_TOKEN)
            localStorage.removeItem(USER_DETAILS_KEY)
            window.location.replace('/login')
        }
      });
  };

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Products - React</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <span className="badge bg-info">{user_details.email}</span>
          </Navbar.Text>
        </Navbar.Collapse>
        <Button variant="danger" className="ms-2" onClick={make_logout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
