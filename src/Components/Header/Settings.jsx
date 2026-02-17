import React, { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Book, SettingsApplications } from "@mui/icons-material";
import { SettingContext } from "../../Context/SettingsContext";

const Settings = () => {
  const { handleOpenDrawer } = useContext(SettingContext);

  return (
    <Tooltip title="Open Settings">
      <IconButton
        aria-label="button"
        color="inherit"
        onClick={handleOpenDrawer}
      >
        <SettingsApplications />
      </IconButton>
    </Tooltip>
  );
};

export default Settings;
