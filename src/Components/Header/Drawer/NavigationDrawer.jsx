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
