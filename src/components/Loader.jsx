import { Grid, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
const Loader = ({ color, size, ...rest }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <CircularProgress
        size={size ? size : 25}
        thickness={5}
        {...rest}
        sx={{ color: color ? color : "#fff" }}
      />
    </Grid>
  );
};
Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
export default Loader;
