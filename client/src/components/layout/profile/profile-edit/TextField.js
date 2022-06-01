import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";

 const ProfileTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#068295',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f7a800',
      },
      '&:hover fieldset': {
        borderColor: '#e85710',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#e85710',
      },
    },
  });

  export default ProfileTextField;