import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { parseVerseKey } from "../Helper/pageBuilder"
import quranPages from "../assets/data/quranByPage.json"
import verseKeyToPage from "../assets/data/suraAyaToPage.json"

export const MushafPageContext = createContext();

const MushafPageContextProvider = ({ children }) => {
  const { suraId: verseKey } = useParams(); // 2 or 2:20

  const { surahId, ayahId } = parseVerseKey(verseKey);

  const pageNumber = verseKeyToPage[`${surahId}:${ayahId}`];
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
