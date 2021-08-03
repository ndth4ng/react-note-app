import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // local State
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);

      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Row className="justify-content-center">
          <Col md={5} sm={8} xs={10}>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={onChangeLoginForm}
                className=""
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={5} sm={8} xs={10}>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={onChangeLoginForm}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ms-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
