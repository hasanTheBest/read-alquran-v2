// import React from "react";
// import { Typography, makeStyles } from "@mui/material";
// import reactHtmlParser from "react-html-parser";
// import { SettingContext } from "../../Context/SettingsContext";

// const styles = makeStyles((theme) => ({
//   wordWrapper: { direction: "rtl", display: "flex", flexWrap: "wrap" },
//   word: {
//     display: "inline-flex",
//     textAlign: "center",
//     marginRight: ".8rem",
//     flexDirection: "column",
//     borderRadius: ".5rem",
//     "&:not(:last-child)": {
//       borderBottom: `1px solid ${theme.palette.divider}`,
//       padding: ".5rem",
//       marginRight: ".5rem",
//     },
//     "&:last-child": {
//       marginTop: ".6rem",
//     },
//   },

//   textArabic: {
//     fontFamily: "Uthman Hafs",
//   },

//   TextWord: ({ mushafFont, fontSizeArabic, selectItemFont }) => ({
//     fontFamily:
//       selectItemFont === "Old Madina Mushaf" ? mushafFont : selectItemFont,
//     fontSize: fontSizeArabic,
//   }),

//   wordTranslation: ({ fontSizeTranslation }) => ({
//     fontSize: fontSizeTranslation,
//   }),
// }));

// const Words = ({ props: { words, mushafFont, ayaNum } }) => {
//   const {
//     showWbwTransliteration,
//     showWbwTranslation,
//     fontSizeArabic,
//     fontSizeTranslation,
//     selectItemFont,
//     wordTranslation,
//   } = React.useContext(SettingContext);
//   const classes = styles({
//     mushafFont,
//     fontSizeArabic,
//     fontSizeTranslation,
//     selectItemFont,
//   });

//   return (
//     <>
//       <div className={classes.wordWrapper}>
//         {words &&
//           words.map((word) => {
//             const { text, id, char_type, code } = word;
//             const trans = Boolean(word.translation) ? word.translation : null;

//             return (
//               <React.Fragment key={id}>
//                 {/* {char_type === "word" && char_type !== "end" && ( */}
//                 <Typography
//                   variant="h5"
//                   color="textPrimary"
//                   component="div"
//                   className={classes.word}
//                 >
//                   <Typography
//                     variant="h3"
//                     component="b"
//                     className={classes.TextWord}
//                   >
//                     {mushafFont ? reactHtmlParser(code) : text}
//                   </Typography>

//                   {/* Transliteration */}
//                   {showWbwTransliteration && (
//                     <Typography
//                       variant="body1"
//                       color="textSecondary"
//                       component="span"
//                     >
//                       {Boolean(trans) && trans.trl}
//                     </Typography>
//                   )}

//                   {/* Translation */}
//                   {char_type === "word" && (
//                     <>
//                       {showWbwTranslation && (
//                         <>
//                           {wordTranslation === "word-tr-bangla" ? (
//                             <Typography
//                               variant="body1"
//                               color="textSecondary"
//                               component="span"
//                               className={classes.wordTranslation}
//                             >
//                               {Boolean(trans) && trans.bn}
//                             </Typography>
//                           ) : (
//                             <Typography
//                               variant="body1"
//                               color="textSecondary"
//                               component="span"
//                             >
//                               {Boolean(trans) && trans.en}
//                             </Typography>
//                           )}
//                         </>
//                       )}
//                     </>
//                   )}
//                 </Typography>
//               </React.Fragment>
//             );
//           })}

//         {/* Aya Mark */}
//         {"Old Madina Mushaf" !== selectItemFont && (
//           <Typography
//             variant="h5"
//             color="textPrimary"
//             component="div"
//             className={classes.word}
//           >
//             <Typography variant="h3" component="b" className={classes.TextWord}>
//               {ayaNum.toLocaleString("ar-EG")}
//             </Typography>
//           </Typography>
//         )}
//       </div>
//     </>
//   );
// };

// export default Words;

import React, { useContext } from "react";
import { Typography, Box } from "@mui/material";
import parse from "html-react-parser";
import { SettingContext } from "../../Context/SettingsContext";

const Words = ({  words, mushafFont, ayaNum } ) => {
  const {
    showWbwTransliteration,
    showWbwTranslation,
    fontSizeArabic,
    fontSizeTranslation,
    selectItemFont,
    wordTranslation,
  } = useContext(SettingContext);

  return (
    <Box
      sx={{
        direction: "rtl",
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {words?.map((word) => {
        const { text, id, char_type, code, translation: trans } = word;

        const displayText =
          mushafFont && code ? parse(code) : text || "";

        const arabicFont =
          selectItemFont === "Old Madina Mushaf" ? mushafFont : selectItemFont;

        return (
          <Box
            key={id}
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              textAlign: "center",
              borderRadius: "0.5rem",
              p: 0.5,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            {/* Arabic Word */}
            <Typography
              variant="h3"
              // component="b"
              sx={{
                fontFamily: arabicFont,
                fontSize: fontSizeArabic,
              }}
            >
              {displayText}
            </Typography>

            {/* Transliteration */}
            {showWbwTransliteration && trans?.trl && (
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {trans.trl}
              </Typography>
            )}

            {/* Translation */}
            {char_type === "word" && showWbwTranslation && trans && (
              <Typography
                // variant="body2"
                color="textSecondary"
                component="span"
                sx={{
                  fontSize:
                    wordTranslation === "word-tr-bangla"
                      ? fontSizeTranslation
                      : "inherit",
                }}
              >
                {wordTranslation === "word-tr-bangla" ? trans.bn : trans.en}
              </Typography>
            )}
          </Box>
        );
      })}

      {/* Aya Number */}
      {selectItemFont !== "Old Madina Mushaf" && (
        // <Box
        //   sx={{
        //     display: "inline-flex",
        //     flexDirection: "column",
        //     textAlign: "center",
        //     borderRadius: "0.5rem",
        //     p: 0.5,
        //   }}
        // >
          <Typography
            // variant="h3"
            // component="b"
            sx={{
              // fontFamily: "",
              fontSize: fontSizeArabic,
            }}
          >
            {ayaNum.toLocaleString("ar-EG")}
          </Typography>
        // </Box>
      )}
    </Box>
  );
};

export default React.memo(Words);
