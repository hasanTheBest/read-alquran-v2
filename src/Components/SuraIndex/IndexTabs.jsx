import React, { useContext, useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Grid,
  useTheme,
} from "@mui/material";

import TabPanel from "./TabPanel";
import MetaIndex from "./MetaIndex";

import { MushafPageContext } from "../../Context/MushafPageContextProvider";

const metaItem = [
  "Sura",
  "Page",
  "Juz",
  "Ruku",
  "Hizb",
  "Manzil",
  "Sajda",
];

// const metaIndexArray = [
//   <SuraMeta suraList={suraList.suras.sura} />,
//   <MetaIndex
//     metaInfo={pageMeta.pages.page}
//     metaItem="Page"
//   />,
//   <MetaIndex
//     metaInfo={juzMeta.juzs.juz}
//     metaItem="Juz"
//   />,
//   <MetaIndex
//     metaInfo={rukusMeta.rukus.ruku}
//     metaItem="Ruku"
//   />,
//   <MetaIndex
//     metaInfo={hizbMeta.hizbs.quarter}
//     metaItem="Hizb"
//   />,
//   <MetaIndex
//     metaInfo={manzilsMeta.manzils.manzil}
//     metaItem="Manzil"
//   />,
//   <MetaIndex
//     metaInfo={sajdasMeta.sajdas.sajda}
//     metaItem="Sajda"
//   />
// ]

const IndexTabs = () => {
  const { sajdasMeta, rukusMeta, pageMeta, manzilsMeta, juzMeta, suraMeta, hizbMeta } = useContext(MushafPageContext)
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const metaInfo =
  {
    "Page": pageMeta,
    "Juz": juzMeta,
    "Ruku": rukusMeta,
    "Hizb": hizbMeta,
    "Manzil": manzilsMeta,
    "Sajda": sajdasMeta,
    "Sura": suraMeta
  }



  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const a11yProps = (index) => ({
    id: `quran-index-tab-${index}`,
    "aria-controls": `quran-index-tabpanel-${index}`,
  });

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "primary.light",
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Quran Index Tabs"
        >
          {metaItem.map((item, i) => (
            <Tab
              key={item}
              label={item}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
      </AppBar>

      {metaItem.map((item, i) => (
        <TabPanel
          key={item}
          value={tabValue}
          index={i}
          dir={theme.direction}
        >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {<MetaIndex metaInfo={metaInfo[item]} metaItem={item} />}
          </Grid>
        </TabPanel>
      ))}
    </>
  );
};

export default React.memo(IndexTabs);
