import { useSelector } from "react-redux";
import defaultImage from "../../../assets/user-icon.png";
import defaultHomeImage from "../../../assets/home-default.jpg";
import { Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
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
  const isMounted = useRef(false);
  const filterCounter = useSelector((state) => state.filterCounter);
  const checkedLifeStyle = useSelector((state) => state.lifeStyleFilter);
  const desiredHomeType = useSelector((state) => state.homeTypeFilter);
  const checkedAmneties = useSelector((state) => state.amnetiesFilter);
  const filterDetailsObj = useSelector((state) => state.detailsFilter);
  const [searchValue, setSearchValue] = useState(state.searchValue);
  const [foundHomes, setFoundHomes] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [currPage, setCurrPage] = useState(null);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [slicedHomes, setSlicedHomes] = useState([]);

  useEffect(() => {
    if (isMounted.current && searchValue === "") {
      searchHomes("");
    } else {
      isMounted.current = true;
    }
  }, [searchValue]);

  useEffect(() => {
    searchHomes(searchValue);
  }, []);

  useEffect(() => {
    let finalFiltered = [];
    if (filterCounter > 0) {
      console.log("filter condition applied in search results comp");
      if (foundHomes.length > 0) {
        finalFiltered = filterAll(
          foundHomes,
          desiredHomeType,
          filterDetailsObj,
          checkedAmneties,
          checkedLifeStyle
        );
        console.log({ finalFiltered });
        setPageCount(Math.ceil(finalFiltered.length / perPage));
        setFilteredHomes(finalFiltered);
      }
    } else setPageCount(Math.ceil(foundHomes.length / perPage));
  }, [
    filterCounter,
    desiredHomeType,
    filterDetailsObj,
    checkedAmneties,
    checkedLifeStyle,
    foundHomes,
    offset,
  ]);

  useEffect(() => {
    //set sliced:
    if (filterCounter > 0) {
      setSlicedHomes(
        filteredHomes.length > 0
          ? filteredHomes.slice(offset, offset + perPage)
          : []
      );
    } else {
      setSlicedHomes(
        foundHomes.length > 0 ? foundHomes.slice(offset, offset + perPage) : []
      );
    }
  }, [offset, foundHomes, filteredHomes, filterCounter, pageCount]);

  //creating scroll reference for element
  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });
  const myScrollRef = useRef(null);
  const executeScroll = () => scrollToRef(myScrollRef);
  const goToUser = useCallback((user) => {
    navigate(`user/${user["_id"]}`, { state: user });
  }, []);

  const handlePageClick = (e) => {
    const newOffset =
      filterCounter > 0
        ? (e.selected * perPage) % filteredHomes.length
        : (e.selected * perPage) % foundHomes.length;
    setCurrPage(e.selected);
    setOffset(newOffset);
    executeScroll();
  };

  const searchHomes = async (searchText) => {
    setCurrPage(0);
    setOffset(0);
    const fetchedHomes = await getSearchResults(searchText);
    setFoundHomes(fetchedHomes);
  };

  return (
    <div className="search-results-container">
      <div id="all-homes-container" className="all-homes-container">
        <h3 className="found-homes-title" ref={myScrollRef}>
          Found homes:{" "}
          {filterCounter > 0 ? filteredHomes.length : foundHomes.length}{" "}
        </h3>
        <SearchBar
          searchHomes={searchHomes}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setFoundHomes={setFoundHomes}
        />
        <FilterModal
          setCurrPage={setCurrPage}
          searchValue={searchValue}
          setPageCount={setPageCount}
          setOffset={setOffset}
          setFoundHomes={setFoundHomes}
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
        {slicedHomes.length > 0 && (
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            forcePage={currPage}
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
        )}
      </div>

      <div className="map-container">
        <SearchResultsMap
          mappedHouses={filterCounter > 0 ? filteredHomes : foundHomes}
          goToUser={goToUser}
        />
      </div>
    </div>
  );
};

export default SearchResults;
