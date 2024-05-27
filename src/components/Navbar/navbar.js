import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { clear_local_storage_replace_to, get_user_details, get_auth_token } from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";
import Leftnavbar from "./leftnavbar";
import Menu from "./menu";

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
        <div>
          <Navbar.Brand href="#home">Products - React</Navbar.Brand>
          <Navbar.Toggle />
        </div>
        <div className="d-none d-md-flex">
          <Menu user_details={user_details} make_logout={make_logout} />
        </div>
        <div className="d-md-none">
          <Leftnavbar user_details={user_details} make_logout={make_logout}/>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
