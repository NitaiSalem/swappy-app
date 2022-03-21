import { useSelector } from "react-redux";
import defaultImage from "../../../site images/user-icon.png";
import defaultHomeImage from "../../../site images/home-default.jpg";
import { Button, Grid } from "@mui/material";
import "./search-results.style.scss";
import SearchResultsMap from "../../map/SearchResultsMap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import FilterModal from "./FilterModal";
import ReactPaginate from "react-paginate";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log({location})
  //*can acess location.pathname for current path. 
  const { state } = useLocation();
  const [offset, setOffset] = useState(0);
  const perPage = 5; //?might remove from state later?

  console.log({state});
  const foundHomes = state.foundHomes;
  const [filteredHomes, setFilteredHomes] = useState(foundHomes);
  const [filterAccessibility, setFilterAccessibility] = useState({});
  const [pageCount, setPageCount] = useState(
    Math.ceil(filteredHomes.length / perPage)
  );
  const [slicedHomes, setSlicedHomes] = useState(
    filteredHomes.slice(offset, offset + perPage)
  );

  //*creating scroll reference for element
  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });
  // const scrollToRef = (ref) =>  document.getElementById('all-homes-container').scrollTo({ top: 0, behavior:
  //   'smooth'
  // })
  const myScrollRef = useRef(null);
  const executeScroll = () => scrollToRef(myScrollRef);
  const mappedHouses =
    filteredHomes.length > 0
      ? filteredHomes.filter((home) => home.homeDetails)
      : [];
  console.log({ mappedHouses });
  console.log({ foundHomes });

  const goToUser = (user) => {
    navigate(`user/${user["_id"]}`, { state: user });
  };

  const handlePageClick = (e) => {
    //must update sliced home
    const selectedPage = e.selected;
    setOffset(selectedPage + 1); //? because of index difference add 1?
    executeScroll();
    // myScrollRef.scrollIntoView({behavior:"smooth"})
  };

  useEffect(() => {
    //set sliced:
    setPageCount(Math.ceil(filteredHomes.length / perPage));
    setSlicedHomes(filteredHomes.slice(offset, offset + perPage));
  }, [offset, filteredHomes]);

  return (
    <div className="search-results-container">
      <div id="all-homes-container" className="all-homes-container">
        <h3 ref={myScrollRef}>
          Found {filteredHomes.length} homes{" "}
          <FilterModal
            foundHomes={foundHomes}
            filteredHomes={filteredHomes}
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

                      {/* {
                  home.homeImages.length > 0 && (
                    <img
                      src={homeImageUrl}
                      alt="home pic"
                      width="200px"
                      height="200px"
                    ></img>
                  )

                  // : (
                  //else add default pic

                  //   <img
                  //     src={defaultImage}
                  //     alt="home pic"
                  //     width="100px"
                  //     height="100px"
                  //   ></img>
                  // )
                } */}
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
