import pageMeta from '../Components/SuraIndex/data/pageMeta.json'

export function parseVerseKey(verseKey) {
  const [surahId, ayahId = 1] = verseKey.split(":");
  return {
    surahId: Number(surahId),
    ayahId: Number(ayahId)
  };
}

export async function getPageFromVerse(verseKey, anchoringSura) {
  const { surahId, ayahId } = parseVerseKey(verseKey);

  // const surah = await import(`./sura/default/${surahId}.json`);

  const ayah = anchoringSura.default.aya.find(
    (a) => Number(a.a_id) === ayahId
  );

  return Number(ayah.page);
}

export async function getSuraAyahsFromPage(pageNumber) {

  // suras belongs to the page
  const currentPage = pageMeta.pages.page[pageNumber - 1]
  const nextPage = pageNumber !== 114 && pageMeta.pages.page[pageNumber]

  const { sura: currentPageSura, aya: currentPageAya } = currentPage
  const { sura: nextPageSura, aya: nextPageAya } = nextPage && nextPage

  const suraToRetrieve = [];
  const ayahToRetrieve = [];

  const currentSura = Number(currentPageSura);
  const nextSura = Number(nextPageSura);
  const currentAya = Number(currentPageAya);
  const nextAya = Number(nextPageAya);

  // Case 1: No next page → return last 3 surahs
  if (!nextPage) {
    suraToRetrieve.push(112, 113, 114);
    ayahToRetrieve.push("-", "-", "-");
    return { suraToRetrieve, ayahToRetrieve };
  }

  // Case 2: Same surah → difference in ayahs
  if (currentSura === nextSura) {
    suraToRetrieve.push(currentSura);
    ayahToRetrieve.push(nextAya - currentAya);
    return { suraToRetrieve, ayahToRetrieve };
  }

  // Case 3: Multiple surahs
  if (currentSura < nextSura) {
    // First surah (from current aya to end)
    suraToRetrieve.push(currentSura);
    ayahToRetrieve.push(`${currentAya}-`);

    // Middle + last surahs
    for (let sura = currentSura + 1; sura <= nextSura; sura++) {
      suraToRetrieve.push(sura);

      if (sura === nextSura) {
        // Last surah → from beginning to nextAya
        ayahToRetrieve.push(`-${nextAya}`);
      } else {
        // Full surah
        ayahToRetrieve.push("-");
      }
    }
  }

  return { suraToRetrieve, ayahToRetrieve };


  const posibleSuraIds = Array.from({ length: 3 }, (_, i) => i + 1);

  let pageAyahs = [];

  for (let id of posibleSuraIds) {
    const surah = await import(`./data/surah/${id}.json`);

    const filtered = surah.default.aya.filter(
      (a) => Number(a.page) === pageNumber
    );

    if (filtered.length > 0) {
      pageAyahs.push(...filtered);
    }
  }

  return pageAyahs;
}