import { TextField } from "@mui/material";
import { authStyles } from "./authStyles";


const ValidationTextField = ({ setState,stateValue, errorState, label, type }) => {
    const classes = authStyles(errorState)();
    return (
      <TextField
      style={{marginBottom: "25px"}}
        onChange={(e) => setState(e.target.value)}
        value={stateValue}
        label={label}
        variant="standard"
        error={errorState}
        helperText={errorState}
        className={classes.root}
        type={type}
      />
    );
  };

  export default ValidationTextField;