
import "./auth.style.scss"
import {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect, useSelector} from "react-redux";
import {registerUser} from "../../actions/authActions";
import classnames from "classnames";
import {useNavigate} from "react-router-dom";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  //redirecting to login from auth actions...
  //instead of componentWillReceiveProps
  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Profile"); // push user to dashboard when they login
    }
  }, [isAuthenticated]);

  const onSubmit = async (e) => {
    e.preventDefault(); //we’ll use e.preventDefault() to stop the page from reloading when the submit button is clicked
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    await props.registerUser(newUser);
    navigate("/login");
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>Loading... </p>
        <p>Loading... </p>
        <p>Loading... </p>
        <p>Loading... </p>
        <p>Loading... </p>
        <p>Loading... </p>
        <p>Loading... </p>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{paddingLeft: "11.250px"}}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email,
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password,
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2,
                })}
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{errors.password2}</span>
            </div>
            <div className="col s12" style={{paddingLeft: "11.250px"}}>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {registerUser})(Register);
