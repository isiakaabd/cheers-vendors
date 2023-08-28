import MailIcon from "@mui/icons-material/Mail";
import {
  Badge,
  Button,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Menu,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from "redux/api/vendor";
const overflow = {
  overflow: "hidden",
  maxWidth: "100%",
  textOverflow: "ellipsis",
  wordWrap: "nowrap",
  whiteSpace: "nowrap",
};
export default function NotificationMenu() {
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }
  const [markAsRead] = useMarkAsReadMutation();
  const navigate = useNavigate();
  const { data } = useGetNotificationsQuery();
  const handleRead = async () => {
    try {
      const { data } = await markAsRead();
      toast.success(data);
    } catch (err) {
      toast.error(err || "Something went wrong..");
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  return (
    <div>
      <IconButton
        size="large"
        aria-label={notificationsLabel(100)}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={
          handleClick
          //
        }
      >
        <Badge
          badgeContent={data?.unreadNotificationCount || 0}
          color="primary"
          sx={{ fontSize: "2rem" }}
        >
          <MailIcon color="action" sx={{ fontSize: "2.5rem" }} />
        </Badge>
      </IconButton>

      <Menu
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
            maxWidth: "30rem",
          },
        }}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {data?.notification_data?.length > 0 && (
          <Grid item container justifyContent="flex-end">
            <Button variant="text" onClick={handleRead}>
              Mark All as Read
            </Button>
          </Grid>
        )}
        {data?.notification_data?.map((item, idx) => (
          <ListItemButton
            dense
            key={idx}
            onClick={() => {
              navigate("/support/message", { state: item.id });
              handleClose();
            }}
          >
            <ListItemText
              primary={item?.data?.title}
              secondary={item?.data?.body}
              primaryTypographyProps={overflow}
              secondaryTypographyProps={overflow}
            />
          </ListItemButton>
        ))}
      </Menu>
    </div>
  );
}
