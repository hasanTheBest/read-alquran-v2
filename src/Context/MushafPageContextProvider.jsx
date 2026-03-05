import React, { createContext, useContext } from "react";

// import suraList from "../Components/SuraInfo/data/suraMeta.json";
import { useParams } from "react-router-dom";
import {SuraContext} from "./SuraContextProvider"
import {getSuraAyahsCountFromPage, getAyahs, parseVerseKey} from "../Helper/pageBuilder"

export const mushafPageContext = createContext();

const MushafPageContextProvider = ({ children }) => {
  const {sura} = useContext(SuraContext)
  const {suraId: verseKey} = useParams(); // 2 or 2:20

  const { ayahId} = parseVerseKey(verseKey)

  const pageNumber = sura.aya[ayahId - 1]["page"]
   const {suraToRetrieve, ayahToRetrieve} = getSuraAyahsCountFromPage(pageNumber) // sura [112, 12] ayah [5, 10]

   const pageAyahs = getAyahs(suraToRetrieve, ayahToRetrieve)


  return (
    <MushafPageContext.Provider
      value={{
        pageAyahs
      }}
    >
      {children}
    </MushafPageContext.Provider>
  );
};

export default MushafPageContextProvider;
