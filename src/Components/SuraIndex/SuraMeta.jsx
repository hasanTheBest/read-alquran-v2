import React, { useContext } from "react";
import { Grid, Link, Typography, Box, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { MushafPageContext } from "../../Context/MushafPageContextProvider";

const SuraMeta = ({ suraList }) => {
  const {suraAyaToPage} = useContext(MushafPageContext)
  return (
    <>
      {suraList.map(({ index, tname, name, ayas, ename }) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
          key={`${index}-${tname}`}>
          <Link
            component={RouterLink}
            to={`page/${suraAyaToPage[`${index}:1`]}`}
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
