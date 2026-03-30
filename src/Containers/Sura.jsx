import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

// Components
import Header from "../Components/Header/Header";
import SuraInfo from "../Components/SuraInfo/SuraInfo";
import MushafPageContextProvider from "../Context/MushafPageContextProvider";

const Aya = lazy(() => import("../Components/Aya/Aya"));

const Sura = () => {
  // const { pageId } = useParams();

  return (
    <>
      <Header />
      {/* <SuraInfo pageId={Number(pageId)} /> */}
      <Aya />
    </>
  );
};

export default Sura;
