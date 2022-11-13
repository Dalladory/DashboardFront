import { LinearProgress, CircularProgress, styled, Box } from "@mui/material";
import { Backdrop } from "@mui/material";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
});

const Loader = () => {
  const { loading } = useTypedSelector((state) => state.UserReducer);
  return (
    <Backdrop open={loading}>
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
    </Backdrop>
  );
};

export default Loader;
