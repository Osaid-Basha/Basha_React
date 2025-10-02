import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme =(mode) => createTheme({
    palette: {
        mode: mode,
      },
      
  });
  
  export default theme;