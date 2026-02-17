// import React from "react";
// import { InputBase, makeStyles, fade } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const useStyles = makeStyles((theme) => ({
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// const Search = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.search}>
//       <div className={classes.searchIcon}>
//         <SearchIcon />
//       </div>

//       <InputBase
//         placeholder="Search…"
//         classes={{
//           root: classes.inputRoot,
//           input: classes.inputInput,
//         }}
//         inputProps={{ "aria-label": "search" }}
//       />
//     </div>
//   );
// };

// export default Search;

import React from "react";
import { Box, InputBase, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        mr: 2,
        ml: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          ml: 3,
          width: "auto",
        },
      })}
    >
      {/* Search Icon */}
      <Box
        sx={(theme) => ({
          p: theme.spacing(0, 2),
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <SearchIcon />
      </Box>

      {/* Input */}
      <InputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={(theme) => ({
          color: "inherit",
          p: theme.spacing(1, 1, 1, 0),
          pl: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create("width"),
          width: "100%",
          [theme.breakpoints.up("md")]: {
            width: "20ch",
          },
        })}
      />
    </Box>
  );
};

export default Search;
