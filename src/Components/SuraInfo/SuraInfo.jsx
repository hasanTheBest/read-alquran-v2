
import React, { useContext, useMemo } from "react";
import { Box, FormControl, Select, MenuItem } from "@mui/material";

import suraMeta from "../SuraInfo/data/suraMeta.json";
import Bismillah from "./Bismillah";
import SelectSura from "./SelectSura";
import ExploreSuraMeta from "./ExploreSuraMeta";
import { SuraContext } from "../../Context/SuraContextProvider";
import suraAyaToPage from "../../assets/data/suraAyaToPage.json"
import pageToSuraAya from "../../assets/data/pageToSuraAya.json"
import { parseVerseKey } from "../../Helper/pageBuilder";
import { useNavigate } from "react-router-dom";

/* =========================
   Select Aya Component
========================= */
const SelectAya = ({ aya }) => {
  const { ayaOfSura, setAyaOfSura } = useContext(SuraContext);

  const handleChangeAya = (e) => {
    setAyaOfSura(Number(e.target.value));
  };

  const options = useMemo(
    () =>
      Array.from({ length: aya }, (_, i) => (
        <MenuItem value={i + 1} key={i + 1}>
          {i + 1}
        </MenuItem>
      )),
    [aya]
  );

  return (
    <FormControl size="small">
      <Select
        value={ayaOfSura}
        onChange={handleChangeAya}
        displayEmpty
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        {options}
      </Select>
    </FormControl>
  );
};

const SelectPage = () => {
  const navigate = useNavigate()
  const { suraId, ayaOfSura, setAyaOfSura } = useContext(SuraContext)
  let pageNumber = suraAyaToPage[`${suraId}:${ayaOfSura}`]


  const handleChangePage = (e) => {
    const page = Number(e.target.value)
    const { surahId, ayahId } = parseVerseKey(pageToSuraAya[page][0])

    setAyaOfSura(ayahId)

    navigate(`/sura/${surahId}`);

    pageNumber = suraAyaToPage[`${suraId}:${ayaOfSura}`]
  }

  const pageNumbers = Array.from({ length: 604 }, (_, i) => (
    <MenuItem value={i + 1} key={i + 1}>
      {i + 1}
    </MenuItem>
  ))

  return (
    <FormControl size="small">
      <Select
        value={pageNumber}
        onChange={handleChangePage}
        displayEmpty
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        {pageNumbers}
      </Select>
    </FormControl>
  )
}

/* =========================
   Main SuraInfo Component
========================= */
const SuraInfo = ({ suraId }) => {
  const suraData = suraMeta.suras.sura[suraId - 1];

  return (
    <>
      <Box
        sx={(theme) => ({
          width: "100%",
          height: 230,
          position: "relative",
          background: theme.palette.primary.light,
          mt: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-end",
          pb: 2,
        })}
      >
        <ExploreSuraMeta
          info={suraMeta.suras.sura}
          id={suraId}
        />

        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <SelectSura suraList={suraMeta.suras.sura} />
          <SelectAya aya={suraData.ayas} />
          <SelectPage />
        </Box>
      </Box>
    </>
  );
};

export default React.memo(SuraInfo);