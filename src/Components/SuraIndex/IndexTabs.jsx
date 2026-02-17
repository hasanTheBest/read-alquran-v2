// import React, { useContext, useState } from "react";
// import SwipeableViews from "react-swipeable-views";
// import { IndexContext } from "../../Context/IndexContext";
// import {
//   AppBar,
//   Tabs,
//   Tab,
//   makeStyles,
//   useTheme,
//   Grid,
// } from "@mui/material";
// import TabPanel from "./TabPanel";
// import MetaIndex from "./MetaIndex";
// import SuraMeta from "./SuraMeta";

// import suraList from "../SuraInfo/data/suraMeta.json";
// import juzMeta from "./data/juzMeta.json";
// import hizbMeta from "./data/hizbMeta.json";
// import manzilsMeta from "./data/manzilsMeta.json";
// import pageMeta from "./data/pageMeta.json";
// import rukusMeta from "./data/rukusMeta.json";
// import sajdasMeta from "./data/sajdasMeta.json";

// const useStyles = makeStyles((theme) => ({
//   secondaryLight: {
//     backgroundColor: theme.palette.primary.light,
//     zIndex: theme.zIndex.drawer - 1,
//   },
//   justifyCenter: {
//     justifyContent: "center",
//   },
// }));

// const metaItem = ["Sura", "Page", "Juz", "Ruku", "Hizb", "Manzil", "Sajda"];

// const IndexTabs = () => {
//   // const {
//   //   tabValue,
//   //   handleChangeTab,
//   //   suraList,
//   //   pageMeta,
//   //   juzMeta,
//   //   rukusMeta,
//   //   hizbMeta,
//   //   sajdasMeta,
//   //   manzilsMeta,
//   // } = useContext(IndexContext);
//   const classes = useStyles();
//   const theme = useTheme();
//   const [tabValue, setTabValue] = useState(metaItem[0]);

//   const handleChangeTab = (value) => {
//     setTabValue(value);
//   };

//   const handleChangeIndex = (index) => {
//     setTabValue(index);
//   };

//   function a11yProps(index) {
//     return {
//       id: `quran-index-tab-${index}`,
//       "aria-controls": `quran-index-tabpanel-${index}`,
//     };
//   }

//   return (
//     <>
//       <AppBar position="sticky" className={classes.secondaryLight}>
//         <Tabs
//           value={tabValue}
//           onChange={(e, value) => handleChangeTab(value)}
//           // indicatorColor="primary"
//           textColor="primary"
//           aria-label="Tabs"
//           variant="scrollable"
//           scrollButtons="auto"
//           className={classes.tabs}
//         >
//           {metaItem.map((item, i) => (
//             <Tab
//               key={`${item}-${i.toString()}`}
//               index={i}
//               label={item}
//               value={item}
//               {...a11yProps(item)}
//             />
//           ))}
//         </Tabs>
//       </AppBar>

//       {/* <SwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={tabValue}
//         onChangeIndex={handleChangeIndex}
//       > */}
//       {metaItem.map((item, i) => (
//         <TabPanel
//           key={i.toString()}
//           value={tabValue}
//           index={item}
//           dir={theme.direction}
//         >
//           <Grid container spacing={5} justify="center">
//             {item === "Sura" && <SuraMeta suraList={suraList.suras.sura} />}

//             {item === "Page" && (
//               <MetaIndex metaInfo={pageMeta.pages.page} metaItem="Page" />
//             )}

//             {item === "Juz" && (
//               <MetaIndex metaInfo={juzMeta.juzs.juz} metaItem="Juz" />
//             )}

//             {item === "Hizb" && (
//               <MetaIndex metaInfo={hizbMeta.hizbs.quarter} metaItem="Hizb" />
//             )}

//             {item === "Ruku" && (
//               <MetaIndex metaInfo={rukusMeta.rukus.ruku} metaItem="Ruku" />
//             )}

//             {item === "Manzil" && (
//               <MetaIndex
//                 metaInfo={manzilsMeta.manzils.manzil}
//                 metaItem="Manzil"
//               />
//             )}

//             {item === "Sajda" && (
//               <MetaIndex metaInfo={sajdasMeta.sajdas.sajda} metaItem="Sajda" />
//             )}
//           </Grid>
//         </TabPanel>
//       ))}
//       {/* </SwipeableViews> */}
//     </>
//   );
// };
// export default IndexTabs;

import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Grid,
  Box,
  useTheme,
} from "@mui/material";

import TabPanel from "./TabPanel";
import MetaIndex from "./MetaIndex";
import SuraMeta from "./SuraMeta";

import suraList from "../SuraInfo/data/suraMeta.json";
import juzMeta from "./data/juzMeta.json";
import hizbMeta from "./data/hizbMeta.json";
import manzilsMeta from "./data/manzilsMeta.json";
import pageMeta from "./data/pageMeta.json";
import rukusMeta from "./data/rukusMeta.json";
import sajdasMeta from "./data/sajdasMeta.json";

const metaItem = [
  "Sura",
  "Page",
  "Juz",
  "Ruku",
  "Hizb",
  "Manzil",
  "Sajda",
];

const IndexTabs = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

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
          <Grid container spacing={5} justifyContent="center">
            {i === 0 && (
              <SuraMeta suraList={suraList.suras.sura} />
            )}

            {i === 1 && (
              <MetaIndex
                metaInfo={pageMeta.pages.page}
                metaItem="Page"
              />
            )}

            {i === 2 && (
              <MetaIndex
                metaInfo={juzMeta.juzs.juz}
                metaItem="Juz"
              />
            )}

            {i === 3 && (
              <MetaIndex
                metaInfo={rukusMeta.rukus.ruku}
                metaItem="Ruku"
              />
            )}

            {i === 4 && (
              <MetaIndex
                metaInfo={hizbMeta.hizbs.quarter}
                metaItem="Hizb"
              />
            )}

            {i === 5 && (
              <MetaIndex
                metaInfo={manzilsMeta.manzils.manzil}
                metaItem="Manzil"
              />
            )}

            {i === 6 && (
              <MetaIndex
                metaInfo={sajdasMeta.sajdas.sajda}
                metaItem="Sajda"
              />
            )}
          </Grid>
        </TabPanel>
      ))}
    </>
  );
};

export default React.memo(IndexTabs);
