import pageMeta from '../Components/SuraIndex/data/pageMeta.json'
import useSuspenseFetch from '../Hooks/useSuspenseFetch';

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

export function getSuraAyahsCountFromPage(pageNumber) {
  // suras belongs to the page
  const currentPage = pageMeta.pages.page[pageNumber - 1]
  const nextPage = pageMeta.pages.page[pageNumber]
  const { sura: currentPageSura, aya: currentPageAya } = currentPage
  const { sura: nextPageSura, aya: nextPageAya } = nextPage 

  const suraToRetrieve = [];
  const ayahToRetrieve = [];

// Case 1: No next page → return last 3 surahs
  if (!nextPage) {
    suraToRetrieve.push(112, 113, 114);
    ayahToRetrieve.push("-", "-", "-");
    return { suraToRetrieve, ayahToRetrieve };
  }

  const currentSura = Number(currentPageSura);
  const nextSura = Number(nextPageSura);
  const currentAya = Number(currentPageAya);
  const nextAya = Number(nextPageAya);

    // Case 2: Same surah → difference in ayahs
  if (currentSura === nextSura) {
    suraToRetrieve.push(currentSura);
    ayahToRetrieve.push(`${currentAya}-${nextAya}`); // "20-26"
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
}

// export function getAyahs(suraIds, ayahToRetrieve) {
//   const pageAyahs = [];

//   for (const id of suraIds) {
//     const sura = useSuspenseFetch("default", id);
//     const ayahs = sura.aya;

//     console.log(ayahToRetrieve)

//     // Case: "-", "2-", "-40", "20-26"
//     const [startStr, endStr] = (ayahToRetrieve || "-").split("-");

//     const start = startStr ? Number(startStr) - 1 : 0;
//     const end = endStr ? Number(endStr) : ayahs.length;

//     pageAyahs.push(...ayahs.slice(start, end));
//   }

//   return pageAyahs;
// }

export async function getAyahs(suraIds, ayahToRetrieve) {

  const [startStr, endStr] = (ayahToRetrieve || "-").split("-");
  const start = startStr ? Number(startStr) - 1 : 0;
  console.log("start end", start, end)

  const suras = await Promise.all(
    suraIds.map((id) => useSuspenseFetch("default", id))
  );

  return suras.flatMap((sura) => {
    const ayahs = sura.aya;
    const end = endStr ? Number(endStr) : ayahs.length;
    return ayahs.slice(start, end);
  });
}

