import React, { useContext, useMemo } from "react";
import { SettingContext } from "../../Context/SettingsContext";
import AyaArabic from "./AyaArabic";
import GenerateAyaFromWords from "./GenerateAyaFromWords";
import ShowTranslation from "./trans/ShowTranslation";

function AyaWrapper({
  text,
  tajweed,
  ayaNum,
  words,
  page,
  translation,
}) {
  const {
    showAya,
    showTranslation,
    showTransliteration,
    showTajweed,
    selectItemFont,
    ayaTranslation,
  } = useContext(SettingContext);

  const isOldMushaf = selectItemFont === "Old Madina Mushaf";

  const selectedTranslation = useMemo(() => {
    if (ayaTranslation === "Mojibor Rahman") {
      return { text: translation?.bn, locale: "bn" };
    }
    return { text: translation?.en, locale: "en" };
  }, [ayaTranslation, translation]);

  return (
    <div style={{textAlign: "right"}}>
      {/* Arabic Aya */}
      {showAya && !isOldMushaf && (
        <AyaArabic
          tajweedRule={showTajweed ? tajweed : null}
          text={text}
          index={ayaNum}
        />
      )}

      {/* Old Madina Mushaf Render */}
      {isOldMushaf && (
        <GenerateAyaFromWords words={words} page={page} />
      )}

      {/* Transliteration */}
      {showTransliteration && translation?.trl && (
        <ShowTranslation
          translation={translation.trl}
          locale="en"
          index={ayaNum}
        />
      )}

      {/* Translation */}
      {showTranslation && selectedTranslation.text && (
        <ShowTranslation
          translation={selectedTranslation.text}
          locale={selectedTranslation.locale}
          index={ayaNum}
        />
      )}
    </div>
  );
}

export default React.memo(AyaWrapper);
