import React from "react"
import { Box, Typography, useTheme } from '@mui/material'
import pageToSuraAya from '../../assets/data/pageToSuraAya.json'
import { parseVerseKey } from '../../Helper/pageBuilder'

function getSuraIds(pageId) {
  const suraAyaIds = pageToSuraAya[pageId]
  const { surahId: start } = parseVerseKey(suraAyaIds[0])
  const { surahId: end } = parseVerseKey(suraAyaIds[suraAyaIds.length - 1])

  const ids = []

  if (start === end) {
    ids.push(start)
    return ids;
  }

  for (let i = end; i >= start; i--) { ids.push(i) }

  return ids;
}

function PageMetaBarTop({ pageId, juzzId }) {
  const muiTheme = useTheme()
  const suraIds = getSuraIds(pageId)
  const suraNames = suraIds.map((id) => (
    <span key={id}>surah{`${String(id).padStart(3, 0)}`}</span>
  ))
  return (
    <Box sx={{
      display: "flex",
      direction: "rtl",
      textAlign: "right",
      justifyContent: "space-between",
      borderBottom: `2px solid ${muiTheme.palette.secondary.light}`,
      fontSize: muiTheme.typography.h4.fontSize,
      lineHeight: 1,
      padding: "1.5rem .3rem .3rem"
    }}>
      <Box sx={{
        fontFamily: "juzName",
        fontSize: muiTheme.typography.h5.fontSize,
      }}>
        <span>j{`${String(juzzId).padStart(3, 0)}`}</span>
        <span>juz{`${String(juzzId).padStart(3, 0)}`}</span>
      </Box>
      <Box sx={{
        fontFamily: "surahNameV2",
      }}>{suraNames}</Box>
    </Box>
  )
}

export default React.memo(PageMetaBarTop)