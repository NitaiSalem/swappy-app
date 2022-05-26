// import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import NavDrawer from "./NavDrawer";
import "./navStyle.scss";
import logo from "../../../site images/swappy-logo.png";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { logoutUser } from "../../../actions/authActions";
// import logo from "../../../src/site images/user-icon.png";
import LogoutIcon from "@mui/icons-material/Logout";

const NavigationBar = () => {
  const [className, setClassName] = useState("closed-menu");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const updateClass = () => {
    setClassName(className === "open-menu" ? "closed-menu" : "open-menu");
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
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
        <Link to="/" onClick={() => setClassName("closed-menu")}>
          <img className="logo-image" src={logo} alt="logo" />
        </Link>
      </div>

      <MenuIcon id="toggler" onClick={updateClass} />
      {/* <label for="toggler"> */}

      <div className="responsive-menu-container">
        <div className={className}>
          <ul className="list">
            <li>
              <Link to="/" onClick={() => setClassName("closed-menu")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setClassName("closed-menu")}>
                How it works
              </Link>
            </li>
            {!isAuthenticated ? (
              <li>
                <Link to="/login" onClick={() => setClassName("closed-menu")}>
                  Login
                </Link>
              </li>
            ) : (
              <div className="profile-logout-container">
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setClassName("closed-menu")}
                  >
                    Profile
                  </Link>
                </li>
                {/* &nbsp; &nbsp; &nbsp; &nbsp; */}
                <Link className="logout-button" to="/" onClick={onLogoutClick}>
                  <LogoutIcon />
                  <span className="tooltiptext">Logout</span>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
