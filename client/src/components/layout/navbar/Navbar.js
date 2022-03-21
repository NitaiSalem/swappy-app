import {Navbar, Nav, Container} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import "./navStyle.scss";

const NavigationBar = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Navbar fixed="top" expand="sm" className="navbar-container">
      <Container fluid className="container-fluid">
        <Link to="/"> Logo image here</Link>
        <Nav>
          <Link to="/about">How it works</Link>
          { !isAuthenticated? <Link to="/login">Login</Link> :<Link to="/profile">Profile</Link> }
          <Link  to="/">Home</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
