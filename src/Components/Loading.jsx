import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => (
  <Backdrop
    open
    sx={(theme) => ({
      zIndex: theme.zIndex.drawer + 1,
      color: "primary.dark",
    })}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loading;