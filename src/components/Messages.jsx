import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getTimeMoment } from "utilis";
import BasicMenu from "./MenuComponent";
const Messages = ({
  reply,
  opens,
  anchorEls,
  setAnchorEls,
  handleCloses,
  handleClicks,
  handleButtonClick,
}) => {
  return (
    <div>
      <ListItem
        alignItems="flex-start"
        dense
        sx={{
          backgroundColor: reply.sender === "admin" ? "#d9fdd3" : "#a80a69",
          color: reply.sender !== "admin" && "#fff",
        }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="more-action"
            id="basic-button"
            aria-controls={opens ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={opens ? "true" : undefined}
            onClick={handleClicks}
          >
            <MoreVertIcon sx={{ fontSize: "2.5rem" }} />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton dense>
          <ListItemText
            primary={reply.message}
            primaryTypographyProps={{ textAlign: "justify" }}
            secondary={
              <Typography
                variant="h6"
                sx={{ textAlign: "right", width: "100%" }}
              >
                {getTimeMoment(reply.created_at)}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="fullWidth" />
      <BasicMenu
        open={opens}
        anchorEl={anchorEls}
        setAnchorEl={setAnchorEls}
        handleClick={handleClicks}
        handleClose={handleCloses}
      >
        <MenuItem
          // disabled={reply.media.length === 0}
          onClick={() => handleButtonClick(reply)}
        >
          View Images
        </MenuItem>
      </BasicMenu>
    </div>
  );
};

export default Messages;
