import MiniDrawer from "./Drawer";
import { Grid } from "@mui/material";

const MasterLayout = () => {
  return (
    <Grid item container className="page d-flex flex-row flex-column-fluid">
      <MiniDrawer />
    </Grid>
  );
};

export { MasterLayout };
