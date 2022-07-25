import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
// import "./navStyle.scss";
import logo from "../../../assets/swappy-logo.png";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { logoutUser } from "../../../actions/authActions";
import LogoutIcon from "@mui/icons-material/Logout";
import { GET_ERRORS } from "../../../actions/types";
import Autocomplete from "react-google-autocomplete";
// import { getSearchResults } from "../../../../utils/getHomes";
import { getSearchResults } from "../../../utils/getHomes";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { setIsNavSearchShown } from "../../../actions/showNavSearchAction";

const NavigationBar = () => {
  const [className, setClassName] = useState("closed-menu");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const isNavSearchShown = useSelector((state) => state.isNavSearchShown);
  const { pathname } = useLocation();
const isSearchPath = matchPath("/search/*", pathname);

  const onTextChange = ({ target: { value } }) => {
    setSearchText(value);
  };

  const searchHomes = async (searchValue) => {
    const searchResults = await getSearchResults(searchValue);
    // console.log("this is searchvalue in search homes func", searchValue);
    // console.log("this is search results in search homes func", searchResults);
    navigate(`/search/${searchValue}`, {
      state: { searchValue, foundHomes: searchResults },
    });
  };

  const handlePlaceSelected = (place, event) => {
    console.log("this is event value", event.value);
    // event.preventDefault();
    console.log("on place selected fired");
    console.log({ place });
    if (place) {
      setSearchText(place);
      console.log("entered place true condition", { place });
      searchHomes(place);
    } else {
      // console.log('entered else condition ', {searchText})
      searchHomes(event.value);
    }
  };

  const updateClass = () => {
    setClassName(className === "open-menu" ? "closed-menu" : "open-menu");
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  //remove login/register errors when navigating to other routes

  const handleLinkClick = () => {
    dispatch(setIsNavSearchShown(true));
    setSearchText("");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    setClassName("closed-menu");
  };




  return (
    <nav className="navigation-bar" id="navigation-bar">
      <div className="logo-container">
        <Link to="/" onClick={handleLinkClick}>
          <img className="logo-image" src={logo} alt="logo" />
        </Link>
      </div>
      {isNavSearchShown && !isSearchPath && (
        <div
          className={
            isNavSearchShown
              ? "nav-search-box-container"
              : "nav-search-box-container-hidden"
          }
        >
          <Autocomplete
            className="search-box"
            apiKey={process.env.REACT_APP_MAPS_API_KEY}
            value={searchText}
            placeholder=" Where are you going?"
            options={{
              componentRestrictions: { country: "isr" },
            }}
            onChange={onTextChange}
            onPlaceSelected={(place, event) =>
              handlePlaceSelected(place.formatted_address, event)
            }
          />

          <Button
            onClick={() => searchHomes(searchText)}
            variant="outlined"
            className="submit-search"
            type="submit"
          >
            <SearchIcon />
          </Button>
          {/* </form> */}
        </div>
      )}

      <MenuIcon id="toggler" onClick={updateClass} />
      <div className="responsive-menu-container">
        <div className={className}>
          <ul className="list">
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleLinkClick}>
                How it works
              </Link>
            </li>
            {!isAuthenticated ? (
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  Login
                </Link>
              </li>
            ) : (
              <div className="profile-logout-container">
                <li>
                  <Link to="/profile" onClick={handleLinkClick}>
                    Profile
                  </Link>
                </li>
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
