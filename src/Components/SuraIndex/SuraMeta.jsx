// import React from "react";
// import { Grid, Link, Typography, makeStyles } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   indexLink: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
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
//   nameArWrapper: {
//     textAlign: "right",
//   },

//   suraTname: {
//     fontWeight: 700,
//   },

//   suraName: {
//     lineHeight: 1,
//   },

//   ayasCount: {
//     lineHeight: 1,
//     fontWeight: 700,
//   },
// }));

// const SuraMeta = ({ suraList }) => {
//   const classes = useStyles();

//   return (
//     <>
//       {suraList.map(({ index, type, tname, name, ayas, ename }) => (
//         <Grid item xs={12} sm={6} md={4} key={index + tname}>
//           <Link
//             className={classes.indexLink}
//             tabIndex="0"
//             to={`sura/${index}`}
//             component={RouterLink}
//           >
//             <Typography
//               variant="body1"
//               color="initial"
//               component="div"
//               className={classes.ChapterNumberWrapper}
//             >
//               <Typography
//                 variant="h6"
//                 component="div"
//                 className={classes.chapterNumber}
//               >
//                 {index}.
//               </Typography>

//               <Typography
//                 variant="body1"
//                 color="initial"
//                 component="h6"
//                 className={classes.suraTname}
//               >
//                 {tname}
//                 <Typography variant="subtitle2" color="initial">
//                   {ename}
//                 </Typography>
//               </Typography>
//             </Typography>

//             <Typography
//               variant="h5"
//               color="initial"
//               component="div"
//               className={classes.nameArWrapper}
//             >
//               <Typography variant="h4" className={classes.suraName}>
//                 <span className={`raq raq-surah${index}`}></span>
//               </Typography>

//               <Typography
//                 variant="caption"
//                 color="initial"
//                 component="h6"
//                 className={classes.ayasCount}
//               >
//                 {ayas} Ayah
//               </Typography>
//             </Typography>
//           </Link>
//         </Grid>
//       ))}
//     </>
//   );
// };

// export default React.memo(SuraMeta);

import React from "react";
import { Grid, Link, Typography, Box, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SuraMeta = ({ suraList }) => {
  return (
    <>
      {suraList.map(({ index, tname, name, ayas, ename }) => (
        <Grid item xs={12} sm={6} md={4} key={`${index}-${tname}`}>
          <Link
            component={RouterLink}
            to={`sura/${index}`}
            tabIndex={0}
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              maxWidth: 300,
              p: 2,
              "&:hover": { textDecoration: "none", backgroundColor: "action.hover" },
            }}
          >
            {/* Left Side: Chapter Number + Names */}
            <Stack spacing={0.5}>
              <Typography variant="h6" component="div">
                {index}.
              </Typography>

              <Box>
                <Typography variant="body1" fontWeight={700}>
                  {tname}
                </Typography>
                <Typography variant="subtitle2">{ename}</Typography>
              </Box>
            </Stack>

            {/* Right Side: Arabic Name + Ayas */}
            <Stack spacing={0.3} textAlign="right">
              <Typography variant="h4" component="div">
                <span className={`raq raq-surah${index}`}></span>
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                {ayas} Ayah
              </Typography>
            </Stack>
          </Link>
        </Grid>
      ))}
    </>
  );
};

export default React.memo(SuraMeta);
