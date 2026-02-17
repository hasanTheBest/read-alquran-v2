// import React from "react";
// import { Grid, Container, makeStyles } from "@mui/material";
// import IndexTabs from "./IndexTabs";

// const useStyles = makeStyles((theme) => ({
//   suraIndexContainer: {
//     padding: "0 0 3rem 0",
//   },
// }));

// const Index = () => {
//   const classes = useStyles();

//   return (
//     <Container maxWidth="md" className={classes.suraIndexContainer}>
//       <IndexTabs />
//     </Container>
//   );
// };

// export default Index;

import React from "react";
import { Grid, Container } from "@mui/material";
import IndexTabs from "./IndexTabs";

const Index = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        pb: 6, // equivalent to "padding-bottom: 3rem"
      }}
    >
      <IndexTabs />
    </Container>
  );
};

export default Index;
