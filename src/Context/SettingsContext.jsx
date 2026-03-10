import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
} from "react";

export const SettingContext = createContext(null);

const SettingProvider = ({ children }) => {
  // UI State
  const [openDrawer, setOpenDrawer] = useState(false);
  const [readingMode, setReadingMode] = useState(false);

  // Switch State
  const [stateSwitch, setSwitchState] = useState({
    showWbw: true,
    showWbwTransliteration: false,
    showWbwTranslation: true,
    showAya: true,
    showTajweed: true,
    showTranslation: true,
    showTransliteration: false,
  });

  // Slider State
  const [stateSlider, setSliderState] = useState({
    fontSizeArabic: 25,
    fontSizeTranslation: 14,
  });

  // Select State
  const [stateSelect, setSelectState] = useState({
    selectItemFont: "QPCHafs",
    wordTranslation: "word-tr-bangla",
    ayaTranslation: "Mojibor Rahman",
    ayaRecitation: "Omar Hisham Farabi",
  });

  // -------------------------
  // Handlers (memoized)
  // -------------------------

  const toggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const toggleReadingMode = useCallback(() => {
    setReadingMode((prev) => !prev);
  }, []);

  const setSwitchValue = useCallback((event) => {
    const { name, checked } = event.target;

    setSwitchState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }, []);

  const setFontSize = useCallback((value, type) => {
    setSliderState((prev) => ({
      ...prev,
      ...(type === "arabic"
        ? { fontSizeArabic: value }
        : { fontSizeTranslation: value }),
    }));
  }, []);

  const setSelectItemValue = useCallback((event, key) => {
    const value = event?.target?.value ?? event;

    setSelectState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // -------------------------
  // Memoized Context Value
  // -------------------------

  const contextValue = useMemo(
    () => ({
      ...stateSwitch,
      ...stateSlider,
      ...stateSelect,
      openDrawer,
      readingMode,
      toggleDrawer,
      toggleReadingMode,
      setSwitchValue,
      setFontSize,
      setSelectItemValue,
    }),
    [
      stateSwitch,
      stateSlider,
      stateSelect,
      openDrawer,
      readingMode,
      toggleDrawer,
      toggleReadingMode,
      setSwitchValue,
      setFontSize,
      setSelectItemValue,
    ]
  );

  return (
    <SettingContext.Provider value={contextValue}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;