import { Grid, Card, TableCell, Skeleton } from "@mui/material";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useState } from "react";
import { useGetOrdersQuery } from "redux/api/inventory";
import { getDate, getTimeMoment } from "utilis";

const Orders = () => {
  const { data: orders, isLoading: loading } = useGetOrdersQuery();
  const [selected, setSelected] = useState([]);
  if (loading) return <Skeletons />;

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
  return (
    <Grid item container flexDirection="column">
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
          <EmptyCell paginationLabel="Orders  per page" headCells={headcells} />
        )}
      </Card>
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
  // const navigate = useNavigate();

  return (
    <>
      {/* <TableCell scope="row" align="left">
        {status}
      </TableCell> */}
      <TableCell scope="row" align="left">
        {order_id}
      </TableCell>
      <TableCell scope="row" align="left">
        {wishlist?.product?.sku}
      </TableCell>
      <TableCell scope="row" align="left">
        {confirmation_date ? getDate(confirmation_date) : "No Date yet"}
      </TableCell>
      <TableCell align="left">{getTimeMoment(updated_at)}</TableCell>
      <TableCell align="left">
        {user?.first_name} {user?.last_name}
      </TableCell>
      <TableCell align="left">{shipment ? shipment : "NA"}</TableCell>
      <TableCell align="left">{settlement ? settlement : "NA"}</TableCell>
      <TableCell align="left">{status}</TableCell>
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
