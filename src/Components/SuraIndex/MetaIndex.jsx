import React, { useContext } from "react";
import { Grid, Typography, Link, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import parse from "html-react-parser";
import { MushafPageContext } from "../../Context/MushafPageContextProvider";
import SuraMeta from "./SuraMeta";

const MetaIndex = ({ metaInfo, metaItem }) => {
  const {suraAyaToPage} = useContext(MushafPageContext)

  if(metaItem === "Sura") return <SuraMeta suraList={metaInfo} />

  return (
    <>
      {metaInfo.map(({ index, name, tname, ename, sura, aya, text }, i) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
          key={`${index}_sura_${sura}_aya${aya}`}
        >
          <Link
            component={RouterLink}
            to={"/page/" + suraAyaToPage[`${sura}:${aya}`]}
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              maxWidth: 300,
              p: 2,
            }}
          >
            {/* Index Number */}
            <Typography
              variant="h6"
              component="span"
              sx={{ pr: 2 }}
            >
              {metaItem === "Hizb" ? (
                <span>
                  {parseInt(i / 4) + 1}
                  <small>
                    {parse(
                      String(parseFloat(index / 4)).split(".")[1] === "25"
                        ? ""
                        : String(parseFloat(index / 4)).split(".")[1] === "5"
                          ? "<sup>1</sup>/<sub>4</sub>"
                          : String(parseFloat(index / 4)).split(".")[1] === "75"
                            ? "<sup>1</sup>/<sub>2</sub>"
                            : "<sup>3</sup>/<sub>4</sub>"
                    )}
                  </small>
                </span>
              ) : (
                `${index}.`
              )}
            </Typography>

            {/* Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* Title Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 500,
                }}
              >
                <Typography variant="body1" component="div">
                  {tname}{" "}
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{ fontWeight: 600 }}
                  >
                    {sura}:{aya}
                  </Typography>
                </Typography>

                <Typography variant="h4" sx={{ textAlign: "right" }}>
                  <span className={`raq raq-surah${sura}`} />
                </Typography>
              </Box>

              {/* Arabic Text */}
              <Typography
                variant="h6"
                noWrap
                sx={{
                  direction: "rtl",
                  textAlign: "right",
                  fontFamily: "me_quran",
                }}
              >
                {text}
              </Typography>
            </Box>
          </Link>
        </Grid>
      ))}
    </>
  );
};

export default MetaIndex;

