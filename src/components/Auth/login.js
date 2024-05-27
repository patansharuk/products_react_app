import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { add_auth_token, add_user_details, get_auth_token } from "../../utils/authUtils";
import { redirect_to_prev } from "../../utils/redirectUtils";
import { ProductsApi } from "../../utils/urlUtils";

const Login = () => {
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

  const make_login = (e) => {
    e.preventDefault();
    const payload = {
      user: {
        email: email,
        password: password,
      },
    };
    const login_url = ProductsApi.login_url();
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(login_url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
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
          <h1 className="text-center mb-5">Login</h1>
          {message && (
            <Alert key={"danger"} variant={"danger"}>
              {message}
            </Alert>
          )}
          <Form onSubmit={make_login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                <Button variant="warning" type="submit" className="w-100 mb-3">
                  Login
                </Button>
              </Col>
              <Col>
                <Button variant="danger" type="submit" className="w-100" href="/signup">
                  Signup
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
