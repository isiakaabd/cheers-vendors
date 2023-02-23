import { DeleteOutline, MoreHorizOutlined } from "@mui/icons-material";
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
} from "@mui/material";
import CustomButton from "components/CustomButton";
import Dialogs from "components/Dialog";
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
import CreateInventory from "pages/vendors/component";
import { useNavigate } from "react-router-dom";

const Inventories = () => {
  const { data: inventories, isLoading: loading } = useGetInventoriesQuery();

  const [open, setOpen] = useState(false);
  if (loading) return <Skeletons />;
  const headcells = [
    "Name",
    "Created At",
    "Price",
    "Description",
    "Category",
    "",
  ];
  return (
    <>
      <Grid item container flexDirection="column">
        <Grid item sx={{ ml: "auto", mb: 3 }}>
          <CustomButton
            title="Add Inventory"
            type="button"
            onClick={() => setOpen(true)}
          />
        </Grid>
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
                paginationLabel="inventories per page"
                hasCheckbox={false}
                per_page={inventories?.per_page}
                totalPage={inventories?.to}
                nextPageUrl={inventories?.next_page_url}
              >
                {inventories?.data?.map((row) => (
                  <Rows key={row.id} row={row} />
                ))}
              </BasicTable>
            </Grid>
          ) : (
            <EmptyCell
              paginationLabel="Availability  per page"
              headCells={headcells}
            />
          )}
        </Card>
      </Grid>

      <Dialogs
        isOpen={open}
        handleClose={(e) => {
          setOpen(false);
        }}
      >
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

function Rows({ row }) {
  const { id, description, category, price, title, created_at } = row;
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

  return (
    <>
      <TableRow
        tabIndex={-1}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`${id}`)}
      >
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
          </BasicMenu>
        </TableCell>
      </TableRow>
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
