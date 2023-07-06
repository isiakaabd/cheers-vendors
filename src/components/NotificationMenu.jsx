// import { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotificationMenu({ menuList }) {
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }
  const navigate = useNavigate();
  return (
    <div>
      <IconButton
        size="large"
        aria-label={notificationsLabel(100)}
        id="fade-button"
        // aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        // aria-expanded={open ? "true" : undefined}
        onClick={() => navigate("/support/message")}
      >
        <Badge
          badgeContent={4}
          color="primary"
          sx={{ fontSize: "2rem" }}
          showZero
        >
          <MailIcon color="action" sx={{ fontSize: "2.5rem" }} />
        </Badge>
      </IconButton>

      {/* <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* {menuList.map((item, idx) => (
          <MenuItem key={idx} sx={{ width: "300px" }}>
            {item}
          </MenuItem>
        ))} */}
      {/* <List sx={{ width: "100%" }}> 
          {birthdayMessages.map((text, idx) => (
            <List alignItems="flex-start" dense sx={{ width: "100%" }}>
              {/* <ListItemButton role={undefined} dense sx={{ mr: 3 }}> 
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  size="large"
                  // checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
               </ListItemButton> 
              <ListItemButton
                sx={{ width: "100%" }}
                onClick={() =>
                  navigate(`/support/message/${idx}`, { state: text })
                }
              >
                <ListItemText
                  primary={text}
                  key={idx}
                  sx={{ width: "100%" }}
                  primaryTypographyProps={{
                    textAlign: "justify",
                    // width: "30%",
                    // maxHeight: "12rem",
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    // whiteSpace: "nowrap",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        
      </Menu> */}
    </div>
  );
}
