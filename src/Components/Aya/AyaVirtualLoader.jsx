// import React, { useContext, useState } from "react";
// import {
//   AutoSizer,
//   CellMeasurer,
//   CellMeasurerCache,
//   List as VList,
//   WindowScroller,
// } from "react-virtualized";
// import { SuraContext } from "../../Context/SuraContextProvider";
// import AyaRenderSingle from "./AyaRenderSingle";

// const AyaVirtualLoader = () => {
//   const { sura, ayaOfSura } = useContext(SuraContext);
//   // const [scrollToIndex, setScrollToIndex] = useState(-1)
//   // console.log("AyaVirtualLoader -> ayaOfSura", ayaOfSura);

//   let scrollToIndex = ayaOfSura;
//   const setScrollToIndex = ({ scrollTop, scrollLeft }) => {
//     console.log("setScrollToIndex -> scrollLeft", scrollLeft);
//     console.log("setScrollToIndex -> scrollTop", scrollTop);
//   };

//   const cache = new CellMeasurerCache({
//     defaultHeight: 70,
//     minHeight: 35,
//     fixedWidth: true,
//   });

//   const rowRenderer = ({ index, key, style, parent }) => {
//     const eachAya = sura.aya[index];

//     const content = <AyaRenderSingle content={eachAya} />;

//     return (
//       <CellMeasurer
//         cache={cache}
//         parent={parent}
//         columnIndex={0}
//         rowIndex={index}
//         key={key}
//       >
//         {({ registerChild }) => (
//           <div ref={registerChild} style={style}>
//             {content}
//           </div>
//         )}
//       </CellMeasurer>
//     );
//   };

//   return (
//     <>
//       {console.log(Number(ayaOfSura))}
//       <WindowScroller onScroll={setScrollToIndex}>
//         {({ height, isScrolling, scrollTop, onChildScroll, registerChild }) => (
//           <div ref={registerChild} style={{ width: "100%" }}>
//             <AutoSizer disableHeight>
//               {({ width }) => (
//                 <VList
//                   autoHeight
//                   isScrolling={isScrolling}
//                   scrollTop={scrollTop}
//                   rowRenderer={rowRenderer}
//                   deferredMeasurementCache={cache}
//                   width={width}
//                   height={height}
//                   onScroll={onChildScroll}
//                   rowCount={sura.aya.length}
//                   rowHeight={cache.rowHeight}
//                   scrollToAlignment="start"
//                   scrollToIndex={50}
//                 />
//               )}
//             </AutoSizer>
//           </div>
//         )}
//       </WindowScroller>
//     </>
//   );
// };

// export default AyaVirtualLoader;

import React, { useContext, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SuraContext } from "../../Context/SuraContextProvider";
import AyaRenderSingle from "./AyaRenderSingle";

function AyaVirtualLoader() {
  const { sura, ayaOfSura } = useContext(SuraContext);

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: sura?.aya?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // average aya height (tune if needed)
    overscan: 8,
  });

  // 🔥 Scroll to specific aya when ayaOfSura changes
  useEffect(() => {
    if (
      typeof ayaOfSura === "number" &&
      ayaOfSura >= 0 &&
      ayaOfSura < (sura?.aya?.length ?? 0)
    ) {
      rowVirtualizer.scrollToIndex(ayaOfSura, {
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
        height: "calc(100vh - 64px)", // adjust if header exists
        width: "100%",
        overflow: "auto",
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
              ref={rowVirtualizer.measureElement}
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
