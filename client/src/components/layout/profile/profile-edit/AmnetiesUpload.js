import {
  LiveTv,
  Wifi,
  Microwave,
  Kitchen,
  AcUnit,
  Fireplace,
  Pool,
  OutdoorGrill,
  Yard,
  LocalParking,
  SportsEsports,
  Balcony,
  Elevator,
  LocalLaundryService,
  Accessible,
} from "@mui/icons-material";
import {memo, useEffect} from "react";
import { useInView } from 'react-intersection-observer';

//tv, wifi, microwave, fridge, freezer, a/c, heating, pool, garden, BBQ, parking, video games, balcony, gym, elevator, dishwasher, washing machine, oven
// each one button with div around as square make it grid.

//just use map here instead?

const AmnetiesUpload = ({amneties, setAmneties,setInViewComponent}) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    inView&& setInViewComponent("amneties-upload"); 
    
    }, [inView]);

    
  return (
    <div id="amneties-upload" ref={ref}>
      <h2> Amneties</h2>
      <h4> What type of amenities are in your home?</h4>
      <button
        onClick={() =>
          setAmneties(
            amneties.tv ? {...amneties, tv: false} : {...amneties, tv: true}
          )
        }
      >
        <LiveTv />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.wifi
              ? {...amneties, wifi: false}
              : {...amneties, wifi: true}
          )
        }
      >
        <Wifi />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.microwave
              ? {...amneties, microwave: false}
              : {...amneties, microwave: true}
          )
        }
      >
        <Microwave />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.fridge
              ? {...amneties, fridge: false}
              : {...amneties, fridge: true}
          )
        }
      >
        <Kitchen />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.ac ? {...amneties, ac: false} : {...amneties, ac: true}
          )
        }
      >
        <AcUnit />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.firePlace
              ? {...amneties, firePlace: false}
              : {...amneties, firePlace: true}
          )
        }
      >
        <Fireplace />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.pool
              ? {...amneties, pool: false}
              : {...amneties, pool: true}
          )
        }
      >
        <Pool />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.grill
              ? {...amneties, grill: false}
              : {...amneties, grill: true}
          )
        }
      >
        <OutdoorGrill />
      </button>
      <button>
        <Yard
          onClick={() =>
            setAmneties(
              amneties.garden
                ? {...amneties, garden: false}
                : {...amneties, garden: true}
            )
          }
        />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.parking
              ? {...amneties, parking: false}
              : {...amneties, parking: true}
          )
        }
      >
        <LocalParking />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.esports
              ? {...amneties, esports: false}
              : {...amneties, esports: true}
          )
        }
      >
        <SportsEsports />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.balcony
              ? {...amneties, balcony: false}
              : {...amneties, balcony: true}
          )
        }
      >
        <Balcony />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.elevator
              ? {...amneties, elevator: false}
              : {...amneties, elevator: true}
          )
        }
      >
        <Elevator />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.washingMachine
              ? {...amneties, washingMachine: false}
              : {...amneties, washingMachine: true}
          )
        }
      >
        <LocalLaundryService />
      </button>
      <button
        onClick={() =>
          setAmneties(
            amneties.accessible
              ? {...amneties, accessible: false}
              : {...amneties, accessible: true}
          )
        }
      >
        <Accessible />
      </button>
    </div>
  );
};

export default memo(AmnetiesUpload);
