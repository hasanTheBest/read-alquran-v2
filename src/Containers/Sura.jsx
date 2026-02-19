// import React, { useContext, Suspense, lazy } from "react";
// import { useParams } from "react-router-dom";
// import { Backdrop, CircularProgress, makeStyles } from "@mui/material";

// // Components
// import Header from "../Components/Header/Header";
// import Banner from "../Components/Banner/Banner";
// import Words from "../Components/Words/Words";
// import SuraInfo from "../Components/SuraInfo/SuraInfo";
// import Footer from "../Components/Footer/Footer";
// import SuraContextProvider from "../Context/SuraContextProvider";
// import { SportsRugbySharp } from "@mui/icons-material";
// // import Aya from "../Components/Aya/Aya";

// const Aya = lazy(() => import("../Components/Aya/Aya"));

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: theme.palette.primary.dark,
//   },
// }));

// const Loading = () => {
//   const classes = useStyles();

//   return (
//     <Backdrop className={classes.backdrop} open={true}>
//       <CircularProgress color="inherit" />
//     </Backdrop>
//   );
// };

// const Sura = () => {
//   const { suraId } = useParams();

//   return (
    
//       <Suspense fallback={<Loading />}>
//         <SuraContextProvider>
//           <Header />
//           <SuraInfo suraId={Number(suraId) ? suraId : suraId.split(":")[0]} />
//           <Aya />
//           <Footer />
//         </SuraContextProvider>
//       </Suspense>
    
//   );
// };

// export default Sura;

import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

// Components
import Header from "../Components/Header/Header";
import SuraInfo from "../Components/SuraInfo/SuraInfo";
import Footer from "../Components/Footer/Footer";
import SuraContextProvider from "../Context/SuraContextProvider";

const Aya = lazy(() => import("../Components/Aya/Aya"));

/* -------------------- Loading Component -------------------- */

const Loading = () => (
  <Backdrop
    open
    sx={(theme) => ({
      zIndex: theme.zIndex.drawer + 1,
      color: "primary.dark",
    })}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

/* -------------------- Sura Page -------------------- */

const Sura = () => {
  const { suraId } = useParams();

  // Support both:
  // /sura/2
  // /sura/2:255
  const parsedSuraId = suraId?.includes(":")
    ? suraId.split(":")[0]
    : suraId;

  return (
    <Suspense fallback={<Loading />}>
      <SuraContextProvider>
        {/* <Header /> */}
        <SuraInfo suraId={parsedSuraId} />
        <Aya />
        <Footer />
      </SuraContextProvider>
    </Suspense>
  );
};

export default Sura;
