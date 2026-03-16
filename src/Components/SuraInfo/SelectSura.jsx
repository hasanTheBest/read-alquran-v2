import React, { useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
} from "@mui/material";
import { SuraContext } from "../../Context/SuraContextProvider";

const SelectSura = ({ suraList }) => {
  const { suraId, setAyaOfSura } = useContext(SuraContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const newSura = event.target.value;

    // reset ayah
    setAyaOfSura(1);

    // change route
    navigate(`/sura/${newSura}`);
  };

  const items = useMemo(
    () =>
      suraList.map(({ index, tname, ename, ayas }) => (
        <MenuItem value={index} key={index}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left */}
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ pr: 1 }}>{index}.</Typography>

              <Box sx={{ lineHeight: 1 }}>
                <Typography variant="subtitle2">
                  {tname} ({ayas})
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {ename}
                </Typography>
              </Box>
            </Box>

            {/* Arabic */}
            <span className={`s_name raq raq-surah${index}`} />
          </Box>
        </MenuItem>
      )),
    [suraList]
  );

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 200,
        maxWidth: 300,
        mr: 2,
      }}
    >
      <Select
        value={suraId}
        onChange={handleChange}
        displayEmpty
      >
        {items}
      </Select>
    </FormControl>
  );
};

export default React.memo(SelectSura);