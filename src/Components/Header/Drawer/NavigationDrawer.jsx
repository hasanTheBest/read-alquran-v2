// import React, { useContext } from "react";
// import { useLocation, Link as RouterLink } from "react-router-dom";

// import { IndexContext } from "../../../Context/IndexContext";

// import {
//   ListItemText,
//   ListItemIcon,
//   ListItem,
//   List,
//   IconButton,
//   Divider,
//   Drawer,
//   Link,
// } from "@mui/material";
// import { makeStyles } from "@mui/material/styles";
// import { CloseRounded, Mail, Inbox } from "@mui/icons-material";

// const drawerWidth = 270;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   drawer: {
//     [theme.breakpoints.up("sm")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     [theme.breakpoints.up("sm")]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: { ...theme.mixins.toolbar, textAlign: "center" },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },

//   navDrawerLink: {
//     "&:hover": {
//       textDecoration: "none",
//     },
//   },
// }));

// function NavigationDrawer({
//   props: { openNavigationDrawer, toggleNavigationDrawer },
// }) {
//   const classes = useStyles();
//   let { pathname } = useLocation();

//   // const context = useContext(IndexContext);
//   // console.log("context", context);

//   // const { openNavigationDrawer, toggleNavigationDrawer, handleChangeTab } =
//   //   value !== undefined && value;
//   // const { handleChangeTab } = value !== undefined && value;
//   // console.log("NavigationDrawer -> value", value);

//   const handleChangeTab = () => {};

//   const drawer = (
//     <div>
//       <div className={classes.toolbar}>
//         <IconButton
//           color="secondary"
//           onClick={toggleNavigationDrawer}
//           aria-label="Close"
//         >
//           <CloseRounded />
//         </IconButton>
//       </div>
//       <Divider />

//       <List>
//         {pathname.startsWith("/sura") && (
//           <>
//             {["Sura", "Page", "Juz", "Ruku", "Hizb", "Manzil", "Sajda"].map(
//               (text, index) => (
//                 <Link
//                   to="/"
//                   component={RouterLink}
//                   className={classes.navDrawerLink}
//                   key={text}
//                 >
//                   <ListItem
//                     button
//                     onClick={
//                       "function" === typeof handleChangeTab
//                         ? (text) => handleChangeTab(text)
//                         : console.error("On click handleChangeTab")
//                     }
//                   >
//                     <ListItemIcon>
//                       {index % 2 === 0 ? <Inbox /> : <Mail />}
//                     </ListItemIcon>
//                     <ListItemText primary={text} />
//                   </ListItem>
//                 </Link>
//               )
//             )}
//             <Divider />
//           </>
//         )}

//         {/* <List> */}
//         {["Home", "About", "Project"].map((text, index) => (
//           <Link
//             to={"Home" === text ? "/" : `/${text}`}
//             component={RouterLink}
//             className={classes.navDrawerLink}
//             key={text}
//           >
//             <ListItem button key={text}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <Inbox /> : <Mail />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           </Link>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className={classes.root}>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         <Drawer
//           // variant="persistent"
//           anchor="left"
//           open={openNavigationDrawer}
//           onClose={toggleNavigationDrawer}
//           classes={{
//             paper: classes.drawerPaper,
//           }}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//     </div>
//   );
// }

// export default NavigationDrawer;

import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
  IconButton,
  Divider,
  Drawer,
  Box,
} from "@mui/material";
import { CloseRounded, Mail, Inbox } from "@mui/icons-material";

const drawerWidth = 270;

function NavigationDrawer({
  openNavigationDrawer, toggleNavigationDrawer
}) {
  const { pathname } = useLocation();

  const suraItems = [
    "Sura",
    "Page",
    "Juz",
    "Ruku",
    "Hizb",
    "Manzil",
    "Sajda",
  ];

  const staticItems = ["Home", "About", "Project"];

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      {/* Header */}
      <Box
        sx={(theme) => ({
          ...theme.mixins.toolbar,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          px: 1,
        })}
      >
        <IconButton
          color="secondary"
          onClick={toggleNavigationDrawer}
          aria-label="Close"
        >
          <CloseRounded />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {pathname.startsWith("/sura") &&
          suraItems.map((text, index) => (
            <ListItemButton
              key={text}
              component={RouterLink}
              to="/"
              onClick={toggleNavigationDrawer}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}

        {pathname.startsWith("/sura") && <Divider sx={{ my: 1 }} />}

        {staticItems.map((text, index) => (
          <ListItemButton
            key={text}
            component={RouterLink}
            to={text === "Home" ? "/" : `/${text}`}
            onClick={toggleNavigationDrawer}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={openNavigationDrawer}
      onClose={toggleNavigationDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default NavigationDrawer;
