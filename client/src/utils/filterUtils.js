export const filterHomeType = (desiredHomeType, foundHomesArr) => {
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

export const filterDetails = (detailsToFilter, HomesArr) => {
  let filteredHomes = HomesArr;
  // check if any of the filters are set:
  const hasActiveFilter = Object.values(detailsToFilter).some(
    (element) => element !== ""
  );
  if (hasActiveFilter === false) {
    return filteredHomes;
  } else {
    filteredHomes = HomesArr.filter((home) => {
      // get only the defined details
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
  console.log({ checkedLifeStyle });
  let filteredHomes = foundHomesArr;
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
        return rulesKeysArray.every(
          (rulesKey) => houseRules[rulesKey] === true
        );
      }
    });
  }

  return filteredHomes;
};

export const filterAmneties = (checkedAmneties, foundHomesArr) => {
  console.log({ checkedAmneties });
  let filteredHomes = foundHomesArr;
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
        return amnetiesKeysArray.every(
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
  const filterdByHomeType = filterHomeType(desiredHomeType, homesToFilter);

  const filteredByDetails = filterDetails(filterDetailsObj, filterdByHomeType);
  const filteredByAmneties = filterAmneties(checkedAmneties, filteredByDetails);

  const finalFiltered = filterLifeStyle(checkedLifeStyle, filteredByAmneties);

  return finalFiltered;
};

export const AMNETIES_NAMES = [
  { name: "TV", key: "tv" },
  { name: "WiFi", key: "wifi" },
  { name: "Microwave", key: "microwave" },
  { name: "Refrigerator", key: "fridge" },
  { name: "AC", key: "ac" },
  { name: "FirePlace", key: "firePlace" },
  { name: "Pool", key: "pool" },
  { name: "Grill", key: "grill" },
  { name: "Garden", key: "garden" },
  { name: "Parking", key: "parking" },
  { name: "Esports", key: "esports" },
  { name: "Balcony", key: "balcony" },
  { name: "Elevator", key: "elevator" },
  { name: "washing Machine", key: "washingMachine" },
  { name: "Accessible", key: "accessible" },
];

export const DETAILS_NAMES = [
  { name: "Bathrooms", key: "bathRooms" },
  { name: "Bedrooms", key: "bedRooms" },
  { name: "Sleeps", key: "sleeps" },
  { name: "Double-beds", key: "doubleBeds" },
  { name: "Single-beds", key: "singleBeds" },
];

export const LIFESTYLE_NAMES = [
  { name: "Smokers welcome", key: "smoking" },
  { name: "Pets welcome", key: "pets" },
  { name: "Children welcome", key: "children" },
];

export const MENU_ITEMS_RANGE = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
