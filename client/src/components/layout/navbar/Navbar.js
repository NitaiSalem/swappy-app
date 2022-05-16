// import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import NavDrawer from "./NavDrawer";
import "./navStyle.scss";
import logo from "../../../site images/swappy-logo.png";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
// import logo from "../../../src/site images/user-icon.png";

const NavigationBar = () => {
  const [className, setClassName] = useState("closed-menu");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const updateClass = () => {
    
    setClassName(className === "open-menu" ? "closed-menu" : "open-menu");
  };
  return (
    // <div>
    //   {window.innerWidth < 600 ? (
    //     <NavDrawer />
    //   ) : (
    //     <Navbar
    //       bg="light"
    //       variant="light"
    //       id="navbar"
    //       fixed="top"
    //       expand="sm"
    //       className="navbar-container"
    //     >
    //       <Container fluid className="container-fluid">
    //         <Link to="/"> Logo</Link>
    //         <Nav>
    //           <Link to="/about">How it works</Link>
    //           {!isAuthenticated ? (
    //             <Link to="/login">Login</Link>
    //           ) : (
    //             <Link to="/profile">Profile</Link>
    //           )}
    //           <Link to="/">Home</Link>
    //         </Nav>
    //       </Container>
    //     </Navbar>
    //   )}
    // </div>

    <nav className="navigation-bar" id="navigation-bar">
      {/*later change to link   */}
      <div className="logo-container">
        <Link to="/" onClick={()=> setClassName("closed-menu")}>
          <img className="logo-image" src={logo} alt="logo" />
        </Link>
      </div>

      <MenuIcon id="toggler" onClick={updateClass}/>
        {/* <label for="toggler"> */}
      
<div className= "responsive-menu-container"> 
      <div className={className}>
        <ul className="list">
          <li>
            <Link to="/about" onClick={()=> setClassName("closed-menu")}> How it works</Link>
          </li>
          <li>
            {!isAuthenticated ? (
              <Link to="/login" onClick={()=> setClassName("closed-menu")}>Login</Link>
            ) : (
              <Link to="/profile" onClick={()=> setClassName("closed-menu")}>Profile</Link>
            )}
          </li>

          <li>
            <Link to="/" onClick={()=> setClassName("closed-menu")}>Home</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
