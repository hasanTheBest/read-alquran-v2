import React from "react";
import { Box, useTheme} from "@mui/material";

const Bismillah = ({ayahId, surahId}) => {
  const muiTheme = useTheme();
  
if(ayahId !== 1 ||surahId === 9 || surahId === 1 ) return null;

  return (
    <Box
      sx={{
        textAlign: "center",
        lineHeight: 1,
        fontSize: muiTheme.typography.h2.fontSize
      }}
    >
        <span className="raq raq-bismallah" />
    </Box>
  );
};

export default React.memo(Bismillah);