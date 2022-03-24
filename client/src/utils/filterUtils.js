export const filterHomeType = (desiredHomeType, foundHomesArr) => {
  //the hometype wiil be just string of house or appartment,
  //make activefilter to check first?
  let filteredHomes = foundHomesArr;
  const hasActiveFilter = desiredHomeType !== "";
  if (hasActiveFilter === false || foundHomesArr.length === 0) {
    return filteredHomes;
  } else {
    filteredHomes = foundHomesArr.filter((home) => {
      const homeDetails = home.homeDetails ? home.homeDetails : {};
      return homeDetails.homeType === desiredHomeType;
    });
  }
  return filteredHomes;
};

//use this method just to filter amneties? each group has own function to filter?
//check active filter in each func? to know for sure which active filters we have. we would have to check anyway

export const filterDetails = (detailsToFilter, HomesArr) => {
  //make activefilter to check first?
  let filteredHomes = HomesArr;
  // check if any of the filters are set:
  const hasActiveFilter = Object.values(detailsToFilter).some(
    (element) => element !== ""
  );
  if (hasActiveFilter === false) {
    return filteredHomes;
  } else {
    filteredHomes = HomesArr.filter((home) => {
      // do as amneties and get only the defined details
      const detailsToFilterKeys = Object.keys(detailsToFilter).filter(
        (k) => detailsToFilter[k] !== ""
      );
      const homeDetails = home.homeDetails ? home.homeDetails : {};
      return detailsToFilterKeys.every(
        (key) => homeDetails[key] === detailsToFilter[key]
      );
    });
  }
  return filteredHomes;
};

export const filterLifeStyle = (checkedLifeStyle, foundHomesArr) => {
  //mustuseMemo for this expensive filtering!!!! higher up in handle filterclick function
  console.log({ checkedLifeStyle });
  let filteredHomes = foundHomesArr;
  //make or condition to check if we have filter active?
  const hasActiveFilter = Object.values(checkedLifeStyle).includes(true);

  if (hasActiveFilter === false) {
    return filteredHomes;
  } else {
    filteredHomes = foundHomesArr.filter((home) => {
      const houseRules = home.homeDetails?.houseRules
        ? home.homeDetails.houseRules
        : {};
      let rulesKeysArray = [];
      if (home.homeDetails) {
        //create array of only truthy values for check
        rulesKeysArray = Object.keys(checkedLifeStyle).filter(
          (k) => checkedLifeStyle[k] === true
        );
      }
      //then loop the keys array: compare with filter object to check if that value is true.
      if (rulesKeysArray.length === 0) {
        return false;
      } else {
        console.log({ rulesKeysArray });
        return rulesKeysArray.every(
          //use the amneties from home here
          (rulesKey) => houseRules[rulesKey] === true
        );
      }
    });
  }

  return filteredHomes;
};

export const filterAmneties = (checkedAmneties, foundHomesArr) => {
  //mustuseMemo for this expensive filtering!!!! higher up in handle filterclick function
  console.log({ checkedAmneties });
  let filteredHomes = foundHomesArr;
  //make or condition to check if we have filter active?
  const hasActiveFilter = Object.values(checkedAmneties).includes(true);

  if (hasActiveFilter === false) {
    return filteredHomes;
  } else {
    filteredHomes = foundHomesArr.filter((home) => {
      const homeAmneties = home.homeDetails?.amneties
        ? home.homeDetails.amneties
        : {};
      let amnetiesKeysArray = [];
      if (home.homeDetails) {
        //create array of only truthy values for check
        amnetiesKeysArray = Object.keys(checkedAmneties).filter(
          (k) => checkedAmneties[k] === true
        );
      }
      //then loop the keys array: compare with filter object to check if that value is true.
      if (amnetiesKeysArray.length === 0) {
        return false;
      } else {
        console.log({ amnetiesKeysArray });
        return amnetiesKeysArray.every(
          //use the amneties from home here
          (amnetyKey) => homeAmneties[amnetyKey] === true
        );
      }
    });
  }

  return filteredHomes;
};

//*make function to combine all and return the final filtered, export it to use inside search results component.

export const filterAll = (
  homesToFilter,
  desiredHomeType,
  filterDetailsObj,
  checkedAmneties,
  checkedLifeStyle
) => {
  //how to filter our details::
  const filterdByHomeType = filterHomeType(desiredHomeType, homesToFilter);

  const filteredByDetails = filterDetails(filterDetailsObj, filterdByHomeType);
  const filteredByAmneties = filterAmneties(checkedAmneties, filteredByDetails);

  const finalFiltered = filterLifeStyle(checkedLifeStyle, filteredByAmneties);

  return finalFiltered;
};

// export const getStoragedFavorites = () => JSON.parse(localStorage.getItem('favoriteImages')) || [];

// export const saveFavoritesToStorage = (newFavoriteImages) =>
// 	localStorage.setItem('favoriteImages', JSON.stringify(newFavoriteImages));
