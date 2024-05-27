import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { clear_local_storage_replace_to, get_user_details } from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";

const CustomNavbar = () => {
  const user_details = get_user_details() || {};

  const make_logout = () => {
    const token = get_auth_token();
    const logout_url = ProductsApi.logout_url();
    const options = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(logout_url, options)
      .then((res) => {
        if (res.status === 204) {
          return;
        }
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        clear_local_storage_replace_to("/login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Products - React</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <span className="badge bg-info">{user_details.email}</span>
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
