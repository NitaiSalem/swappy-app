import { useSelector } from "react-redux";
import defaultImage from "../../../assets/user-icon.png";
import defaultHomeImage from "../../../assets/home-default.jpg";
import { Button, Grid } from "@mui/material";
// import "./search-results.style.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import FilterModal from "./FilterModal";
import SearchBar from "./SearchBar";
import ReactPaginate from "react-paginate";
import { getSearchResults } from "../../../utils/getHomes";
import { filterAll } from "../../../utils/filterUtils";
import SearchResultsMap from "../../map/SearchResultsMap";

const SearchResults = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [offset, setOffset] = useState(0);
  const perPage = 6;
  //*use these not in state
  //!these are causing the map rerender.
  const filterCounter = useSelector((state) => state.filterCounter);
  const checkedLifeStyle = useSelector((state) => state.lifeStyleFilter);
  const desiredHomeType = useSelector((state) => state.homeTypeFilter);
  const checkedAmneties = useSelector((state) => state.amnetiesFilter);
  const filterDetailsObj = useSelector((state) => state.detailsFilter);
  const [searchValue, setSearchValue] = useState(state.searchValue);
  const foundHomes = state.foundHomes;
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [pageCount, setPageCount] = useState(
    Math.ceil(filteredHomes.length / perPage)
  );
  //!this inialization can mess the search results?
  const [slicedHomes, setSlicedHomes] = useState(
    filteredHomes.length > 0
      ? filteredHomes.slice(offset, offset + perPage)
      : []
  );

  //*creating scroll reference for element
  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });
  const myScrollRef = useRef(null);
  const executeScroll = () => scrollToRef(myScrollRef);

  const mappedHouses = useMemo(
    () =>
      filteredHomes.length > 0
        ? filteredHomes.filter((home) => home.homeDetails)
        : [],
    [filteredHomes]
  );

  const goToUser = useCallback((user) => {
    navigate(`user/${user["_id"]}`, { state: user });
  }, []);

  const handlePageClick = (e) => {
    // console.log("event page here ", e);
    const newOffset = e.selected * perPage;
    setOffset(newOffset);
    executeScroll();
  };

  const fetchHomes = async () => {
    console.log("entered fetch homes")
    const foundHomes = await getSearchResults(searchValue);
    //only apply filter functionallity if we have filter active
    if (filterCounter > 0 && foundHomes) {
      const finalFiltered = filterAll(
        foundHomes,
        desiredHomeType,
        filterDetailsObj,
        checkedAmneties,
        checkedLifeStyle
      );
      setFilteredHomes(finalFiltered);
    } else setFilteredHomes(foundHomes ? foundHomes : []);
  };


  useEffect(() => {
    fetchHomes();
    setPageCount(Math.ceil(filteredHomes.length / perPage));
  }, []);


  useEffect(() => {
    if(searchValue ===""){
      fetchHomes();
    }
  }, [searchValue]);

  useEffect(() => {
    //set sliced:
    console.log("second useffect rendered!!!");
    setPageCount(Math.ceil(filteredHomes.length / perPage));
    setSlicedHomes(
      filteredHomes.length > 0
        ? filteredHomes.slice(offset, offset + perPage)
        : []
    );
  }, [offset, filteredHomes]);

  return (
    <div className="search-results-container">
      <div id="all-homes-container" className="all-homes-container">
        <h3 className="found-homes-title" ref={myScrollRef}>
          Found {filteredHomes.length} homes{" "}
        </h3>
        <SearchBar
          setFilteredHomes={setFilteredHomes}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          desiredHomeType={desiredHomeType}
          filterDetailsObj={filterDetailsObj}
          checkedAmneties={checkedAmneties}
          checkedLifeStyle={checkedLifeStyle}
        />
        <FilterModal
          searchValue={searchValue}
          foundHomes={foundHomes}
          perPage={perPage}
          setSlicedHomes={setSlicedHomes}
          setFilteredHomes={setFilteredHomes}
          setPageCount={setPageCount}
          fetchHomes={fetchHomes}
        />

        <Grid container spacing={2} className="homes-grid-container">
          {slicedHomes.length > 0 &&
            slicedHomes.map((home, i) => {
              let houseLocation;

              if (home.homeDetails !== undefined) {
                houseLocation = home.homeDetails.houseLocation;
              } else houseLocation = { area: "unknown location" };
              const homeImageUrl =
                home.homeImages.length > 0
                  ? home.homeImages[0].url
                  : defaultHomeImage;
              const opacity = home.homeImages.length > 0 ? "1" : "0.4";
              return (
                <Grid item xs={12} sm={6} key={i}>
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
                        opacity: opacity,
                      }}
                    >
                      <img
                        className="user-image"
                        src={home.profileImg ? home.profileImg : defaultImage}
                        alt="profile pic"
                        width="50px"
                        height="50px"
                      ></img>
                    </div>
                    <div className="user-text-box">
                      <h5 className="user-home-text ">
                        {home.name + `'s`} Home
                      </h5>
                      <p className="location-text">
                        <LocationOnIcon />
                        {houseLocation.area + ", Israel"}
                      </p>
                    </div>
                  </div>
                </Grid>
              );
            })}
        </Grid>
        {
          slicedHomes.length > 0 && 
          <ReactPaginate
          previousLabel={"< Prev"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          nextClassName={"next-link"}
          previousClassName={"previous-link"}
          activeClassName={"active"}
          disabledLinkClassName={"disabled-link"}
          disabledClassName={"disabled"}
        />
        }
    
      </div>

      <div className="map-container">
        <SearchResultsMap mappedHouses={mappedHouses} goToUser={goToUser} />
      </div>
    </div>
  );
};

export default SearchResults;
