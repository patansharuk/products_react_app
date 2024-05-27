import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { add_auth_token, add_user_details, get_auth_token } from "../../utils/authUtils";
import { redirect_to_prev } from "../../utils/redirectUtils";
import { ProductsApi } from "../../utils/urlUtils";

const Signup = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShowPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const jwt_token = get_auth_token();
    if (jwt_token !== null) {
      redirect_to_prev();
    }
  }, []);

  const make_sighup = (e) => {
    e.preventDefault();
    const payload = {
      user: {
        email: email,
        password: password,
      },
    };
    const signup_url = ProductsApi.signup_url();
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(signup_url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          setMessage(data.errors.join(" / "));
        } else {
          add_user_details(data.resource);
          add_auth_token(data.token);
          redirect_to_prev();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <Row className="pt-5">
        <Col md="6" className="m-auto">
          <h1 className="text-center mb-5">Register Account</h1>
          {message && (
            <Alert key={"danger"} variant={"danger"}>
              {message}
            </Alert>
          )}
          <Form onSubmit={make_sighup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={shouldShowPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Check me out"
                checked={shouldShowPassword}
                onChange={() => setShowPassword(!shouldShowPassword)}
              />
            </Form.Group>
            <Row>
              <Col sm="8">
                <Button variant="success" type="submit" className="w-100 mb-3">
                  Create
                </Button>
              </Col>
              <Col>
                <Button variant="warning" type="submit" className="w-100" href="/login">
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
