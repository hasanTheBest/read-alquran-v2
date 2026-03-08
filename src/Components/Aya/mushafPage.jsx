import React from "react"
import { useContext } from "react"
import { MushafPageContext } from "../../Context/MushafPageContextProvider"
import AyaArabic from "./AyaArabic"
import { Box } from "@mui/material"

function MushafPage() {
  const pageAyahs = useContext(MushafPageContext)

  return (
    <Box sx={{
      direction: "rtl",
      textAlign: "justify"
    }} >
      {
        pageAyahs.map(({ tajweed, text, verse_key }) => (
          <AyaArabic key={verse_key} tajweedRule={tajweed} text={text} index={Number(verse_key.split(":")[1])} />
        ))
      }
    </Box>
  )
}

export default MushafPage;
