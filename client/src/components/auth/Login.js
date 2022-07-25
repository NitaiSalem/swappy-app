import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ValidationTextField from "./ValidationTextField";
import { PasswordTwoTone } from "@mui/icons-material";
import Footer from "../layout/footer/Footer";
import { GET_ERRORS } from "../../actions/types";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});
  const [footerDisplay, setFooterDisplay] = useState(
    window.innerWidth > 790 ? "flex" : "none"
  );
  const reduxErrors = useSelector((state) => state.errors);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // const errors = useSelector((state) => state.errors);

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Profile"); // push user to profile when they login
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   setErrors(reduxErrors);
  // }, [reduxErrors]);

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
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    dispatch(loginUser(userData)); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  const navigateAuth = () => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  };

  return (
    <div className="login-container">
      <div className="auth-box-container">
        <div className="top-controls-container">
          <Link to="/" className="back-home-link">
            <KeyboardBackspaceIcon className="back-home-icon" />{" "}
            <span>BACK TO HOME </span>
          </Link>
          <h2>
            <b>Login</b> below
          </h2>
          <p className="">
            Don't have an account?{" "}
            <Link to="/register" onClick={navigateAuth}>
              Register
            </Link>
          </p>
        </div>

        <form noValidate onSubmit={onSubmit}>
          <div className="validation-fields-container">
            <ValidationTextField
              setState={setEmail}
              stateValue={email}
              errorState={reduxErrors.email}
              label="Email"
            />

            <ValidationTextField
              setState={setPassword}
              stateValue={password}
              errorState={reduxErrors.password || reduxErrors.passwordincorrect}
              label="Password"
              type="password"
            />

            {/* <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={errors.email}
              id="email"
              type="email"
              // className={classnames("", {
              //   invalid: errors.email || errors.emailnotfound,
              // })}
            />
            <label htmlFor="email">Email</label>
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span> */}
          </div>

          {/* <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={errors.password}
            id="password"
            type="password"
            // className={classnames("", {
            //   invalid: errors.password || errors.passwordincorrect,
            // })}
          />
          <label htmlFor="password">Password</label>
          <span className="red-text">
            {errors.password}
            {errors.passwordincorrect}
          </span> */}

          <div className="auth-submit-container">
            <button type="submit" className="auth-submit">
              Login
            </button>
          </div>

          {/* <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Login
            </button>
          </div> */}
        </form>
      </div>
      <Footer  position= "absolute"  display={footerDisplay}  />
    </div>
  );
};

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

export default Login;
