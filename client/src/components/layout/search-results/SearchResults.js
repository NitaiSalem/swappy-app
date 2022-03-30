import { useSelector } from "react-redux";
import defaultImage from "../../../site images/user-icon.png";
import defaultHomeImage from "../../../site images/home-default.jpg";
import { Button, Grid } from "@mui/material";
import "./search-results.style.scss";
import SearchResultsMap from "../../map/SearchResultsMap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef,useMemo } from "react";
import FilterModal from "./FilterModal";
import SearchBar from "./SearchBar";
import ReactPaginate from "react-paginate";
import { getSearchResults } from "../../../utils/getHomes";
import { filterAll } from "../../../utils/filterUtils";

const SearchResults = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log({ location });
  //*can acess location.pathname for current path.
  const { state } = useLocation();
  const [offset, setOffset] = useState(0);
  const perPage = 5;

  //*use these not in state
  //!these are causing the map rerender. 
  const checkedLifeStyle = useSelector((state) => state.lifeStyleFilter);
  const desiredHomeType = useSelector((state) => state.homeTypeFilter);
  const checkedAmneties = useSelector((state) => state.amnetiesFilter);
  const filterDetailsObj = useSelector((state) => state.detailsFilter);
  

  // console.log({ state });
  const searchValue =  state.searchValue; //!use this to get search value!!!
  const foundHomes = state.foundHomes; //I i changed this!
  const [filteredHomes, setFilteredHomes] = useState([]);

  const [filterAccessibility, setFilterAccessibility] = useState({});
  const [pageCount, setPageCount] = useState(
    Math.ceil(filteredHomes.length / perPage)
  );
  const [slicedHomes, setSlicedHomes] = useState(
    filteredHomes?filteredHomes.slice(offset, offset + perPage):[]
  );

  //*creating scroll reference for element
  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });
  // const scrollToRef = (ref) =>  document.getElementById('all-homes-container').scrollTo({ top: 0, behavior:
  //   'smooth'
  // })
  const myScrollRef = useRef(null);
  const executeScroll = () => scrollToRef(myScrollRef);

  const mappedHouses =  filteredHomes.length > 0
    ? filteredHomes.filter((home) => home.homeDetails)
    : [];
 
  // console.log({ mappedHouses });
  // console.log({ filteredHomes });

  const goToUser = (user) => {
    navigate(`user/${user["_id"]}`, { state: user });
  };

  const handlePageClick = (e) => {
    //must update sliced home
    const selectedPage = e.selected;
    setOffset(selectedPage + 1); //? because of index difference add 1?
    executeScroll();
  };

  useEffect(() => {
    //*getSearchResults
    // console.log("fetching useffect rendered!!!")
    //?limit to maybe only when filter values change? otherwise first render gives us the search results already...
    const fetchHomes = async () => {
      let fetchedHomes = await getSearchResults(searchValue);
      const finalFiltered = filterAll(
        fetchedHomes,
        desiredHomeType,
        filterDetailsObj,
        checkedAmneties,
        checkedLifeStyle
      );
      //*I do have acess to the filter objects from redux state, use the filter method here with those redux store values ?
      setFilteredHomes(finalFiltered);
    };
    fetchHomes();
    //set sliced:
    setPageCount(Math.ceil(filteredHomes.length / perPage));
    setSlicedHomes(filteredHomes?filteredHomes.slice(offset, offset + perPage): []);
  }, []);

  useEffect(() => {
    //set sliced:
    console.log("second useffect rendered!!!")
    //!possibly might have to remove filtered homes  from dependency? 
    setPageCount(Math.ceil(filteredHomes.length / perPage));
     setSlicedHomes(filteredHomes);
  }, [offset, filteredHomes]);

  return (
    <div className="search-results-container">
      <div id="all-homes-container" className="all-homes-container">
        <h3 ref={myScrollRef}>
          Found {filteredHomes.length} homes{" "}
          <SearchBar 
          // filteredHomes={filteredHomes}
           setFilteredHomes={setFilteredHomes}
          searchValue={searchValue}
          /> 
          <FilterModal
            searchValue={searchValue}
            foundHomes={foundHomes}
            perPage={perPage}
            setSlicedHomes={setSlicedHomes}
            setFilteredHomes={setFilteredHomes}
            filterAccessibility={filterAccessibility}
            setFilterAccessibility={setFilterAccessibility}
            setPageCount={setPageCount}
          />
        </h3>

        <Grid container spacing={2} className="homes-grid-container">
          {Array.isArray(slicedHomes) &&
            slicedHomes.map((home, i) => {
              let houseLocation;

              if (home.homeDetails !== undefined) {
                houseLocation = home.homeDetails.houseLocation;
              } else houseLocation = { area: "unknown location" };
              console.log({ houseLocation });
              console.log("length of home images", home.homeImages.length);
              const homeImageUrl =
                home.homeImages.length > 0
                  ? home.homeImages[0].url
                  : defaultHomeImage;

              return (
                <Grid item xs={5} key={i}>
                  <div
                    key={i}
                    className="found-home-container"
                    onClick={() => goToUser(home)}
                  >
                    <div
                      className="home-image-container"
                      style={{
                        backgroundImage: `url(${homeImageUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        src={home.profileImg ? home.profileImg : defaultImage}
                        alt="profile pic"
                        width="50px"
                        height="50px"
                      ></img>
                    </div>
                    <h5>{home.name + `'s`} Home</h5>
                    <span>
                      <LocationOnIcon />
                      {houseLocation.area + ", Israel"}
                    </span>
                  </div>
                </Grid>
              );
            })}
        </Grid>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          //  pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>

      <div className="map-container">
        <SearchResultsMap mappedHouses={mappedHouses} goToUser={goToUser} />
      </div>
    </div>
  );
};

export default SearchResults;
