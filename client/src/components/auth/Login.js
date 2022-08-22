import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ValidationTextField from "./ValidationTextField";
import Footer from "../layout/footer/Footer";
import { GET_ERRORS } from "../../actions/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [footerDisplay, setFooterDisplay] = useState(
    window.innerWidth > 790 ? "flex" : "none"
  );
  const reduxErrors = useSelector((state) => state.errors);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Profile"); // navigate user to profile when they login
    }
  }, [isAuthenticated]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 790) {
        setFooterDisplay("none");
      } else {
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
    dispatch(loginUser(userData));
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
          </div>

          <div className="auth-submit-container">
            <button type="submit" className="auth-submit">
              Login
            </button>
          </div>
        </form>
      </div>
      <Footer position="absolute" display={footerDisplay} />
    </div>
  );
};

export default Login;
