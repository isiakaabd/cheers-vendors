import {
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteInventoryMutation,
  useGetInventoryQuery,
} from "redux/api/inventory";
import Images from "./ImageList";
import BasicMenu from "components/MenuComponent";
import {
  DeleteOutline,
  EditOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import Dialogs from "components/Dialog";
import CreateInventory from "./component";
import { Skeletons } from ".";

const Inventory = () => {
  const { id } = useParams();
  const [deleteInventory, { isLoading: deleting, status }] =
    useDeleteInventoryMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = async () => {
    const { error } = await deleteInventory(id);

    if (status === "fulfilled") {
      toast.success("Inventory deleted successfully");
      setTimeout(() => handleClose(), 1000);
    }
    if (error) toast.error(error);
  };
  const handleClose = () => setAnchorEl(null);

  const { data, isLoading } = useGetInventoryQuery(id);
  const [edit, setEdit] = useState(false);
  if (isLoading) return <Skeletons />;
  const {
    media,
    id: ids,
    title,
    stock,
    active,
    category,
    description,
    reviews,
    price,
  } = data;

  const initials = {
    id,
    title,
    description,
    stock,
    active,
    price,
    category: category.title,
  };
  return (
    <>
      <Grid item container gap={3} flexDirection={"column"} sx={{ py: 6 }}>
        <Grid item container alignItems={"center"}>
          <Typography variant="h1" flex={1}>
            {title}
          </Typography>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertOutlined sx={{ fontSize: "3rem" }} />
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
              onClick={() => {
                handleClose();
                setEdit(true);
              }}
            >
              <ListItemIcon>
                <EditOutlined fontSize="large" />
              </ListItemIcon>

              <ListItemText primary="Edit" />
            </MenuItem>
          </BasicMenu>
        </Grid>
        <Grid item container flexDirection={"column"} gap={2}>
          <Typography variant="h4">Description</Typography>
          <Typography variant="h5">{description}</Typography>
        </Grid>
        <Grid item container flexDirection={"column"} gap={2}>
          <Typography variant="h4">Price</Typography>
          <Typography variant="h5">{price}</Typography>
        </Grid>
        <Grid item container flexDirection={"column"} gap={2}>
          <Typography variant="h4">Images</Typography>
          {media.length > 0 ? (
            <Images itemData={media} inventoryId={ids} />
          ) : (
            <Typography variant="h5">No Images</Typography>
          )}
        </Grid>
        <Grid item container flexDirection={"column"} gap={2}>
          <Typography variant="h5">Reviews</Typography>
          {reviews?.length > 0 ? (
            reviews.map((review, index) => (
              <Typography variant="h5" key={index}>
                {review}
              </Typography>
            ))
          ) : (
            <Typography variant="h5">No Review</Typography>
          )}
        </Grid>
      </Grid>
      <Dialogs
        isOpen={edit}
        handleClose={(e) => {
          setEdit(false);
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
};

export default Inventory;
