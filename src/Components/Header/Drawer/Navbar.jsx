import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { SettingsOutlined } from "@mui/icons-material";
import { IconButton, makeStyles } from "@mui/material";

import ResponsiveDrawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const handleDrawerToggle = () => {};

export default function Navbar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <SettingsOutlined />
            </IconButton>
            <Typography variant="h6">alQuran</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Drawer */}
      <ResponsiveDrawer />
    </React.Fragment>
  );
}
