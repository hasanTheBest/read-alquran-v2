import React, { useContext, useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SuraContext } from "../../Context/SuraContextProvider";
import AyaRenderSingle from "./AyaRenderSingle";

function AyaVirtualLoader() {
  const { sura, ayaOfSura } = useContext(SuraContext);
  // const { suraAya } = useParams(); // example: "2:25"

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: sura?.aya?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // average aya height (tune if needed)
    overscan: 4,
  });

  // Dynamic aya resizing
  const measureRef = useCallback((el) => {
    if (!el) return;

    rowVirtualizer.measureElement(el);

    const resizeObserver = new ResizeObserver(() => {
      rowVirtualizer.measureElement(el);
    });

    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [rowVirtualizer]);

  // 🔥 Scroll to specific aya when ayaOfSura changes
  useEffect(() => {
    // if (!suraAya) return;
   if (
      typeof ayaOfSura === "number" &&
      ayaOfSura >= 1 &&
      ayaOfSura <= sura?.aya?.length
    ) {
      // console.log("ayaOfSura =>", ayaOfSura)
      rowVirtualizer.scrollToIndex(ayaOfSura - 1, {
        align: "start",
        behavior: "auto", // use "smooth" if needed
      });
    }
  }, [ayaOfSura, sura?.aya?.length, rowVirtualizer]);

  if (!sura?.aya?.length) return null;

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

        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const aya = sura.aya[virtualRow.index];

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={measureRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <AyaRenderSingle content={aya} />
            </div>
          );
        })}
      </div>
    </div>

  );
}

export default React.memo(AyaVirtualLoader);
