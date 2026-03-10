import React from "react";
import { Box, Typography } from "@mui/material";

const ShowSuraName = ({ ayahId, surahId }) => {

  if (ayahId !== 1) return null;

  return (
    <Box
      sx={{
        marginTop: ".5rem",
        textAlign: "center",
        direction: "rtl",
        position: "relative",
        lineHeight: 1,
      }}
    >

      <Typography component="div" sx={{
        fontFamily: "JuzName",
        fontSize: "4.5rem",
        lineHeight: 1,
      }}>header</Typography>

      <Typography component="h2" sx={{
        fontFamily: "surahNameV2",
        fontSize: "3.5rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        lineHeight: 1,
      }}>
        {`surah${String(surahId).padStart(3, '0')}`}
        </Typography>
    </Box>
  );
};

export default React.memo(ShowSuraName);