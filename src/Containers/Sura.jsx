import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

// Components
import Header from "../Components/Header/Header";
import SuraInfo from "../Components/SuraInfo/SuraInfo";
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
        <Header />
        <SuraInfo suraId={parsedSuraId} />
        <Aya />
      </SuraContextProvider>
    </Suspense>
  );
};

export default Sura;
