import { useSelector } from "react-redux";
import defaultImage from "../../../assets/user-icon.png";
import defaultHomeImage from "../../../assets/home-default.jpg";
import { Button, Grid } from "@mui/material";
import "./search-results.style.scss";
import SearchResultsMap from "../../map/SearchResultsMap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
  const perPage = 6;
  //*use these not in state
  //!these are causing the map rerender.
  const filterCounter = useSelector((state) => state.filterCounter);
  const checkedLifeStyle = useSelector((state) => state.lifeStyleFilter);
  const desiredHomeType = useSelector((state) => state.homeTypeFilter);
  const checkedAmneties = useSelector((state) => state.amnetiesFilter);
  const filterDetailsObj = useSelector((state) => state.detailsFilter);

  // console.log({ state });
  // const searchValue = state.searchValue; //!use this to get search value!!!
  const [searchValue, setSearchValue] = useState(state.searchValue);

  //on search set the global state value to updated?

  const foundHomes = state.foundHomes;
  const [filteredHomes, setFilteredHomes] = useState([]);

  // const [filterAccessibility, setFilterAccessibility] = useState({});
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
  // const scrollToRef = (ref) =>  document.getElementById('all-homes-container').scrollTo({ top: 0, behavior:
  //   'smooth'
  // })
  const myScrollRef = useRef(null);
  const executeScroll = () => scrollToRef(myScrollRef);

  const mappedHouses = useMemo(
    () =>
      filteredHomes.length > 0
        ? filteredHomes.filter((home) => home.homeDetails)
        : [],
    [filteredHomes]
  );

  // console.log({ mappedHouses });
  // console.log({ filteredHomes });

  const goToUser = useCallback((user) => {
    navigate(`user/${user["_id"]}`, { state: user });
  }, []);

  const handlePageClick = (e) => {
    //must update sliced home
    console.log("event page here ", e);
    // const selectedPage = e.selected;
    // console.log("e selected ", e.selected);
    //?if modulo gives us the first number than modulo part unneccersary?
    // const newOffset = (e.selected * perPage) % filteredHomes.length;
    const newOffset = e.selected * perPage;
    // setOffset(selectedPage + 1); //? because of index difference add 1?
    setOffset(newOffset);
    executeScroll();
  };

  useEffect(() => {
    //*getSearchResults
    // console.log("fetching useffect rendered!!!")

    const fetchHomes = async () => {
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

      // let fetchedHomes = await getSearchResults(searchValue);

      // const finalFiltered = filterAll(
      //   fetchedHomes,
      //   desiredHomeType,
      //   filterDetailsObj,
      //   checkedAmneties,
      //   checkedLifeStyle
      // );
      // //*I do have acess to the filter objects from redux state, use the filter method here with those redux store values ?
      // setFilteredHomes(finalFiltered);
    };
    fetchHomes();
    //set sliced:
    setPageCount(Math.ceil(filteredHomes.length / perPage));
    // setSlicedHomes(filteredHomes?filteredHomes.slice(offset, offset + perPage): []);
  }, []);

  useEffect(() => {
    //set sliced:
    // const endOffset = offset + perPage;
    console.log("second useffect rendered!!!");

    setPageCount(Math.ceil(filteredHomes.length / perPage));
    //  setSlicedHomes(filteredHomes);
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
          // filteredHomes={filteredHomes}
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
        />

        <Grid container spacing={2} className="homes-grid-container">
          {slicedHomes.length > 0 &&
            slicedHomes.map((home, i) => {
              let houseLocation;

              if (home.homeDetails !== undefined) {
                houseLocation = home.homeDetails.houseLocation;
              } else houseLocation = { area: "unknown location" };
              // console.log({ houseLocation });
              // console.log("length of home images", home.homeImages.length);
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
            pageCount={pageCount}
            marginPagesDisplayed={2}
            //  pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            //  activeLinkClassName={"active-link"}
            nextClassName={"next-link"}
            previousClassName={"previous-link"}
            activeClassName={"active"}
            disabledLinkClassName={"disabled-link"}
            disabledClassName={"disabled"}
          />
        )}
      </div>

      <div className="map-container">
        <SearchResultsMap mappedHouses={mappedHouses} goToUser={goToUser} />
      </div>
    </div>
  );
};

export default SearchResults;
