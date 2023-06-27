import { CloseOutlined } from "@mui/icons-material";
import { Avatar, Grid, IconButton } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "react-toastify";
import { useDeleteImageMutation } from "redux/api/inventory";

export default function Images({ itemData, inventoryId }) {
  const [deleteImage] = useDeleteImageMutation();
  const handleDelete = async (id) => {
    try {
      await deleteImage({
        inventoryId: inventoryId,
        mediaId: id,
      });
    } catch (e) {
      toast.error("something went wrong..");
    }
  };
  return (
    <PhotoProvider>
      <Grid
        item
        container
        display="grid"
        gap={1}
        gridTemplateColumns={{
          xs: "repeat(auto-fill, minmax(5rem, 1fr))",
        }}
      >
        {itemData.map((item, idx) => (
          <Grid
            key={idx}
            item
            sx={{
              // p: 0.5,
              position: "relative",
              width: "100%",

              border: `.3rem solid  "#a80a69"}`,
            }}
          >
            <IconButton
              sx={{
                mr: 0.5,
                position: "absolute",
                top: "-10px",
                right: "-10px",
                zIndex: 300,
                "&:hover": {
                  backgroundColor: "#a80a69",
                },
                backgroundColor: "#a80a69",
              }}
              size="small"
              edge="end"
              onClick={() => handleDelete(item.id)}
            >
              <CloseOutlined sx={{ fontSize: "1.2rem", color: "#fff" }} />
            </IconButton>
            <PhotoView key={idx} src={item.original_url}>
              <Avatar
                variant="square"
                src={item.original_url}
                sx={{
                  cursor: "pointer",
                  "& .MuiAvatar-img": {
                    objectFit: "cover !important",
                    width: "100%",
                  },
                  width: "100%",
                  maxHeight: "100%",
                  transition: "border 1ms linear",
                }}
              />
            </PhotoView>
          </Grid>
        ))}
      </Grid>
    </PhotoProvider>
  );
}
