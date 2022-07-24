import { faker } from "@faker-js/faker";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/authActions";
import Geocode from "react-geocode";
import Axios from "axios";

const unsplashKey = "Jxg_2PIlZ6PUTWHBmqauUNvCOil9p9wfB9OXtp41pO4";
const secretUnsplashKey = "vZG3Ce-qSJZDLU5l_kmUQwER7RpUrtZA0XpESdaiBho";

const API_Key = process.env.REACT_APP_MAPS_API_KEY;
const homeText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
Geocode.setApiKey(API_Key);
Geocode.enableDebug();

const FakerComponent = () => {
  const dispatch = useDispatch();
  //will need to be in loop eventually???

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  // const getRandomHomeImages = async () => {
  //   try {
  //     let imagesArr = [];
  //     for (let i = 0; i < 5; i++) {
  //       console.log("loop round ", i)
  //       const image = await Axios.get(
  //         "https://source.unsplash.com/random/?home"
  //       );
  //       imagesArr.push(image.data);
  //     }

  //     return imagesArr;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //   'https://3geonames.org/randomland.IL'

  // const getRandomLocationByCountry = (countryName) => {
  //   //  const fakeCity = faker.address.city(['IL']);
  //   //  console.log("the fake zip city ", fakeCity );
  //   //     var lat = '';
  //   //     var lng = '';

  //   const loc = {
  //     top: "32.096403466759085",
  //     bottom: "31.610674760426335",
  //     left: "34.773591608009625",
  //     right: "34.94579676154469",
  //   };

  //   //so latitide is up down
  //   //34 is up down
  //   //31-32 is left right
  // };

  const getRandomImg = async () => {
    try {
      const response = await Axios.get(
        `https://api.unsplash.com/photos/random?client_id=${unsplashKey}&query=home`
      );
      const urls = response.data.urls;
      // console.log(urls, " the response data  in get random image ");

      return {
        name: response.data.id,
        url: urls.full,
      };
    } catch (err) {
      console.error(err);
    }
  };

  async function createRandomUser() {
    const maxLng = 34.94579676154469;
    const minLng = 34.773591608009625;
    const maxLat = 32.096403466759085;
    const minLat = 31.610674760426335;

    const precision = 4;

    const latitude = faker.address.latitude(maxLat, minLat, precision);
    const longitude = faker.address.longitude(maxLng, minLng, precision);

    function createRandomBooleanValue() {
      return Math.random() < 0.5;
    }

    const getAddress = async () => {
      try {
        const response = await Geocode.fromLatLng(latitude, longitude);
        // console.log(response, "this is the response from geocode ");
        let updatedAddress = response.results[0].formatted_address,
          addressArray = response.results[0].address_components;
        const area = getArea(addressArray);
        // console.log(area, " area in area here");

        return {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
          address: updatedAddress ? updatedAddress : "",
          area: area ? area : "",
        };
      } catch (err) {
        console.log(err);
      }
    };

    // let locationObj;
    // const passWord = faker.internet.password();
    // let locationObj = await getAddress();

    try {
      // getAddress().then((res) => {
      //   console.log("the res from returned address: ", res);
      //   locationObj = res;
      // });

      const locationObj = await getAddress();
      const homeImage1 = await getRandomImg();
      const homeImage2 = await getRandomImg()
      const homeImage3 = await getRandomImg()

      return {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: "test123",
        password2: "test123",
        profileImg: faker.image.avatar(),
        homeImages: [
          homeImage1,
          homeImage2,
          homeImage3,
        ],
        homeDetails: {
          homeType: "",
          sleeps: Math.floor(Math.random() * 10) + 1,
          bedRooms: Math.floor(Math.random() * 10) + 1,
          singleBeds: Math.floor(Math.random() * 10) + 1,
          doubleBeds: Math.floor(Math.random() * 10) + 1,
          bathRooms: Math.floor(Math.random() * 10) + 1,
          aboutHome: homeText,
          houseLocation: locationObj,
        },
        amneties: {
          tv: createRandomBooleanValue(),
          Wifi: createRandomBooleanValue(),
          microwave: createRandomBooleanValue(),
          fridge: createRandomBooleanValue(),
          firePlace: createRandomBooleanValue(),
          pool: createRandomBooleanValue(),
          grill: createRandomBooleanValue(),
          garden: createRandomBooleanValue(),
          parking: createRandomBooleanValue(),
          esports: createRandomBooleanValue(),
          balcony: createRandomBooleanValue(),
          elevator: createRandomBooleanValue(),
          washingMachine: createRandomBooleanValue(),
          accessible: createRandomBooleanValue(),
        },
        houseRules: {
          smoking: createRandomBooleanValue(),
          pets: createRandomBooleanValue(),
          plants: createRandomBooleanValue(),
          children: createRandomBooleanValue(),
        },
      };
    } catch (err) {
      console.log(err);
    }
  }

  //`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&per_page=${IMG_LIMIT}&page=1&safesearch=true`

  //https://source.unsplash.com/random/?home

  // let imagesArray;
  // getRandomHomeImages().then((res) => {
  //   console.log("the res from returned images: ", res);
  //   imagesArray = res;
  // });

  // console.log({imagesArray});

  // console.log(createRandomBooleanValue());

  const handleClick = (e) => {
    //use faker here to generate our user:

    //  getRandomImg();
    let newUser;
    createRandomUser().then((res) => {
      console.log("the res from returned user: ", res);
      newUser = res;
      dispatch(registerUser(newUser));
    });

    // console.log({ newUser });

    //  console.log(createRandomUser());

    //
    // setIsRegistered(true);
  };

  return (
    <div>
      <button onClick={handleClick}>click here to submit new users</button>
    </div>
  );
};

export default FakerComponent;
