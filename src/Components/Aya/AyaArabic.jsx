// import React from "react";
// import { SettingContext } from "../../Context/SettingsContext";
// import { Typography, makeStyles } from "@mui/material";
// import { tajweedMarker } from "../../Helper/helper";
// import reactHtmlParser from "react-html-parser";
// import WebfontLoader from "@dr-kobros/react-webfont-loader";

// const styles = makeStyles((theme) => ({
//   ayahContainer: ({ fontSizeArabic, selectItemFont }) => ({
//     direction: "rtl",
//     fontFamily:
//       selectItemFont === "Old Madina Mushaf" ? "Uthmanic Hafs" : selectItemFont,
//     fontSize: fontSizeArabic,
//     fontWeight: 600,
//     padding: ".8rem .5rem",
//     margin: ".5rem 0",
//     lineHeight: 2,
//   }),
//   ayahNumberHafs: {
//     fontFamily: "inherit",
//     fontWeight: 400,
//     marginRight: ".5rem",
//   },

//   endAyah: {
//     display: "inline",
//     position: "relative",
//     marginRight: "10px",
//   },

//   ayahSign: {
//     fontFamily: "inherit",
//   },

//   ayahNumber: {
//     display: "inline",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     fontFamily: "inherit",
//     transform: "translate(-50%, -40%)",
//   },
// }));

// const AyaArabic = ({ tajweedRule, text, index }) => {
//   const { fontSizeArabic, selectItemFont } = React.useContext(SettingContext);
//   const classes = styles({ fontSizeArabic, selectItemFont });

//   return (
//     <>
//       <Typography
//         variant="h4"
//         color="textPrimary"
//         component="h5"
//         className={classes.ayahContainer}
//       >
//         {tajweedRule
//           ? reactHtmlParser(tajweedMarker(tajweedRule, text))
//           : reactHtmlParser(text)}
//         <Typography
//           variant="h3"
//           color="textPrimary"
//           component="span"
//           className={classes.ayahNumberHafs}
//         >
//           {index.toLocaleString("ar-EG")}
//         </Typography>

//         {/* <div className={classes.endAyah}>
//           <span className={classes.ayahSign}>&#1757;</span>
//           <span className={classes.ayahNumber}>
//             {Number(a_id).toLocaleString("ar-EG")}
//           </span>
//         </div> */}
//       </Typography>
//     </>
//   );
// };

// export default AyaArabic;

import React, { useContext, useMemo } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SettingContext } from "../../Context/SettingsContext";
import { tajweedMarker } from "../../Helper/helper";
import parse from "html-react-parser";

const AyahContainer = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== "fontsizearabic" && prop !== "fontfamily",
})(({ fontsizearabic, fontfamily }) => ({
  direction: "rtl",
  fontFamily: fontfamily,
  fontSize: fontsizearabic,
  fontWeight: 600,
  padding: ".8rem .5rem",
  margin: ".5rem 0",
  lineHeight: 2,
}));

const AyahNumber = styled(Typography)({
  fontFamily: "inherit",
  fontWeight: 400,
  marginRight: ".5rem",
  display: "inline",
});

const AyaArabic = ({ tajweedRule, text, index }) => {
  const { fontSizeArabic, selectItemFont } = useContext(SettingContext);

  const computedFontFamily = useMemo(() => {
    return selectItemFont === "Old Madina Mushaf"
      ? "Uthmanic Hafs"
      : selectItemFont;
  }, [selectItemFont]);

  const parsedText = useMemo(() => {
    return tajweedRule
      ? parse(tajweedMarker(tajweedRule, text))
      : parse(text);
  }, [tajweedRule, text]);

  return (
    <AyahContainer
      variant="h4"
      component="h5"
      fontsizearabic={fontSizeArabic}
      fontfamily={computedFontFamily}
    >
      {parsedText}

      <AyahNumber variant="h6" component="span">
        {index.toLocaleString("ar-EG")}
      </AyahNumber>
    </AyahContainer>
  );
};

export default AyaArabic;
