import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
// import WebfontLoader from "@dr-kobros/react-webfont-loader";

import { SettingContext } from "../../Context/SettingsContext";
import "./TajweedStyle.css"

import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Drawer as MuiDrawer,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import Drawer from "../Header/Drawer/Drawer";

import PageVirtualLoader from "./pageVirtualLoader";
import MushafPage from "./mushafPage";

const SuraWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Aya = () => {
  const { selectItemFont, readingMode } =
    useContext(SettingContext);

  const theme = useTheme();
  const breakUp1440 = useMediaQuery(theme.breakpoints.up(1440));

  const { pathname } = useLocation();

  // const families = useMemo(() => {
  //   return ["Uthamanic Hafs", selectItemFont];
  // }, [selectItemFont]);

  return (
    <>
      {breakUp1440 && pathname.startsWith("/page") && (
        <Box
          sx={{
            position: "absolute",
            left: `calc(50% + 445px)`,
            zIndex: theme.zIndex.appBar - 100,
            mt: "3.8rem",
          }}
        >
          <Drawer />
        </Box>
      )}

      <SuraWrapper>
        {/* <WebfontLoader
          config={{
            custom: {
              families: families,
            },
          }}
        > */}
          <Container maxWidth={false} sx={{
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {/* {readingMode ? (<MushafPage />) : (<PageVirtualLoader />)} */}
            {<PageVirtualLoader />}
            {/* {readingMode ? (<PageVirtualLoader />) : (<AyaVirtualLoader />)} */}
          </Container>
        {/* </WebfontLoader> */}
      </SuraWrapper>
    </>
  );
};

export default Aya;
