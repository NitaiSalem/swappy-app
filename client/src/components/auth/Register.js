import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ValidationTextField from "./ValidationTextField";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Footer from "../layout/footer/Footer";
import { GET_ERRORS } from "../../actions/types";

// onChange={(e) => setEmail(e.target.value)}
// value={state}
// error={reduxErrors.email}
// id="email"
// label="Email"
// helperText={reduxErrors.email}
// variant="standard"

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [footerDisplay, setFooterDisplay] = useState(
    window.innerWidth > 790 ? "flex" : "none"
  );
  const reduxErrors = useSelector((state) => state.errors);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("this is navigate " ,navigate);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Profile"); // push user to dashboard when they login
    }
  }, [isAuthenticated]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("resize entered");
      if (window.innerWidth < 790) {
        setFooterDisplay("none");
      } else {
        console.log("entered else to resize");
        setFooterDisplay("flex");
      }
    });

    return () => {
      window.removeEventListener("resize", setFooterDisplay);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault(); //we’ll use e.preventDefault() to stop the page from reloading when the submit button is clicked
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    dispatch(registerUser(newUser));
    // setIsRegistered(true);
  };
  const navigateAuth = () => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  };

  // if (isAuthenticated) {
  //   return (
  //     <div>
  //       <p>Loading... </p>
  //       <p>Loading... </p>
  //       <p>Loading... </p>
  //       <p>Loading... </p>
  //       <p>Loading... </p>
  //       <p>Loading... </p>
  //       <p>Loading... </p>
  //     </div>
  //   );
  // }

  return (
    <div className="register-container">
      <div className="auth-box-container">
        <div className="top-controls-container">
          <Link to="/" className="back-home-link">
            <KeyboardBackspaceIcon className="back-home-icon" />{" "}
            <span>BACK TO HOME </span>
          </Link>
          <h2>
            <b>Register</b> below
          </h2>
          <p className="grey-text text-darken-1">
            {/*need to add onclick here and remove errors? */}
            Already have an account?{" "}
            <Link to="/login" onClick={navigateAuth}>
              Log in
            </Link>
          </p>
        </div>

        <form noValidate onSubmit={onSubmit}>
          <div className="validation-fields-container">
            <ValidationTextField
              setState={setName}
              stateValue={name}
              errorState={reduxErrors.name}
              label="Name"
            />

            <ValidationTextField
              setState={setEmail}
              stateValue={email}
              errorState={reduxErrors.email}
              label="Email"
            />
            <ValidationTextField
              setState={setPassword}
              stateValue={password}
              errorState={reduxErrors.password}
              label="Password"
              type="password"
            />

            <ValidationTextField
              setState={setPassword2}
              stateValue={password2}
              errorState={reduxErrors.password2}
              label="Confirm password"
              type="password"
            />
          </div>

          <div className="auth-submit-container">
            <button type="submit" className="auth-submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <Footer
        // position={footerStyle.position}
        position="absolute"
        display={footerDisplay}
      />
    </div>
  );
};

export default Register;
