// import React, { useContext, useState } from "react";
// import { useLocation, Link as RouterLink } from "react-router-dom";

// // Material UI Components
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   makeStyles,
//   Tooltip,
//   Link,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";

// // Material UI Icons
// import { Book, Menu } from "@mui/icons-material";
// import Drawer from "./Drawer/Drawer";
// import NavigationDrawer from "./Drawer/NavigationDrawer";

// // Custom Component
// import { IndexContext } from "../../Context/IndexContext";
// import Search from "./Search";
// import Settings from "./Settings";
// import { SettingContext } from "../../Context/SettingsContext";

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     // zIndex: theme.zIndex.drawer + 10,
//   },
//   toolbarWrapper: {
//     width: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     maxWidth: 1600,
//     margin: "0 auto",
//   },

//   appName: {
//     color: "inherit",
//     "&:hover": {
//       textDecoration: "none",
//     },
//   },
// }));

// const Header = () => {
//   let { pathname } = useLocation();
//   const theme = useTheme();
//   const breakUp1440 = useMediaQuery(theme.breakpoints.up(1440));
//   const classes = useStyles();
//   const { toggleReadingMode } = useContext(SettingContext);

//   const [openNavigationDrawer, setOpenNavigationDrawer] = useState(false);
//   const toggleNavigationDrawer = () =>
//     setOpenNavigationDrawer(!openNavigationDrawer);

//   // const value = useContext(IndexContext);
//   // const { toggleNavigationDrawer } = value !== undefined && value;

//   return (
//     <>
//       <AppBar position="fixed" color="primary" className={classes.appBar}>
//         <div className={classes.toolbarWrapper}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               onClick={toggleNavigationDrawer}
//             >
//               <Tooltip title="Open Menu">
//                 <Menu />
//               </Tooltip>
//             </IconButton>
//             <Typography variant="h6">
//               <Tooltip title="Al Quranul Qarim">
//                 <Link to="/" component={RouterLink} className={classes.appName}>
//                   alQuran
//                 </Link>
//               </Tooltip>
//             </Typography>
//           </Toolbar>

//           {/* Search */}
//           <Search />

//           {/* Settings */}
//           <Toolbar>
//             <Tooltip title="Toggle Reading Mode">
//               <IconButton
//                 aria-label="button"
//                 color="inherit"
//                 onClick={toggleReadingMode}
//               >
//                 <Book />
//               </IconButton>
//             </Tooltip>
//             {pathname.startsWith("/sura") && !breakUp1440 && <Settings />}
//           </Toolbar>
//         </div>
//       </AppBar>

//       <NavigationDrawer
//         props={{ openNavigationDrawer, toggleNavigationDrawer }}
//       />

//       {pathname.startsWith("/sura") && !breakUp1440 && <Drawer />}
//     </>
//   );
// };

// export default React.memo(Header);

import React, { useContext, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

// MUI v5 Components
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Link,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// MUI v5 Icons
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";

import Drawer from "./Drawer/Drawer";
import NavigationDrawer from "./Drawer/NavigationDrawer";

import Search from "./Search";
import Settings from "./Settings";

import { SettingContext } from "../../Context/SettingsContext";

const Header = () => {
  const { pathname } = useLocation();
  const theme = useTheme();

  // Fixed breakpoint usage (1440px custom)
  const breakUp1440 = useMediaQuery("(min-width:1440px)");

  const { toggleReadingMode } = useContext(SettingContext);

  const [openNavigationDrawer, setOpenNavigationDrawer] = useState(false);

  const toggleNavigationDrawer = () =>
    setOpenNavigationDrawer((prev) => !prev);

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Box
          sx={{
            width: "100%",
            maxWidth: 1600,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Toolbar>
            <Tooltip title="Open Menu">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleNavigationDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <Typography variant="h6">
              <Tooltip title="Al Quranul Qarim">
                <Link
                  component={RouterLink}
                  to="/"
                  underline="none"
                  color="inherit"
                >
                  alQuran
                </Link>
              </Tooltip>
            </Typography>
          </Toolbar>

          {/* Search */}
          <Search />

          <Toolbar>
            <Tooltip title="Toggle Reading Mode">
              <IconButton
                aria-label="toggle-reading-mode"
                color="inherit"
                onClick={toggleReadingMode}
              >
                <BookIcon />
              </IconButton>
            </Tooltip>

            {pathname.startsWith("/sura") && !breakUp1440 && <Settings />}
          </Toolbar>
        </Box>
      </AppBar>

      <NavigationDrawer
        openNavigationDrawer={openNavigationDrawer}
        toggleNavigationDrawer={toggleNavigationDrawer}
      />

      {pathname.startsWith("/sura") && !breakUp1440 && <Drawer />}
    </>
  );
};

export default React.memo(Header);
