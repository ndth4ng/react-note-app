import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Container>
        <Navbar.Brand className="fw-bolder text-white">
          <img
            src={learnItLogo}
            alt="learnItLogo"
            width="32"
            height="32"
            className="me-2"
          />
          LearnIt
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="fw-bolder text-white"
              to="/dashboard"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link className="fw-bolder text-white" to="/about" as={Link}>
              About
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="fw-bolder text-white" disabled>
              Welcome {username}
            </Nav.Link>
            <Button
              onClick={logout}
              variant="secondary"
              className="fw-bolder text-white"
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="me-2"
              />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
