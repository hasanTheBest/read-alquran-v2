import React, { useContext, useEffect, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import AyaArabic from "./AyaArabic";
import { MushafPageContext } from "../../Context/MushafPageContextProvider";
import { SettingContext } from "../../Context/SettingsContext";
import MushafPage from "./mushafPage";
import PageMetaBarTop from "./PageMetaBarTop";
import { parseVerseKey } from "../../Helper/pageBuilder";
import ShowSuraName from "./ShowSuraName";
import Bismillah from "../SuraInfo/Bismillah";
import { useNavigate, useParams } from "react-router-dom";

function PageVirtualLoader() {

  const { quranPages } = useContext(MushafPageContext);
  const { readingMode } = useContext(SettingContext);
  const { pageId: urlPage } = useParams()
  const navigate = useNavigate()
  const lastPageRef = useRef(null)

  const pages = quranPages.slice(1)

  const pageFromUrl = Number(urlPage) || 1;

  const rowVirtualizer = useWindowVirtualizer({
    count: pages.length, // index
    estimateSize: () => 500, // average page height
    overscan: 2,
    initialScrollOffset: (pageFromUrl - 1) * 500, // jump to pageFromUrl
    onChange: (instance) => {
      const virtualItems = instance.getVirtualItems()

      if (!virtualItems.length) return

      // find item closest to top of viewport
  const firstVisible = virtualItems.find(item => item.start >= instance.scrollOffset)
    || virtualItems[0];

  const currentPage = firstVisible.index + 1;

      if (lastPageRef.current !== currentPage) {
        lastPageRef.current = currentPage

        navigate(`/page/${currentPage}`, { replace: true })
      }
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pageFromUrl > 0) {
        rowVirtualizer.scrollToIndex(pageFromUrl - 1, {
          align: "start"
        })
      }
    }, 0)

    return () => clearTimeout(timeout)

  }, [pageFromUrl])

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