import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Grid } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Images({ itemData }) {
  return (
    <Grid item container>
      <ImageList
        sx={{
          display: "grid",
          gap: "2rem",
          width: "100%",
          gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
        }}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.uuid}>
            <img
              src={`${item.original_url}?w=100&h=100&fit=crop&auto=format`}
              srcSet={`${item.original_url}?w=100&h=100&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}
