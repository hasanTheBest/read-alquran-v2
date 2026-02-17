import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
// import WebfontLoader from "@dr-kobros/react-webfont-loader";

import theme from "./theme";
import SettingProvider from "./Context/SettingsContext";

const Home = lazy(() => import("./Containers/Home"));
const Sura = lazy(() => import("./Containers/Sura"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <WebfontLoader
        config={{
          custom: {
            families: ["read-alquran", "me_quran"],
            urls: [
              "/fonts/sura_names/read_alquran.css",
              "/fonts/aya/custom-font.css",
            ],
          },
        }}
      > */}
        <Router>
          <SettingProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sura/:suraId" element={<Sura />} />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </Suspense>
          </SettingProvider>
        </Router>
      {/* </WebfontLoader> */}
    </ThemeProvider>
  );
}

export default App;
