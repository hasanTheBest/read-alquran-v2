import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { SuraContext } from "./SuraContextProvider"
import { parseVerseKey } from "../Helper/pageBuilder"
import quranPages from "../assets/data/quranByPage.json"

export const MushafPageContext = createContext();

const MushafPageContextProvider = ({ children }) => {
  const { sura } = useContext(SuraContext)
  const { suraId: verseKey } = useParams(); // 2 or 2:20

  const { ayahId } = parseVerseKey(verseKey);

  const pageNumber = sura.aya[ayahId - 1]["page"];
  const pageAyahs = quranPages[pageNumber]

  

  return (
    <MushafPageContext.Provider
      value={pageAyahs}
    >
      {children}
    </MushafPageContext.Provider>
  );
};

export default MushafPageContextProvider;
