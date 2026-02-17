// import React, { useContext } from "react";
// import { makeStyles } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
// import Slider from "@mui/material/Slider";
// import { SettingContext } from "../../../Context/SettingsContext";
// import { Box } from "@mui/material";

// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//   },
// });

// export default function SliderNav() {
//   const classes = useStyles();
//   const { fontSizeArabic, fontSizeTranslation, setFontSize } = useContext(
//     SettingContext
//   );

//   const handleChangeFontSize = (e, newValue, text) => {
//     setFontSize(newValue, text);
//   };

//   return (
//     <Box p={2}>
//       <div className={classes.root}>
//         <Typography id="font-size-arabic" gutterBottom noWrap>
//           Font Size (Arabic) <b>{`${fontSizeArabic}px`}</b>
//         </Typography>
//         <Slider
//           defaultValue={40}
//           value={fontSizeArabic}
//           valueLabelFormat={fontSizeArabic}
//           aria-labelledby="font-size-arabic"
//           onChange={(e, value) => handleChangeFontSize(e, value, "arabic")}
//           valueLabelDisplay="auto"
//           min={30}
//           max={70}
//         />
//       </div>

//       <div className={classes.root}>
//         <Typography id="font-size-translation" gutterBottom noWrap>
//           Font Size (translations) <b>{`${fontSizeTranslation}px`}</b>
//         </Typography>
//         <Slider
//           defaultValue={18}
//           value={fontSizeTranslation}
//           valueLabelFormat={fontSizeTranslation}
//           onChange={(e, value) => handleChangeFontSize(e, value, "translation")}
//           aria-labelledby="font-size-translation"
//           valueLabelDisplay="auto"
//           min={14}
//           max={34}
//         />
//       </div>
//     </Box>
//   );
// }

import React, { useContext } from "react";
import { Typography, Slider, Box } from "@mui/material";
import { SettingContext } from "../../../Context/SettingsContext";

export default function SliderNav() {
  const { fontSizeArabic, fontSizeTranslation, setFontSize } =
    useContext(SettingContext);

  const handleChangeFontSize = (value, type) => {
    setFontSize(value, type);
  };

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      {/* Arabic Font Size */}
      <Box sx={{ mb: 4 }}>
        <Typography id="font-size-arabic" gutterBottom noWrap>
          Font Size (Arabic) <b>{fontSizeArabic}px</b>
        </Typography>

        <Slider
          value={fontSizeArabic}
          onChange={(_, value) =>
            handleChangeFontSize(value, "arabic")
          }
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}px`}
          aria-labelledby="font-size-arabic"
          min={30}
          max={70}
        />
      </Box>

      {/* Translation Font Size */}
      <Box>
        <Typography id="font-size-translation" gutterBottom noWrap>
          Font Size (Translation) <b>{fontSizeTranslation}px</b>
        </Typography>

        <Slider
          value={fontSizeTranslation}
          onChange={(_, value) =>
            handleChangeFontSize(value, "translation")
          }
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}px`}
          aria-labelledby="font-size-translation"
          min={14}
          max={34}
        />
      </Box>
    </Box>
  );
}
