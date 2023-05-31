import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { CardContent, Card, Grid, Typography, IconButton } from "@mui/material";

import { Link } from "react-router-dom";

function SupportCard({ Icon, subHeading, to, heading }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Grid
          item
          container
          alignItems="center"
          justifyContent={"space-between"}
          px={2}
          py={4}
        >
          <Grid item>
            <Icon
              sx={({ shadows }) => ({
                fontSize: "4rem",
                boxShadow: shadows[1],
              })}
              color="primary"
            />
          </Grid>
          <Grid item>
            <Grid item container flexDirection="column" gap={2}>
              <Typography variant="h1">{heading}</Typography>
              <Typography color="info" variant="h4">
                {subHeading}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
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
