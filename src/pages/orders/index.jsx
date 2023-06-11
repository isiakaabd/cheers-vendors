import {
  DeleteOutline,
  EditOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Grid,
  Card,
  TableCell,
  Skeleton,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useState } from "react";
import {
  useDeleteInventoryMutation,
  useGetInventoriesQuery,
} from "redux/api/inventory";
import { getTimeMoment } from "utilis";
import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import Dialogs from "components/Dialog";
import CreateInventory from "pages/vendors/component";

const Orders = () => {
  const { data: inventories, isLoading: loading } = useGetInventoriesQuery();
  const [selected, setSelected] = useState([]);
  if (loading) return <Skeletons />;

  const headcells = [
    "Name",
    "Order No",
    "Product SKU",
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
        {inventories?.data?.length > 0 ? (
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
              rows={inventories}
              setSelected={setSelected}
              selected={selected}
              paginationLabel="Orders per page"
              hasCheckbox
              per_page={inventories?.per_paWge}
              totalPage={inventories?.to}
              nextPageUrl={inventories?.next_page_url}
            >
              {inventories?.data?.map((row) => (
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

function Rows({ row, hasCheckbox, setSelected, selected }) {
  const { id, description, category, price, title, created_at } = row;
  // const navigate = useNavigate();
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
  const isSelected = (id) => selected?.indexOf(id) !== -1;
  const isItemSelected = isSelected(id);
  const [edit, setEdit] = useState(false);
  const initials = {
    id,
    title,
    description,
    price,
    category: category.title,
  };
  return (
    <>
      {hasCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            size="large"
            color="primary"
            onClick={(event) => handleClicks(event, id)}
            checked={isItemSelected}
          />
        </TableCell>
      )}

      <TableCell scope="row" align="left">
        {title}
      </TableCell>
      <TableCell scope="row" align="left">
        {title}
      </TableCell>
      <TableCell scope="row" align="left">
        {title}
      </TableCell>
      <TableCell scope="row" align="left">
        {title}
      </TableCell>
      <TableCell align="left">{getTimeMoment(created_at)}</TableCell>
      <TableCell align="left">{price}</TableCell>
      <TableCell align="left">{description}</TableCell>
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

export default Orders;
