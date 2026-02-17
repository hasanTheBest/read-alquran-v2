// import React from "react";
// import { Grid, Typography, Link, makeStyles } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import reactHtmlParser from "react-html-parser";

// const useStyles = makeStyles((theme) => ({
//   suraIndexContainer: {
//     padding: "3rem 0",
//   },

//   indexLink: {
//     display: "flex",
//     alignItems: "center",
//     cursor: "pointer",
//     maxWidth: 300,
//     padding: "1rem",
//     "&:hover": {
//       textDecoration: "none",
//     },
//   },

//   ChapterNumberWrapper: {
//     display: "flex",
//     alignItems: "center",
//   },
//   chapterNumber: {
//     paddingRight: "1rem",
//   },
//   suraNameWrapper: {
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     flexWrap: "nowrap",
//     width: "100%",
//   },
//   nameArWrapper: {
//     textAlign: "right",
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     flexWrap: "nowrap",
//     width: "99%",
//   },
//   verseKeyWrapper: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontWeight: 500,
//   },
//   ayaText: {
//     direction: "rtl",
//     textAlign: "right",
//     fontFamily: "me_quran",
//   },
//   verseKey: {
//     fontWeight: 600,
//   },
// }));

// const MetaIndex = ({ metaInfo, metaItem }) => {
//   const classes = useStyles();

//   return (
//     <>
//       {metaInfo.map(({ index, name, tname, ename, sura, aya, text }, i) => (
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           md={4}
//           key={`${index}_sura_${sura}_aya${aya}`}
//         >
//           <Link
//             className={classes.indexLink}
//             tabIndex="0"
//             component={RouterLink}
//             to={`sura/${sura}:${aya}`}
//           >
//             <Typography
//               variant="h6"
//               component="span"
//               className={classes.chapterNumber}
//             >
//               {"Hizb" === metaItem ? (
//                 <span>
//                   {parseInt(i / 4) + 1}
//                   <small>
//                     {reactHtmlParser(
//                       String(parseFloat(index / 4)).split(".")[1] === "25"
//                         ? ""
//                         : String(parseFloat(index / 4)).split(".")[1] === "5"
//                         ? "<sup>1</sup>/<sub>4</sub>"
//                         : String(parseFloat(index / 4)).split(".")[1] === "75"
//                         ? "<sup>1</sup>/<sub>2</sub>"
//                         : "<sup>3</sup>/<sub>4</sub>"
//                     )}
//                   </small>
//                 </span>
//               ) : (
//                 index + ". "
//               )}
//             </Typography>

//             <div className={classes.suraNameWrapper}>
//               <Typography
//                 variant="body1"
//                 color="initial"
//                 component="div"
//                 className={classes.verseKeyWrapper}
//               >
//                 <Typography variant="body1" component="h6">
//                   {tname}{" "}
//                   <Typography
//                     variant="subtitle2"
//                     component="span"
//                     className={classes.verseKey}
//                   >
//                     {sura}:{aya}
//                   </Typography>
//                 </Typography>
//                 <Typography
//                   variant="h4"
//                   // component="b"
//                   style={{ textAlign: "right" }}
//                 >
//                   <span className={`raq raq-surah${sura}`}></span>
//                 </Typography>
//               </Typography>
//               <Typography
//                 variant="h6"
//                 // component="b"
//                 noWrap
//                 className={classes.ayaText}
//               >
//                 {text}
//               </Typography>
//             </div>
//           </Link>
//         </Grid>
//       ))}
//     </>
//   );
// };

// export default MetaIndex;

import React from "react";
import { Grid, Typography, Link, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import parse from "html-react-parser";

const MetaIndex = ({ metaInfo, metaItem }) => {
  return (
    <>
      {metaInfo.map(({ index, name, tname, ename, sura, aya, text }, i) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={`${index}_sura_${sura}_aya${aya}`}
        >
          <Link
            component={RouterLink}
            to={`sura/${sura}:${aya}`}
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              maxWidth: 300,
              p: 2,
            }}
          >
            {/* Index Number */}
            <Typography
              variant="h6"
              component="span"
              sx={{ pr: 2 }}
            >
              {metaItem === "Hizb" ? (
                <span>
                  {parseInt(i / 4) + 1}
                  <small>
                    {parse(
                      String(parseFloat(index / 4)).split(".")[1] === "25"
                        ? ""
                        : String(parseFloat(index / 4)).split(".")[1] === "5"
                        ? "<sup>1</sup>/<sub>4</sub>"
                        : String(parseFloat(index / 4)).split(".")[1] === "75"
                        ? "<sup>1</sup>/<sub>2</sub>"
                        : "<sup>3</sup>/<sub>4</sub>"
                    )}
                  </small>
                </span>
              ) : (
                `${index}.`
              )}
            </Typography>

            {/* Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* Title Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 500,
                }}
              >
                <Typography variant="body1" component="div">
                  {tname}{" "}
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{ fontWeight: 600 }}
                  >
                    {sura}:{aya}
                  </Typography>
                </Typography>

                <Typography variant="h4" sx={{ textAlign: "right" }}>
                  <span className={`raq raq-surah${sura}`} />
                </Typography>
              </Box>

              {/* Arabic Text */}
              <Typography
                variant="h6"
                noWrap
                sx={{
                  direction: "rtl",
                  textAlign: "right",
                  fontFamily: "me_quran",
                }}
              >
                {text}
              </Typography>
            </Box>
          </Link>
        </Grid>
      ))}
    </>
  );
};

export default MetaIndex;

