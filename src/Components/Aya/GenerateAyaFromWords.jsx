// import React from "react";
// import reactHtmlParser from "react-html-parser";
// import { Typography, makeStyles } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   ayaWordTextWrapper: {
//     direction: "rtl",
//     textAlign: "right",
//     paddingTop: ".5rem",
//   },

//   ayaWordText: {
//     fontSize: ({ fontSizeArabic }) => fontSizeArabic,
//     display: "inline-block",
//     lineHeight: 1.6,
//   },
// }));

// const GenerateAyaFromWords = ({ words, page }) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.ayaWordTextWrapper}>
//       {words.map(({ id, code }) => (
//         <Typography
//           variant="h3"
//           component="b"
//           className={classes.ayaWordText}
//           style={{
//             fontFamily: `QCF_P${String(page).padStart(3, 0)}`,
//           }}
//           key={String(id)}
//         >
//           {reactHtmlParser(code)}
//         </Typography>
//       ))}
//     </div>
//   );
// };

// export default GenerateAyaFromWords;

import React, { useMemo } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import parse from "html-react-parser";

const AyaWordTextWrapper = styled(Box)({
  direction: "rtl",
  textAlign: "right",
  paddingTop: ".5rem",
});

const AyaWordText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "fontsizearabic",
})(({ fontsizearabic }) => ({
  display: "inline-block",
  lineHeight: 1.6,
  fontSize: fontsizearabic,
}));

function GenerateAyaFromWords({ words = [], page, fontSizeArabic }) {
  // ✅ memoized font family
  const mushafFont = useMemo(() => {
    return `QCF_P${String(page).padStart(3, "0")}`;
  }, [page]);

  return (
    <AyaWordTextWrapper>
      {words.map(({ id, code }) => (
        <AyaWordText
          key={id}
          variant="h4"
          component="span"
          fontsizearabic={fontSizeArabic}
          sx={{ fontFamily: mushafFont }}
        >
          {parse(code)}
        </AyaWordText>
      ))}
    </AyaWordTextWrapper>
  );
}

export default React.memo(GenerateAyaFromWords);
