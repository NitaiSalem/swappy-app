import {Navbar, Nav, Container} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import NavDrawer from "./NavDrawer";
import "./navStyle.scss";

const NavigationBar = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    // <Navbar bg="light" variant="light"  id ="navbar" fixed="top" expand="sm" className="navbar-container">
    //   <Container fluid className="container-fluid">
    //     <Link to="/"> Logo</Link>
    //     <Nav> 
    //       <Link to="/about">How it works</Link>
    //       { !isAuthenticated? <Link to="/login">Login</Link> :<Link to="/profile">Profile</Link> }
    //       <Link  to="/">Home</Link>
    //     </Nav>
    //   </Container>
    // </Navbar>


    <NavDrawer/> 
  );





};

export default NavigationBar;
