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