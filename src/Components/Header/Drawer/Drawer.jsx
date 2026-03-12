import React, { useContext } from "react";
import {
  IconButton,
  Divider,
  Drawer,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CloseRounded } from "@mui/icons-material";

import SwitchDrawer from "./SwitchDrawer";
import SliderNav from "./SliderNav";
import SelectNav from "./SelectNav";
import { SettingContext } from "../../../Context/SettingsContext";

const drawerWidth = 270;

function ResponsiveDrawer() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(1440));
  const { openDrawer, handleOpenDrawer } = useContext(SettingContext);

  const handleDrawerToggle = () => {
    handleOpenDrawer();
  };

  const drawerContent = (
    <Box>
      {/* Header */}
      <Box
        sx={{
          ...theme.mixins.toolbar,
          display: "flex",
          alignItems: "center",
          justifyContent: isLargeScreen ? "flex-start" : "flex-end",
          px: 2,
        }}
      >
        {isLargeScreen ? (
          <Typography variant="h5">Controls</Typography>
        ) : (
          <IconButton aria-label="Close" onClick={handleDrawerToggle}>
            <CloseRounded />
          </IconButton>
        )}
      </Box>

      <Divider />

      <SwitchDrawer />
      <Divider />

      <SliderNav />
      <Divider />

      <SelectNav />
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={isLargeScreen ? "permanent" : "persistent"}
        anchor={theme.direction === "rtl" ? "left" : "right"}
        open={isLargeScreen ? true : openDrawer}
        onClose={!isLargeScreen ? handleDrawerToggle : undefined}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            zIndex: theme.zIndex.appBar - 10,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
