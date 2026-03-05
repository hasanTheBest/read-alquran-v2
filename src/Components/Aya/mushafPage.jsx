import React from "react"
import { useContext } from "react"
import { MushafPageContext } from "../../Context/MushafPageContextProvider"

function MushafPage() {
  const pageAyahs  = useContext(MushafPageContext)
  
  console.log("pageAyahs", pageAyahs)

  return (
    <React.Fragment>
      { 
      pageAyahs.map(({ tajweed, text, verse_key }) => (
        <React.Fragment key={verse_key}>
          <AyaArabic tajweedRule={tajweed} text={text} index={Number(verse_key.split(":")[1])} />
        </React.Fragment>
      ))
      }
    </React.Fragment>
  )
}

export default MushafPage;
