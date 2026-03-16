import React, { useContext, useRef, useEffect, useCallback } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { SuraContext } from "../../Context/SuraContextProvider";
import AyaArabic from "./AyaArabic";

function PageVirtualLoader() {

  const { quranPages, pageId } = useContext(SuraContext);

  const pages = quranPages.slice(1)
  // console.log(pages[pageId - 1])

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

        if(!page) return null;

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
              {page.map(({ tajweed, text, verse_key }) => (
                <React.Fragment key={verse_key}>
                  <AyaArabic
                    tajweedRule={tajweed}
                    text={text}
                    index={Number(verse_key.split(":")[1])}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(PageVirtualLoader);