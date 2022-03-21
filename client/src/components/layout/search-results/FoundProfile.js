import {useLocation} from "react-router-dom";

const FoundProfile = () => {
  const {state} = useLocation();

  console.log("this is state ", state);

  return (
    <div>
      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>this is {state.name}</h2>
    </div>
  );
};

export default FoundProfile;
