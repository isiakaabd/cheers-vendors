import MiniDrawer from "./Drawer";
import { Grid } from "@mui/material";

const MasterLayout = () => {
  // const location = useLocation();
  // useEffect(() => {
  //   setTimeout(() => {
  //     MenuComponent.reinitialization()
  //   }, 500)
  // }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     MenuComponent.reinitialization()
  //   }, 500)
  // }, [location.key])

  return (
    <Grid item container className="page d-flex flex-row flex-column-fluid">
      <MiniDrawer />
    </Grid>
  );
};

export { MasterLayout };
