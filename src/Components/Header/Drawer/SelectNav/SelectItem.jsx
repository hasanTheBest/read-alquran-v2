// import React from "react";
// import { FormControl, makeStyles, Select, Typography } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   selectEachWrapper: {
//     display: "flex",
//     flexDirection: "column",
//     "&:not(:last-child)": {
//       marginBottom: theme.spacing(2),
//     },
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     marginLeft: 0,
//     minWidth: 120,
//   },
// }));

// const SelectItem = ({
//   itemName,
//   selectItemName,
//   selectItemValue,
//   handleChangeSelectItem,
//   children,
// }) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.selectEachWrapper}>
//       <Typography variant="body1" component="span">
//         {itemName}
//       </Typography>

//       <FormControl required className={classes.formControl}>
//         <Select
//           native
//           value={selectItemValue}
//           onChange={handleChangeSelectItem}
//           name={selectItemName}
//           inputProps={{
//             id: "font-native-required",
//           }}
//         >
//           {children}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default SelectItem;

import React from "react";
import {
  FormControl,
  Select,
  Typography,
  Box,
} from "@mui/material";

const SelectItem = ({
  itemName,
  selectItemName,
  selectItemValue,
  handleChangeSelectItem,
  children,
}) => {
  const labelId = `${selectItemName}-label`;

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        mb: 2,
      })}
    >
      <Typography
        id={labelId}
        variant="body1"
        component="span"
        sx={{ mb: 1 }}
      >
        {itemName}
      </Typography>

      <FormControl required size="small" sx={{ minWidth: 120 }}>
        <Select
          labelId={labelId}
          value={selectItemValue}
          onChange={handleChangeSelectItem}
          name={selectItemName}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectItem;
