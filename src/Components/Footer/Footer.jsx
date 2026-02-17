// import React from "react";
// import { makeStyles, Typography } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   footer: {
//     textAlign: "center",
//     padding: "1rem",
//     backgroundColor: theme.palette.primary.main,
//   },
// }));

// const Footer = () => {
//   const classes = useStyles();

//   let date = new Date();
//   let year = date.getFullYear();

//   return (
//     <footer className={classes.footer}>
//       <Typography variant="body2" color="initial">
//         All Rights Reserved &copy;Mahmudul Hasan, {year}
//       </Typography>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        p: 2, // 1rem padding
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Typography variant="body2">
        All Rights Reserved &copy; Mahmudul Hasan, {year}
      </Typography>
    </Box>
  );
};

export default Footer;
