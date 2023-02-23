import { Grid, Card, Typography, Skeleton } from "@mui/material";

import { useGetInventoriesQuery } from "redux/api/inventory";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "redux/api/vendor";
const Dashboard = () => {
  const { data: inventories, isLoading: loading } = useGetInventoriesQuery();
  // const { data: vendors, isLoading } = useGetMainVendorsQuery();
  const { data: categories, isLoading: load } = useGetAllCategoriesQuery();
  console.log(categories);

  if (loading || load) return <Skeletons />; //|| load || isLoading
  const arr = [
    {
      name: "Inventories",
      value: inventories?.data?.length || 0,
      link: "/inventories",
    },
    {
      name: "Total Categories",
      value: categories?.length || 0,
      link: "/categories",
    },
    // {
    //   name: "Vendors",
    //   // value: vendors?.length || 0,
    //   link: "/vendors",
    // },
  ];

  return (
    <Grid item container justifyContent="space-between" gap={3} sx={{ py: 3 }}>
      {arr?.map((item, index) => (
        <Grid item md={3.5} sm={3.5} xs={12} key={index} sx={{ boxShadow: 0 }}>
          <Card
            component={Link}
            variant="outlined"
            to={item.link}
            sx={{
              boxShadow: 2,
              textDecoration: "none",
              p: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              height: "15rem",
              gap: { md: 3, sm: 1, xs: 3 },
            }}
          >
            <Typography variant="h4" color="primary" fontWeight={700}>
              {item.name}
            </Typography>
            <Typography variant="h4" sx={{ color: "#e4e6ef" }}>
              {item.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;

function Skeletons() {
  return (
    <Grid item container gap={3} flexWrap={{ md: "nowrap", xs: "wrap" }}>
      {Array(3)
        .fill(undefined)
        .map((item, index) => (
          <Skeleton
            key={index}
            sx={{ height: "15rem", width: "100%" }}
            animation="wave"
            variant="rectangular"
          />
        ))}
    </Grid>
  );
}
