import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./scss/styles.scss";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import NavigationBar from "./components/layout/navbar/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Profile from "./components/layout/profile/Profile";
import HomePage from "./components/layout/home-page/Home";
import Footer from "./components/layout/footer/Footer";
import About from "./components/layout/about/About";
import SearchResults from "./components/layout/search-results/SearchResults";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import FoundProfile from "./components/layout/search-results/found-profile/FoundProfile";
import ProfileEdit from "./components/layout/profile/profile-edit/ProfileEdit";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/muiTheme";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

import { useJsApiLoader } from "@react-google-maps/api";

// import FakerComponent from "./utils/Faker.js";

const API_Key = process.env.REACT_APP_MAPS_API_KEY;
const libraries = ["places"];

const persistor = persistStore(store);
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_Key,
    libraries: libraries,
  });

  return (
    isLoaded && (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <Router>
              <ScrollToTop />
              <div className="App">
                {/* <FakerComponent/>  */}
                <NavigationBar />
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/about" element={<About />} />
                  <Route path="/search/" element={<SearchResults />} />
                  <Route path="/search/:query" element={<SearchResults />} />
                  <Route
                    path="/search/:query/user/:userid"
                    element={<FoundProfile />}
                  />
                  <Route
                    path="/search/user/:userid"
                    element={<FoundProfile />}
                  />
                  <Route
                    exact
                    path="/Profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    exact
                    path="/Profile/edit"
                    element={
                      <PrivateRoute>
                        <ProfileEdit />
                        <Footer />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
            </Router>
          </PersistGate>
        </ThemeProvider>
      </Provider>
    )
  );
}

export default App;
