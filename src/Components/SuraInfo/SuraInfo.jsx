
import React, { useContext, useMemo } from "react";
import { Box, FormControl, Select, MenuItem } from "@mui/material";

import SelectSura from "./SelectSura";
import ExploreSuraMeta from "./ExploreSuraMeta";
import { parseVerseKey } from "../../Helper/pageBuilder";
import { useNavigate } from "react-router-dom";
import { MushafPageContext } from "../../Context/MushafPageContextProvider";

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

{/* Transferred to the header compnent */}
        {/* <Box
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
        </Box> */}
      </Box>
    </>
  );
};

export default React.memo(SuraInfo);