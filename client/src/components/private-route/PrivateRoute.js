import {Navigate} from "react-router-dom";
import { useSelector} from "react-redux";

const PrivateRoute = ({children, ...rest}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
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

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

export default PrivateRoute;
