import { useContext } from "react"
import { mushafPageContext } from "../../Context/MushafPageContextProvider"
export default function mushafPage() {
  const { pageAyahs } = useContext(mushafPageContext)

  return (
    <React.Fragment>

      {pageAyahs.map(({ tajweed, text, verse_key }) => (
        <React.Fragment key={verse_key}>
          <AyaArabic tajweedRule={tajweed} text={text} index={Number(verse_key.split(":")[1])} />
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}
