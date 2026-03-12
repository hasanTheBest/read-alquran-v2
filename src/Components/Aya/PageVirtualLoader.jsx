import React, { useContext, useRef, useEffect, useCallback } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { SuraContext } from "../../Context/SuraContextProvider";
import AyaArabic from "./AyaArabic";

function PageVirtualLoader() {

  const { quranPages, pageId } = useContext(SuraContext);

  const pages = React.useMemo(() => quranPages.slice(1));
  console.log(pages[pageId - 1])

  const rowVirtualizer = useWindowVirtualizer({
    count: pages.length, // index
    estimateSize: () => 600, // average page height
    overscan: 3,
  });

  // default page
  useEffect(() => {

    rowVirtualizer.scrollToIndex(pageId - 1, { align: "start" }); // index start with 0

  }, [pageId]);


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
        console.log("page", page)

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