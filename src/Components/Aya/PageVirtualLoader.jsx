import React, { useContext } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import AyaArabic from "./AyaArabic";
import { MushafPageContext } from "../../Context/MushafPageContextProvider";
import { SettingContext } from "../../Context/SettingsContext";
import MushafPage from "./mushafPage";
import PageMetaBarTop from "./PageMetaBarTop";
import { parseVerseKey } from "../../Helper/pageBuilder";
import ShowSuraName from "./ShowSuraName";
import Bismillah from "../SuraInfo/Bismillah";

function PageVirtualLoader() {

  const { quranPages } = useContext(MushafPageContext);
  const { readingMode } = useContext(SettingContext);

  const pages = quranPages.slice(1)

  const rowVirtualizer = useWindowVirtualizer({
    count: pages.length, // index
    estimateSize: () => 500, // average page height
    overscan: 2,
  });

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const page = pages[virtualRow.index];

        if (!page) return null;

        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
              padding: "20px",
            }}
          >
            <div
              style={{
                direction: "rtl",
                textAlign: "justify",
              }}
            >
              <PageMetaBarTop pageId={page[0]["page"]} juzzId={page[0]["juz"]} />

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
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(PageVirtualLoader);