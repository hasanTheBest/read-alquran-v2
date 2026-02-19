// import React from "react";
// import {
//   AutoSizer,
//   CellMeasurer,
//   CellMeasurerCache,
//   InfiniteLoader,
//   List as VList,
//   WindowScroller,
// } from "react-virtualized";
// import AyaRenderSingle from "./AyaRenderSingle";

// function AyaInfiniteLoaderWrapper({
//   list,
//   // hasNextPage,
//   // isNextPageLoading,
//   // loadNextPage,
// }) {
//   // const rowCount = hasNextPage ? list.length + 1 : list.length;
//   // const loadMoreRows = loadNextPage;
//   // const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

//   const cache = new CellMeasurerCache({
//     defaultHeight: 70,
//     minHeight: 35,
//     fixedWidth: true,
//   });

//   const rowRenderer = ({ index, key, style, parent }) => {
//     const eachAya = list[index];

//     // const content = !isRowLoaded({ index }) ? (
//     //   "Loading...."
//     // ) : (
//     //   <AyaRenderSingle content={eachAya} />
//     // );

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
//     <WindowScroller>
//       {({ height, isScrolling, scrollTop, registerChild }) => (
//         <div ref={registerChild} style={{ width: "100%" }}>
//           {/* <InfiniteLoader
//             isRowLoaded={isRowLoaded}
//             loadMoreRows={loadNextPage}
//             rowCount={rowCount}
//           > */}
//           {/* {({ onRowsRendered, registerChild }) => ( */}
//           <AutoSizer disableHeight>
//             {({ width }) => (
//               <VList
//                 autoHeight
//                 // onRowsRendered={onRowsRendered}
//                 isScrolling={isScrolling}
//                 scrollTop={scrollTop}
//                 rowRenderer={rowRenderer}
//                 width={width}
//                 height={height}
//                 rowCount={list.length}
//                 rowHeight={cache.rowHeight}
//                 scrollToIndex={50}
//               />
//             )}
//           </AutoSizer>
//           {/* )} */}
//           {/* </InfiniteLoader> */}
//         </div>
//       )}
//     </WindowScroller>
//   );
// }

// export default AyaInfiniteLoaderWrapper;

import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import AyaRenderSingle from "./AyaRenderSingle";

function AyaVirtualList({ list }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // average aya height
    overscan: 6,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: "100vh",
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
          const aya = list[virtualRow.index];

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

export default React.memo(AyaVirtualList);
