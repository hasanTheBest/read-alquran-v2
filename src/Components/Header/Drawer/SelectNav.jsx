import React, { useContext, useCallback } from "react";
import { Box } from "@mui/material";
import { SettingContext } from "../../../Context/SettingsContext";
import SelectItem from "./SelectNav/SelectItem";

const SelectNav = () => {
  const {
    selectItemFont,
    ayaTranslation,
    ayaRecitation,
    wordTranslation,
    setSelectItemValue,
  } = useContext(SettingContext);

  const handleChange = useCallback(
    (event) => {
      const { name } = event.target;
      setSelectItemValue(event, name);
    },
    [setSelectItemValue]
  );

  return (
    <Box sx={{ p: 2 }}>
      <SelectItem
        itemName="Font"
        selectItemName="selectItemFont"
        selectItemValue={selectItemFont}
        handleChangeSelectItem={handleChange}
        options={[
          "Uthmanic Hafs",
          "me_quran",
          "Uthmanic TN",
          "KFGQPC Uthman Taha Naskh",
          "Old Madina Mushaf",
          "Noore Hidayat",
          "Nafees Nastaleeq",
        ]}
      />

      <SelectItem
        itemName="Translation (Word)"
        selectItemName="wordTranslation"
        selectItemValue={wordTranslation}
        handleChangeSelectItem={handleChange}
        options={[
          { value: "word-tr-bangla", label: "Bangla" },
          { value: "word-tr-english", label: "English" },
        ]}
      />

      <SelectItem
        itemName="Translation"
        selectItemName="ayaTranslation"
        selectItemValue={ayaTranslation}
        handleChangeSelectItem={handleChange}
        groupedOptions={[
          {
            label: "Default",
            options: [
              { value: "Mojibor Rahman", label: "Mojibor Rahman (Bangla)" },
              {
                value: "Saheeh International",
                label: "Saheeh International (English)",
              },
            ],
          },
        ]}
      />

      <SelectItem
        itemName="Recitation"
        selectItemName="ayaRecitation"
        selectItemValue={ayaRecitation}
        handleChangeSelectItem={handleChange}
        options={[
          { value: "Mishr Al Afasy", label: "Mishr Al Afasy", disabled: true },
          {
            value: "Omar Hisham Farabi",
            label: "Omar Hisham Farabi",
            disabled: true,
          },
          { value: "Hasan Gul", label: "Hasan Gul", disabled: true },
        ]}
      />
    </Box>
  );
};

export default React.memo(SelectNav);

// import React, { useContext } from "react";
// import { Box } from "@mui/material";
// import { SettingContext } from "../../../Context/SettingsContext";
// import SelectItem from "./SelectNav/SelectItem";

// const SelectNav = () => {
//   const {
//     selectItemFont,
//     ayaTranslation,
//     ayaRecitation,
//     wordTranslation,
//     setSelectItemValue,
//   } = useContext(SettingContext);

//   const handleChangeOnSelect = (event) => {
//     const name = event.target.name;
//     setSelectItemValue(event, name);
//   };

//   return (
//     <Box p={2}>
//       {/* Font */}
//       <SelectItem
//         itemName="Font"
//         selectItemName="selectItemFont"
//         selectItemValue={selectItemFont}
//         handleChangeSelectItem={handleChangeOnSelect}
//       >
//         <>
//           <option value="Uthmanic Hafs">Uthmanic Hafs</option>
//           <option value="me_quran">me_quran</option>
//           <option value="Uthmanic TN">Uthmanic TN</option>
//           <option value="KFGQPC Uthman Taha Naskh">
//             KFGQPC Uthman Taha Naskh
//           </option>
//           <option value="Old Madina Mushaf">Old Madina Mushaf</option>
//           <option value="Noore Hidayat">Noore Hidayat</option>
//           <option value="Nafees Nastaleeq">Nafees Nastaleeq</option>
//         </>
//       </SelectItem>

//       {/* Word Translation */}
//       <SelectItem
//         itemName="Translation (Word)"
//         selectItemName="wordTranslation"
//         selectItemValue={wordTranslation}
//         handleChangeSelectItem={handleChangeOnSelect}
//       >
//         <>
//           <option value="word-tr-bangla">Bangla</option>
//           <option value="word-tr-english">English</option>
//         </>
//       </SelectItem>

//       {/* Translation */}
//       <SelectItem
//         itemName="Translation"
//         selectItemName="ayaTranslation"
//         selectItemValue={ayaTranslation}
//         handleChangeSelectItem={handleChangeOnSelect}
//       >
//         <>
//           <optgroup label="Default">
//             <option value="Mojibor Rahman">Mojibor Rahman(Bangla)</option>
//             <option value="Saheeh International">
//               Saheeh International(English)
//             </option>
//           </optgroup>
//           <optgroup label="Others" disabled>
//             <option value="Urdu">Urdu</option>
//             <option value="Hindi">Hindi</option>
//             <option value="Tamil">Tamil</option>
//             <option value="Dutch">Dutch</option>
//           </optgroup>
//         </>
//       </SelectItem>
//       {/* Recitation */}
//       <SelectItem
//         itemName="Recitation"
//         selectItemName="ayaRecitation"
//         selectItemValue={ayaRecitation}
//         handleChangeSelectItem={handleChangeOnSelect}
//       >
//         <>
//           <option disabled value="Mishr Al Afasy">
//             Mishr Al Afasy
//           </option>
//           <option disabled value="Omar Hisham Farabi">
//             Omar Hisham Farabi
//           </option>
//           <option disabled value="Hasan Gul">
//             Hasan Gul
//           </option>
//         </>
//       </SelectItem>
//     </Box>
//   );
// };

// export default SelectNav;

// import React, { useContext, useCallback, useMemo } from "react";
// import { Box } from "@mui/material";
// import { SettingContext } from "../../../Context/SettingsContext";
// import SelectItem from "./SelectNav/SelectItem";

// const SelectNav = () => {
//   const {
//     selectItemFont,
//     ayaTranslation,
//     ayaRecitation,
//     wordTranslation,
//     setSelectItemValue,
//   } = useContext(SettingContext);

//   const handleChange = useCallback(
//     (event) => {
//       const { name } = event.target;
//       setSelectItemValue(event, name);
//     },
//     [setSelectItemValue]
//   );

//   const fontOptions = useMemo(
//     () => [
//       "Uthmanic Hafs",
//       "me_quran",
//       "Uthmanic TN",
//       "KFGQPC Uthman Taha Naskh",
//       "Old Madina Mushaf",
//       "Noore Hidayat",
//       "Nafees Nastaleeq",
//     ],
//     []
//   );

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Font */}
//       <SelectItem
//         itemName="Font"
//         selectItemName="selectItemFont"
//         selectItemValue={selectItemFont}
//         handleChangeSelectItem={handleChange}
//         options={fontOptions}
//       />

//       {/* Word Translation */}
//       <SelectItem
//         itemName="Translation (Word)"
//         selectItemName="wordTranslation"
//         selectItemValue={wordTranslation}
//         handleChangeSelectItem={handleChange}
//         options={[
//           { value: "word-tr-bangla", label: "Bangla" },
//           { value: "word-tr-english", label: "English" },
//         ]}
//       />

//       {/* Aya Translation */}
//       <SelectItem
//         itemName="Translation"
//         selectItemName="ayaTranslation"
//         selectItemValue={ayaTranslation}
//         handleChangeSelectItem={handleChange}
//         groupedOptions={[
//           {
//             label: "Default",
//             options: [
//               { value: "Mojibor Rahman", label: "Mojibor Rahman (Bangla)" },
//               {
//                 value: "Saheeh International",
//                 label: "Saheeh International (English)",
//               },
//             ],
//           },
//         ]}
//       />

//       {/* Recitation */}
//       <SelectItem
//         itemName="Recitation"
//         selectItemName="ayaRecitation"
//         selectItemValue={ayaRecitation}
//         handleChangeSelectItem={handleChange}
//         options={[
//           { value: "Mishr Al Afasy", label: "Mishr Al Afasy", disabled: true },
//           {
//             value: "Omar Hisham Farabi",
//             label: "Omar Hisham Farabi",
//             disabled: true,
//           },
//           { value: "Hasan Gul", label: "Hasan Gul", disabled: true },
//         ]}
//       />
//     </Box>
//   );
// };

// export default React.memo(SelectNav);