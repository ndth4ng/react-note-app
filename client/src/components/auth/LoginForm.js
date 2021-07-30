import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Router
  const history = useHistory();

  // local State
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);

      if (loginData.success) {
        history.push("/dashboard");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={onChangeLoginForm}
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
          />
        </Form.Group>

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

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
