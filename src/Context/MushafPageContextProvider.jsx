import React, { createContext, useContext, useEffect, useState } from "react";
// import suraList from "../Components/SuraInfo/data/suraMeta.json";
import { useParams } from "react-router-dom";
import { SuraContext } from "./SuraContextProvider"
import { getSuraAyahsCountFromPage, getAyahs, parseVerseKey } from "../Helper/pageBuilder"

export const MushafPageContext = createContext();

const MushafPageContextProvider = ({ children }) => {
  const { sura } = useContext(SuraContext)
  const { suraId: verseKey } = useParams(); // 2 or 2:20

  const [pageAyahs, setPageAyahs] = useState([]);

  const { ayahId } = parseVerseKey(verseKey);

  const pageNumber = sura.aya[ayahId - 1]["page"];

  const { suraToRetrieve, ayahToRetrieve } =
    getSuraAyahsCountFromPage(pageNumber);

  ayahToRetrieve

  useEffect(() => {
    async function loadPage() {
      const pageNumber = sura.aya[ayahId - 1]["page"];

      const { suraToRetrieve, ayahToRetrieve } =
        getSuraAyahsCountFromPage(pageNumber);

      const ayahs = await getAyahs(suraToRetrieve, ayahToRetrieve);

      setPageAyahs(ayahs);
    }

    if (sura) loadPage();
  }, [sura, ayahId]);


  console.log("context page ayahs", pageAyahs)

  return (
    <MushafPageContext.Provider
      value={pageAyahs}
    >
      {children}
    </MushafPageContext.Provider>
  );
};

export default MushafPageContextProvider;
