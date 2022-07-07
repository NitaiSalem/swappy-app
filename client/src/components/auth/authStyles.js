import { makeStyles } from "@mui/styles";

export const authStyles = (value) =>
  makeStyles((theme) => ({
    root: {
      "& .MuiFormLabel-root": {
        color: "#8b8b8b",
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: "#068295",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#068295",
      },
      "& .MuiInput-underline:before": {
        borderBottom: " 1px solid lightblue",
      },
      " && .MuiInput-underline:hover:before": {
        borderBottom: "2px solid #068295",
      },
      " && .MuiInput-underline:hover:after": {
        borderBottom: "2px solid #068295",
      },
      "& .MuiFormLabel-root.Mui-error": {
        color: "#d80505",
      },
      "& .MuiFormHelperText-root": {
        color: "#d80505",
      },
      "& .MuiInput-underline.Mui-error:after": {
        borderBottom: " 1px solid #d80505",
      },
      "& .MuiInput-underline.Mui-error:before": {
        borderBottom: " 1px solid #d80505",
      },
      " && .MuiInput-underline.Mui-error:hover:after": {
        borderBottom: "2px solid #d80505",
      },
      " && .MuiInput-underline.Mui-error:hover:before": {
        borderBottom: "2px solid #d80505",
      },
      " && .MuiInput-underline.Mui-error.Mui-focused:before": {
        borderBottom: "2px solid #d80505",
      },
      " && .MuiInput-underline.Mui-error.Mui-focused:after": {
        borderBottom: "2px solid #d80505",
      },
    },
  }));
