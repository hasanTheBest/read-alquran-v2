import React from "react"
import AyaArabic from "./AyaArabic"
import { parseVerseKey } from "../../Helper/pageBuilder"
import Bismillah from "../SuraInfo/Bismillah"
import ShowSuraName from "./ShowSuraName"
import PageMetaBarTop from "./PageMetaBarTop"

function MushafPage({ page }) {
  const pageId = page[0]["page"]
  const juzzId = page[0]["juz"]

  return (
    // <Box
    //   sx={{
    //     direction: "rtl",
    //     textAlign: "justify",
    //   }}
    // >
    <>
      <PageMetaBarTop pageId={pageId} juzzId={juzzId} />
      {page.map(({ tajweed, text, verse_key }) => {
        const { surahId, ayahId } = parseVerseKey(verse_key)

        return (
          <React.Fragment key={verse_key}>
            <ShowSuraName surahId={surahId} ayahId={ayahId} />
            <Bismillah ayahId={ayahId} surahId={surahId} />
            <AyaArabic tajweedRule={tajweed} text={text} index={ayahId} />
          </React.Fragment>
        )
      })}
    </>
    // </Box>
  )
}

export default MushafPage;
