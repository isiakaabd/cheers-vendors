import {
  DeleteOutline,
  EditOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Grid,
  Card,
  TableRow,
  TableCell,
  Skeleton,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
} from "@mui/material";
import CustomButton from "components/CustomButton";
import Dialogs from "components/Dialog";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useEffect, useState } from "react";
import {
  useDeleteInventoryMutation,
  useLazyGetInventoriesQuery,
} from "redux/api/inventory";
import { getTimeMoment } from "utilis";
import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";
import CreateInventory from "pages/vendors/component";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";

const Inventories = () => {
  const [getInventory, { data: inventories, isLoading: loading, isFetching }] =
    useLazyGetInventoriesQuery();

  const [selected, setSelected] = useState([]);
  useEffect(() => {
    getInventory({ search: "" });
  }, [getInventory]);
  const [open, setOpen] = useState(false);
  const headcells = [
    "Name",
    "SKU",
    "Status",
    "Created At",
    "Price",
    "Stock",
    "Category",
    "",
  ];
  const onSubmit = async (values) => {
    // console.log(values);
    await getInventory({
      search: values.search,
    });
    // console.log(data);
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  return (
    <>
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
                      placeholder="Search Inventory by Title and SKU"
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

          <Grid item>
            <CustomButton
              title="Add Inventory"
              type="button"
              onClick={() => setOpen(true)}
            />
          </Grid>
        </Grid>
        {loading ? (
          <Skeletons />
        ) : (
          <Card sx={{ width: "100%" }}>
            {inventories?.data?.length > 0 || inventories?.length > 0 ? (
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
                  rows={
                    inventories.length > 0 ? inventories : inventories?.data
                  }
                  setSelected={setSelected}
                  selected={selected}
                  paginationLabel="inventories per page"
                  hasCheckbox={true}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  setRowsPerPage={setRowsPerPage}
                  setPage={setPage}
                >
                  {inventories?.data
                    ? (rowsPerPage > 0
                        ? inventories?.data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : inventories?.data
                      ).map((row) => (
                        <Rows
                          key={row.id}
                          row={row}
                          hasCheckbox={true}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      ))
                    : (rowsPerPage > 0
                        ? inventories.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : inventories
                      ).map((row) => (
                        <Rows
                          key={row.id}
                          row={row}
                          hasCheckbox={true}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      ))}
                </BasicTable>
              </Grid>
            ) : (
              <EmptyCell
                paginationLabel="Invoice  per page"
                headCells={headcells}
              />
            )}
          </Card>
        )}
      </Grid>

      <Dialogs isOpen={open} handleClose={() => setOpen(false)}>
        <CreateInventory
          open={open}
          setOpen={setOpen}
          type="create"
          heading={"Create Inventory"}
        />
      </Dialogs>
    </>
  );
};

function Rows({ row, hasCheckbox, setSelected, selected }) {
  const {
    id,
    description,
    sku,
    active,
    stock,
    category,
    price,
    properties,
    title,
    created_at,
    media,
  } = row;

  const navigate = useNavigate();
  const [deleteInventory, { isLoading: deleting, status }] =
    useDeleteInventoryMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const handleDelete = async (e) => {
    e.stopPropagation();
    const { error } = await deleteInventory(id);

    if (status === "fulfilled") {
      toast.success("Inventory deleted successfully");
      setTimeout(() => handleClose(), 1000);
    }
    if (error) toast.error(error);
  };

  const handleClicks = (event, row) => {
    // console.log(title);
    const selectedIndex = selected.indexOf(row);
    selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isItemSelected = isSelected(id);
  const [edit, setEdit] = useState(false);
  const initials = {
    id,
    title,
    description,
    price,
    stock,
    active,
    propertiesArray: JSON.parse(properties),
    category: category.title,
    media,
  };
  return (
    <>
      <TableRow
        sx={{ cursor: "pointer" }}
        hover
        onClick={() => navigate(`/inventories/${id}`)}
      >
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              size="large"
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                handleClicks(event, id);
              }}
              checked={isItemSelected}
            />
          </TableCell>
        )}

        <TableCell scope="row" align="left">
          {title}
        </TableCell>
        <TableCell scope="row" align="left">
          {sku ? sku : "No SKU"}
        </TableCell>
        <TableCell scope="row" align="left">
          <Chip
            label={active === 1 ? "Active" : "Inactive"}
            color={active === 1 ? "primary" : "error"}
            sx={{ fontSize: "1.2rem" }}
          />
        </TableCell>
        <TableCell align="left">{getTimeMoment(created_at)}</TableCell>
        <TableCell align="left">{price}</TableCell>
        <TableCell align="left">{stock}</TableCell>
        <TableCell align="left">{category?.title}</TableCell>
        <TableCell align="left">
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizOutlined />
          </IconButton>

          <BasicMenu
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
          >
            <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
              <ListItemIcon>
                <DeleteOutline fontSize="large" sx={{ color: "red" }} />
              </ListItemIcon>

              <ListItemText>{!deleting ? "Delete" : "Deleting"}</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                setEdit(true);
                handleClose(e);
              }}
            >
              <ListItemIcon>
                <EditOutlined fontSize="large" />
              </ListItemIcon>

              <ListItemText>Edit </ListItemText>
            </MenuItem>
          </BasicMenu>
        </TableCell>
      </TableRow>
      <Dialogs
        isOpen={edit}
        handleClose={(e) => {
          setEdit(false);
          handleClose(e);
        }}
      >
        <CreateInventory
          // open={open}
          setOpen={setEdit}
          values={initials}
          type="edit"
          heading={"Edit Inventory"}
        />
      </Dialogs>
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

export default Inventories;
