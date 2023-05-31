import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { CardContent, Card, Grid, Typography, IconButton } from "@mui/material";

import { Link } from "react-router-dom";

function SupportCard({ Icon, subHeading, to, heading }) {
  return (
    <Card sx={{ width: "100%", px: 1, py: 4 }}>
      <CardContent>
        <Grid
          item
          container
          alignItems="center"
          flexWrap="nowrap"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Icon
              sx={({ shadows }) => ({
                fontSize: "3rem",
                boxShadow: shadows[1],
              })}
              color="primary"
            />
          </Grid>
          <Grid item>
            <Grid
              item
              container
              flexDirection="column"
              alignItems={{ xs: "center" }}
              gap={{ xs: 4, md: 2 }}
            >
              <Typography sx={{ fontSize: { md: "2rem", xs: "1.5rem" } }}>
                {heading}
              </Typography>
              <Typography color="info" variant="h5">
                {subHeading}
              </Typography>
            </Grid>
          </Grid>

          <Grid item mt={{ xs: 3, md: 0 }}>
            <IconButton color="primary" component={Link} to={to}>
              <ArrowForwardIosOutlined sx={{ fontSize: "3rem" }} />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default SupportCard;
