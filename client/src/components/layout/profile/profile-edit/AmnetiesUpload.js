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
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Grid } from "@mui/material";

const amnetyMap = {
  tv: { icon: LiveTv, name: "tv", text: "TV" },
  wifi: { icon: Wifi, name: "wifi", text: "WiFi" },
  microwave: { icon: Microwave, name: "microwave", text: "Microwave" },
  fridge: { icon: Kitchen, name: "fridge", text: "Fridge" },
  ac: { icon: AcUnit, name: "ac", text: "AC" },
  firePlace: { icon: Fireplace, name: "firePlace", text: "Fireplace" },
  pool: { icon: Pool, name: "pool", text: "Pool" },
  grill: { icon: OutdoorGrill, name: "grill", text: "Grill" },
  garden: { icon: Yard, name: "garden", text: "Garden" },
  parking: { icon: LocalParking, name: "parking", text: "Parking" },
  esports: { icon: SportsEsports, name: "esports", text: "Esports" },
  balcony: { icon: Balcony, name: "balcony", text: "Balcony" },
  elevator: { icon: Elevator, name: "elevator", text: "Elevator" },
  washingMachine: { icon: LocalLaundryService, name: "washingMachine", text: "Laundry" },
  accessible: { icon: Accessible, name: "accessible", text: "Accessible" },
};

const AmnetiesUpload = ({ amneties, setAmneties, setInViewComponent }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.7,
  });

  useEffect(() => {
    inView && setInViewComponent("amneties-upload");
  }, [inView]);

  const updateAmneties = (amnety) => {
    amneties[amnety]
      ? setAmneties({ ...amneties, [amnety]: false })
      : setAmneties({ ...amneties, [amnety]: true });
  };

  return (
    <div id="amneties-upload" className="panel" ref={ref}>
      <div className="panel-heading-container">
        <h3>Amneties</h3>
      </div>
      <div className="panel-body">
        <h3 className="panel-body-title">
          What type of amneties are in your home?
        </h3>
        <Grid container className="amneties-grid-container">
          
          {Object.keys(amnetyMap).map((key) => {
            const IconName = amnetyMap[key].icon;
            const amnetyName = amnetyMap[key].name;
            const amnetyText = amnetyMap[key].text;

            return (
              <Grid item xs={4} sm={4} md={3} lg={1.6} className="input-option" key= {amnetyName}>
                <input
                  name={amnetyName}
                  id={amnetyName}
                  type="checkbox"
                  checked={amneties[amnetyName] === true}
                  onChange={() => updateAmneties(amnetyName)}
                  className="hidden-input"
                />
                <label htmlFor ={amnetyName}>
                  <IconName /> {amnetyText}
                </label>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default memo(AmnetiesUpload);
