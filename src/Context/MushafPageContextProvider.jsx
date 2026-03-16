import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { parseVerseKey } from "../Helper/pageBuilder"

import quranPages from "../assets/data/quranByPage.json"
import suraAyaToPage from "../assets/data/suraAyaToPage.json"
import pageToSuraAya from "../assets/data/pageToSuraAya.json"

import hizbMeta from "../assets/data/hizbMeta.json"
import juzMeta from "../assets/data/juzMeta.json"
import manzilsMeta from "../assets/data/manzilsMeta.json"
import pageMeta from "../assets/data/pageMeta.json"
import rukusMeta from "../assets/data/rukusMeta.json"
import sajdasMeta from "../assets/data/sajdasMeta.json"
import suraMeta from "../assets/data/suraMeta.json"

export const MushafPageContext = createContext();

const MushafPageContextProvider = ({ children }) => {
  const [ayaOfSura, setAyaOfSura] = useState(1)
  const { pageId } = useParams();
  const pageAyahs = quranPages[pageId]

  const contextValues = {
    ayaOfSura, 
    setAyaOfSura,
    pageAyahs,
    suraAyaToPage,
    pageToSuraAya,
    quranPages,
    sajdasMeta: sajdasMeta.sajdas.sajda,
    rukusMeta: rukusMeta.rukus.ruku,
    hizbMeta:  hizbMeta.hizbs.quarter,
    pageMeta: pageMeta.pages.page,
    manzilsMeta: manzilsMeta.manzils.manzil,
    juzMeta: juzMeta.juzs.juz,
    suraMeta: suraMeta.suras.sura,
  }

  return (
    <MushafPageContext.Provider
      value={{...contextValues}}
    >
      {children}
    </MushafPageContext.Provider>
  );
};

export default MushafPageContextProvider;
