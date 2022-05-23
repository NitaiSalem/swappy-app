import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({children, auth, ...rest}) => {
  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

//   <Route
//     {...rest}
//     render={(props) =>
//       auth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Navigate to="/login" />
//       )
//     }
//   />

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
