// import React from "react";
// import { Box, makeStyles } from "@mui/material";
// import AyaArabic from "./AyaArabic";

// const useStyles = makeStyles(() => ({
//   readingMode: {
//     display: "inline",
//     textAlign: "center",
//     "& > h5": {
//       display: "inline",
//     },
//   },
// }));

// const ReadingMode = ({ props }) => {
//   const classes = useStyles();

//   return (
//     <Box p={3} className={classes.readingMode}>
//       <AyaArabic {...props} />
//     </Box>
//   );
// };

// export default ReadingMode;

import React from "react";
import { Box } from "@mui/material";
import AyaArabic from "./AyaArabic";

const ReadingMode = ({ props }) => {
  return (
    <Box
      p={3}
      sx={{
        display: "inline",
        textAlign: "center",
        "& > h5": {
          display: "inline",
        },
      }}
    >
      <AyaArabic {...props} />
    </Box>
  );
};

export default React.memo(ReadingMode);
