import { Card, Chip, Grid, Skeleton, TableCell, TableRow } from "@mui/material";
import CustomButton from "components/CustomButton";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { Formik, Form } from "formik/dist";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useGetSupportQuery } from "redux/api/vendor";
import { getDate } from "utilis";
import FormikControl from "validation/FormikControl";

const AllMessages = () => {
  const { data: supports, isLoading, isFetching } = useGetSupportQuery();

  const headcells = ["Title", "Date Created", "Message", "Status"];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  if (isLoading) return <Skeletons />;

  const onSubmit = () => {};
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
                    placeholder="Search Vendor by Name"
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
      <Card sx={{ width: "100%" }}>
        {supports?.length > 0 ? (
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
              rows={supports}
              paginationLabel="Supports per page"
              hasCheckbox={false}
              rowsPerPage={rowsPerPage}
              page={page}
              setRowsPerPage={setRowsPerPage}
              setPage={setPage}
            >
              {(rowsPerPage > 0
                ? supports.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : supports
              ).map((row) => (
                <Rows key={row.id} row={row} />
              ))}
            </BasicTable>
          </Grid>
        ) : (
          <EmptyCell
            paginationLabel="Supports  per page"
            headCells={headcells}
          />
        )}
      </Card>
    </Grid>
  );
};

function Rows({ row }) {
  const { id, message, title, is_open, created_at } = row;
  const navigate = useNavigate();

  return (
    <TableRow
      tabIndex={-1}
      sx={{ cursor: "pointer" }}
      hover
      onClick={() => navigate(`${id}`, { state: row })}
    >
      <TableCell scope="row" align="left">
        {title}
      </TableCell>
      <TableCell align="left">{getDate(created_at)}</TableCell>
      <TableCell align="left">{message}</TableCell>
      <TableCell align="left">
        <Chip
          label={Boolean(is_open) ? "Active" : "Closed"}
          color={is_open ? "primary" : "success"}
          sx={{ fontSize: "1.2rem" }}
        />
      </TableCell>
    </TableRow>
  );
}

function Skeletons() {
  return (
    <Grid item container gap={4}>
      <Skeleton
        sx={{ height: "50vh", width: "100%" }}
        animation="wave"
        variant="rectangular"
      />
    </Grid>
  );
}
export default AllMessages;
