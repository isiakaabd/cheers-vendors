import { Avatar, Grid } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function Images({ itemData }) {
  return (
    <PhotoProvider>
      <Grid
        item
        container
        display="grid"
        gap={1}
        gridTemplateColumns={{
          xs: "repeat(auto-fill, minmax(8rem, 1fr))",
        }}
        gridTemplateRows={{
          xs: "repeat(auto-fill, minmax(8rem, 1fr))",
        }}
      >
        {itemData.map((item) => (
          <PhotoView src={item.original_url} key={item.uuid}>
            <Avatar
              variant="square"
              src={item.original_url}
              alt={item.file_name}
              sx={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
                "& .MuiAvatar-img": {
                  // objectFit: "contain !important",
                },
                maxHeight: "100%",
                transition: "border 1ms linear",
              }}
            />
          </PhotoView>
        ))}
      </Grid>
    </PhotoProvider>
  );
}
