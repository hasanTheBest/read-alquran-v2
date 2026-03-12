import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import useSuspenseFetch from "../Hooks/useSuspenseFetch";
import quranPages from "../assets/data/quranByPage.json"
import { parseVerseKey } from "../Helper/pageBuilder";
import verseKeyToPage from "../assets/data/suraAyaToPage.json"

export const SuraContext = createContext();

const SuraContextProvider = ({ children }) => {
  const { suraId: verseKey } = useParams(); // 2 or 2:20
  const { surahId: suraId, ayahId } = parseVerseKey(verseKey);
  const [ayaOfSura, setAyaOfSura] = useState(ayahId);

  const pageId = verseKeyToPage[`${suraId}:${ayahId}`];

  const sura = useSuspenseFetch("default", suraId);

  const value = {
    ayaCount: sura.aya.length,
    suraId,
    sura,
    ayaOfSura,
    setAyaOfSura,
    quranPages,
    pageId,
    verseKeyToPage
  };

  return <SuraContext.Provider value={value}>{children}</SuraContext.Provider>;
};

export default SuraContextProvider;
