import React, { useContext } from "react"
import { MushafPageContext } from "../../Context/MushafPageContextProvider"
import AyaArabic from "./AyaArabic"
import { Box } from "@mui/material"
import { parseVerseKey } from "../../Helper/pageBuilder"
import Bismillah from "../SuraInfo/Bismillah"
import ShowSuraName from "./ShowSuraName"
import PageMetaBarTop from "./PageMetaBarTop"

function MushafPage() {
  const pageAyahs = useContext(MushafPageContext)
  const pageId = pageAyahs[0]["page"]
  const juzzId = pageAyahs[0]["juz"]

  return (
    <Box
      sx={{
        direction: "rtl",
        textAlign: "justify",
      }}
    >
      <PageMetaBarTop pageId={pageId} juzzId={juzzId} />
      {pageAyahs.map(({ tajweed, text, verse_key }) => {
        const { surahId, ayahId } = parseVerseKey(verse_key)

        return (
          <React.Fragment key={verse_key}>
            <ShowSuraName surahId={surahId} ayahId={ayahId} />
            <Bismillah ayahId={ayahId} surahId={surahId} />
            <AyaArabic tajweedRule={tajweed} text={text} index={ayahId} />
          </React.Fragment>
        )
      })}
    </Box>
  )
}

export default MushafPage;
