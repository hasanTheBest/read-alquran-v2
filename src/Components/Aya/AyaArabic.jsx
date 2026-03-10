import React, { useContext, useMemo } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SettingContext } from "../../Context/SettingsContext";
import { tajweedMarker } from "../../Helper/helper";
import parse from "html-react-parser";

const AyahContainer = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== "fontsizearabic" && prop !== "fontfamily",
})(({ fontsizearabic, fontfamily }) => ({
  direction: "rtl",
  fontFamily: fontfamily,
  fontSize: fontsizearabic,
  fontWeight: 500,
  textAlign: "justify",
  lineHeight: 2,
  display: "inline"

}));

const AyahNumber = styled(Typography)({
  fontFamily: "inherit",
  padding: "0 0.3rem",
  fontSize: "inherit"
  // fontSize: "1.5em"
  // fontWeight: 400,
  // display: "inline",
});

const AyaArabic = ({ tajweedRule, text, index }) => {
  const { fontSizeArabic, selectItemFont } = useContext(SettingContext);

  const computedFontFamily = useMemo(() => {
    return selectItemFont === "Old Madina Mushaf"
      ? "Uthmanic Hafs"
      : selectItemFont;
  }, [selectItemFont]);

  const parsedText = useMemo(() => {
    return tajweedRule
      ? parse(tajweedMarker(tajweedRule, text))
      : parse(text);
  }, [tajweedRule, text]);

  return (
    <AyahContainer
      // variant="h4"
      component="p"
      fontsizearabic={fontSizeArabic}
      fontfamily={computedFontFamily}
      // sx={{textAlign: "justify"}}
    >
      {parsedText}
      <AyahNumber component="span">
        {index.toLocaleString("ar-EG")}
      </AyahNumber>
    </AyahContainer>
  );
};

export default AyaArabic;
