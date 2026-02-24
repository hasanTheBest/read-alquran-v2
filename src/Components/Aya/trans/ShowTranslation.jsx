// import React, { useContext } from "react";
// import { SettingContext } from "../../../Context/SettingsContext";

// import { Typography } from "@mui/material";
// import { makeStyles } from "@mui/material/styles";

// const useStyles = makeStyles((theme) => ({
//   transBn: {
//     fontSize: ({ fontSizeTranslation }) => fontSizeTranslation,
//     letterSpacing: 1,
//     padding: ".5rem",
//   },
// }));

// const ShowTranslation = ({ translation, index, locale }) => {
//   const { fontSizeTranslation } = useContext(SettingContext);

//   const classes = useStyles({ fontSizeTranslation });

//   return (
//     <Typography
//       variant="body1"
//       color="textSecondary"
//       component="p"
//       className={classes.transBn}
//     >
//       <span>{index.toLocaleString(locale)} . </span>
//       {translation}
//     </Typography>
//   );
// };

// export default ShowTranslation;

import React, { useContext } from "react";
import { SettingContext } from "../../../Context/SettingsContext";
import { Typography } from "@mui/material";

const ShowTranslation = ({ translation, index, locale = "en" }) => {
  const { fontSizeTranslation } = useContext(SettingContext);

  return (
    <Typography
      variant="body1"
      color="textSecondary"
      component="p"
      sx={{
        fontSize: fontSizeTranslation,
        // letterSpacing: 1,
        // padding: "0.5rem",
        marginTop: ".2em"
      }}
    >
      {index.toLocaleString(locale)}. {translation}
    </Typography>
  );
};

export default React.memo(ShowTranslation);
