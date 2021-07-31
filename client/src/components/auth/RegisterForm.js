import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // local State
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password do not match!" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);

      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control
            onChange={onChangeRegisterForm}
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            onChange={onChangeRegisterForm}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            onChange={onChangeRegisterForm}
            type="password"
            placeholder="Comfirm Password"
            name="confirmPassword"
            value={confirmPassword}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ms-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
