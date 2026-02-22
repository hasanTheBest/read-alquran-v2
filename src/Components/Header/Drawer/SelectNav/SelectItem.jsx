import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
} from "@mui/material";

const SelectItem = ({
  itemName,
  selectItemName,
  selectItemValue,
  handleChangeSelectItem,
  options = [],
  groupedOptions = [],
}) => {
  return (
    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
      <InputLabel>{itemName}</InputLabel>

      <Select
        label={itemName}
        name={selectItemName}
        value={selectItemValue}
        onChange={handleChangeSelectItem}
      >
        {/* Normal Options */}
        {options.map((opt) =>
          typeof opt === "string" ? (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ) : (
            <MenuItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </MenuItem>
          )
        )}

        {/* Grouped Options */}
        {groupedOptions.map((group) => [
          <ListSubheader key={group.label}>
            {group.label}
          </ListSubheader>,
          group.options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          )),
        ])}
      </Select>
    </FormControl>
  );
};

export default React.memo(SelectItem);

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

// import React from "react";
// import {
//   FormControl,
//   Select,
//   Typography,
//   Box,
// } from "@mui/material";

// const SelectItem = ({
//   itemName,
//   selectItemName,
//   selectItemValue,
//   handleChangeSelectItem,
//   children,
// }) => {
//   const labelId = `${selectItemName}-label`;

//   return (
//     <Box
//       sx={(theme) => ({
//         display: "flex",
//         flexDirection: "column",
//         mb: 2,
//       })}
//     >
//       <Typography
//         id={labelId}
//         variant="body1"
//         component="span"
//         sx={{ mb: 1 }}
//       >
//         {itemName}
//       </Typography>

//       <FormControl required size="small" sx={{ minWidth: 120 }}>
//         <Select
//           labelId={labelId}
//           value={selectItemValue}
//           onChange={handleChangeSelectItem}
//           name={selectItemName}
//         >
//           {children}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default SelectItem;
