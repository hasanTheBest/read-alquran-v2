import React, { useContext, useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SuraContext } from "../../Context/SuraContextProvider";
import AyaArabic from "./AyaArabic";

function groupAyatIntoPages(ayat, ayatPerPage = 15) {
  const pages = [];
  for (let i = 0; i < ayat.length; i += ayatPerPage) {
    pages.push(ayat.slice(i, i + ayatPerPage));
  }
  return pages;
}

function pageVirtualLoader() {

  const { sura } = useContext(SuraContext);
  const parentRef = useRef(null);

  console.log(sura)

  const pages = groupAyatIntoPages(sura?.aya ?? [], 15);

  const rowVirtualizer = useVirtualizer({
    count: pages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 600, // average page height
    overscan: 2,
  });


  return (
    <div
      ref={parentRef}
      style={{
        height: "calc(100vh - 200px)", // adjust if header exists
        width: "100%",
        overflow: "auto",
        position: "relative"
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {
          rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const page = pages[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
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
                    fontSize: "28px",
                    lineHeight: 2,
                    fontFamily: "Amiri Quran",
                    textAlign: "justify",
                  }}
                >
                  {page.map(({tajweed, text, verse_key}) => (
                    <span key={verse_key}>
                      <AyaArabic tajweedRule={tajweed} text={text} index={Number(verse_key.split(":")[1])} />
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default React.memo(pageVirtualLoader);
