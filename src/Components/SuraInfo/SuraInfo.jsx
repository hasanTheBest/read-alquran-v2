
import React, { useContext, useMemo } from "react";
import { Box, FormControl, Select, MenuItem } from "@mui/material";

import SelectSura from "./SelectSura";
import ExploreSuraMeta from "./ExploreSuraMeta";
import { parseVerseKey } from "../../Helper/pageBuilder";
import { useNavigate } from "react-router-dom";
import { MushafPageContext } from "../../Context/MushafPageContextProvider";

/* =========================
   Select Aya Component
========================= */
const SelectAya = ({ aya, suraId }) => {
  const { ayaOfSura, setAyaOfSura, suraAyaToPage } = useContext(MushafPageContext);
  const navigate = useNavigate()

  const handleChangeAya = (e) => {
    const newAya = Number(e.target.value)
    setAyaOfSura(newAya);

    navigate(`/page/${suraAyaToPage[`${suraId}:${newAya}`]}`)


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

const SelectPage = ({pageId}) => {
  const navigate = useNavigate()
  const { setAyaOfSura, pageToSuraAya } = useContext(MushafPageContext)

  const handleChangePage = (e) => {
    const page = Number(e.target.value)
    const { ayahId } = parseVerseKey(pageToSuraAya[page][0])

    setAyaOfSura(ayahId)

    navigate(`/page/${page}`);
  }

  const pageNumbers = Array.from({ length: 604 }, (_, i) => (
    <MenuItem value={i + 1} key={i + 1}>
      {i + 1}
    </MenuItem>
  ))

  return (
    <FormControl size="small">
      <Select
        value={pageId}
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
const SuraInfo = ({ pageId }) => {
  const {suraMeta, pageToSuraAya} = useContext(MushafPageContext)
  const {surahId: suraId} = parseVerseKey(pageToSuraAya[pageId][0])
  const suraData = suraMeta[suraId - 1];

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
          info={suraMeta}
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
          <SelectSura suraList={suraMeta} suraId={suraId} />
          <SelectAya aya={suraData.ayas} suraId={suraId} />
          <SelectPage pageId={pageId}/>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(SuraInfo);