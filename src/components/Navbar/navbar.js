import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {
  clear_local_storage_replace_to,
  get_user_details,
  get_auth_token,
} from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";
import Leftnavbar from "./leftnavbar";
import { Button } from "react-bootstrap";
import NavLinks from "./navlinks";

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
          console.log(res);
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        clear_local_storage_replace_to("/login");
      })
      .catch((e) => console.log(e));
  };

  const renderMenu = () => (
    <div className="d-none d-md-flex">
      <NavLinks/>
      <Button variant="danger" className="ms-2" onClick={make_logout}>
        Logout
      </Button>
    </div>
  );

  const renderLeftNavbar = () => (
    <div className="d-md-none">
      <Leftnavbar user_details={user_details} make_logout={make_logout} />
    </div>
  );

  const renderComponent = () => (
    <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <div>
          <Navbar.Brand href="/">Products - React</Navbar.Brand>
          <Navbar.Toggle />
        </div>
        {renderMenu()}
        {renderLeftNavbar()}
      </Container>
    </Navbar>
  );

  return renderComponent();
};

export default CustomNavbar;
