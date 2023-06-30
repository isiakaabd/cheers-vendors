import { Grid, Card, TableCell, Skeleton, Chip } from "@mui/material";
import CustomButton from "components/CustomButton";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { Formik, Form } from "formik/dist";
import { useEffect, useState } from "react";
import { useLazyGetOrdersQuery } from "redux/api/inventory";
import { getDate, getTimeMoment } from "utilis";
import FormikControl from "validation/FormikControl";

const Orders = () => {
  const [selected, setSelected] = useState([]);
  // if (loading) return <Skeletons />;

  const headcells = [
    "Order ID",
    "SKU",
    "Confirmation No",
    "Updated Date",
    "Customer Info",
    "Shipment Method",
    "Settlement",
    "Status",
    "",
  ];
  const [getOrders, { data: orders, isLoading, isFetching }] =
    useLazyGetOrdersQuery();
  const onSubmit = async (values) => {
    // console.log(values);
    await getOrders({
      search: values.search,
    });
    // console.log(data);
  };
  useEffect(() => {
    getOrders({ search: "" });
  }, [getOrders]);
  return (
    <Grid item container flexDirection="column">
      <Grid
        item
        container
        alignItems="center"
        gap={{ md: 8, xs: 2 }}
        sx={{ my: 3 }}
        flexWrap={"nowrap"}
      >
        <Grid item flex={1}>
          <Formik initialValues={{ search: "" }} onSubmit={onSubmit}>
            <Form noValidate style={{ width: "100%" }}>
              <Grid item container gap={2}>
                <Grid item flex={1}>
                  <FormikControl
                    name="search"
                    placeholder="Search Orders by OrderId"
                  />
                </Grid>
                <Grid item>
                  <CustomButton
                    title="Search"
                    type="submit"
                    disabled={isFetching}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
      {isLoading ? (
        <Skeletons />
      ) : (
        <Card sx={{ width: "100%" }}>
          {orders?.length > 0 ? (
            <Grid
              item
              container
              direction="column"
              overflow="hidden"
              sx={{ mt: 2 }}
              maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
            >
              <BasicTable
                tableHead={headcells}
                rows={orders}
                setSelected={setSelected}
                selected={selected}
                paginationLabel="Orders per page"
                hasCheckbox={false}
                per_page={orders?.per_page}
                totalPage={orders?.length}
                nextPageUrl={orders?.next_page_url}
              >
                {orders?.map((row) => (
                  <Rows key={row.id} row={row} hasCheckbox={true} />
                ))}
              </BasicTable>
            </Grid>
          ) : (
            <EmptyCell
              paginationLabel="Orders  per page"
              headCells={headcells}
            />
          )}
        </Card>
      )}
    </Grid>
  );
};

function Rows({ row }) {
  const {
    order_id,
    user,
    settlement,
    shipment,
    wishlist,
    updated_at,
    confirmation_date,
    status,
  } = row;

  return (
    <>
      <TableCell scope="row" align="left">
        {order_id}
      </TableCell>
      <TableCell scope="row" align="left">
        {wishlist?.product?.sku}
      </TableCell>
      <TableCell scope="row" align="left">
        {confirmation_date ? getDate(confirmation_date) : "NA"}
      </TableCell>
      <TableCell align="left">{getTimeMoment(updated_at)}</TableCell>
      <TableCell align="left">
        {user?.first_name} {user?.last_name}
      </TableCell>
      <TableCell align="left">{shipment ? shipment : "NA"}</TableCell>
      <TableCell align="left">{settlement ? settlement : "NA"}</TableCell>
      <TableCell align="left">
        <Chip
          label={status}
          sx={{
            fontSize: "1.2rem",
          }}
          color={
            status === "pending"
              ? "secondary"
              : status === "completed"
              ? "success"
              : "primary"
          }
        />
      </TableCell>
    </>
  );
}

export function Skeletons() {
  return (
    <Grid item container gap={4}>
      <Skeleton
        sx={{ height: "5rem", marginLeft: "auto", width: "15rem" }}
        animation="wave"
        variant="rectangular"
      />
      <Skeleton
        sx={{ height: "50vh", width: "100%" }}
        animation="wave"
        variant="rectangular"
      />
    </Grid>
  );
}

export default Orders;
