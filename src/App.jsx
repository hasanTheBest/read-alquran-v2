import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
// import WebfontLoader from "@dr-kobros/react-webfont-loader";
import theme from "./theme";
import SettingProvider from "./Context/SettingsContext";
import Footer from "./Components/Footer/Footer";
import "./App.css"
import Loading from "./Components/Loading";
import MushafPageContextProvider from "./Context/MushafPageContextProvider";
// import "../public/fonts/aya/custom-font.css"

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
          <Suspense fallback={<Loading />}>
            <MushafPageContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page/:pageId" element={<Sura />} />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </MushafPageContextProvider>
            <Footer />
          </Suspense>
        </SettingProvider>
      </Router>
      {/* </WebfontLoader> */}
    </ThemeProvider>
  );
}

export default App;
