import {
  Typography,
  Grid,
  Card,
  CardHeader,
  List,
  Avatar,
  IconButton,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { useLocation } from "react-router-dom";

import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
import Loader from "components/Loader";
import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";
import {
  useGetSupportsReplyQuery,
  useReplySupportMutation,
} from "redux/api/vendor";
import Messages from "./Messages";

const Message = () => {
  const location = useLocation();
  const payload = location.state;
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isViewerVisible, setIsViewerVisible] = useState(false);

  // Function to handle the button click and show the image viewer
  const handleButtonClick = (values) => {
    const data = values?.map((value) => {
      return {
        src: value.original_url,
        alt: value.file_name,
      };
    });
    setIsViewerVisible(true);
    setImages(data);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const { id } = useParams();

  const { data, isLoading: loading, error } = useGetSupportsReplyQuery(id);

  // const [status, setStatus] = useState(data?.is_open);
  const [replySupport, { isLoading }] = useReplySupportMutation();
  const [anchorEls, setAnchorEls] = useState(null);
  const opens = Boolean(anchorEls);
  const handleCloses = () => setAnchorEls(null);
  const handleClicks = (event) => {
    setAnchorEls(event.currentTarget);
  };
  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    const { message, file } = values;

    formData.append("support_id", id);
    formData.append("message", message);
    if (file?.file?.length > 0) {
      formData.append(`image`, file.file[0]);
    }
    const { data, error } = await replySupport(formData);
    if (data) {
      setTimeout(() => resetForm(), 300);
    }
    if (error) toast.error(error.message);
  };
  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .min(10, "Minimum 10 symbols")
      .required("Message is required"),
  });
  console.log(data?.support?.media?.length, "dttt");
  if (error) return <p>Something went wrong..</p>;
  return (
    <Grid item container mt={{ xs: 6, md: 4 }} gap={{ md: 3, xs: 4 }}>
      <Grid
        item
        md={6}
        xs={10}
        mb={{ md: 3, xs: 4 }}
        mx="auto"
        flexDirection={"column"}
      >
        <Card>
          <CardHeader
            title={
              <Grid item container flexWrap={{ md: "nowrap" }} gap={2}>
                <Grid item container flexWrap="nowrap">
                  <Typography variant="h5" flex={1}>
                    Vendor Response{" "}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {data?.vendor_response || 0}
                  </Typography>
                </Grid>
                <Grid item container flexWrap="nowrap">
                  <Typography variant="h5" flex={1}>
                    Admin Response{" "}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {data?.admin_response || 0}
                  </Typography>
                </Grid>
              </Grid>
            }
          />
        </Card>
      </Grid>
      <Grid item container mt={{ xs: 0, md: 4 }}>
        <Grid item md={9} xs={12} sm={11} mx="auto" flexDirection={"column"}>
          <Card>
            <CardHeader
              title={payload?.title}
              subheader={payload?.message}
              action={
                <IconButton
                  aria-label="more-action"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              }
            />
            <BasicMenu
              open={open}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
            >
              <MenuItem
                disabled={data?.support?.media.length === 0}
                onClick={() => handleButtonClick(data?.support.media)}
              >
                View Image
              </MenuItem>
            </BasicMenu>
          </Card>

          {loading ? (
            <Grid item mt={2}>
              <Loader color={"#333"} />
            </Grid>
          ) : (
            <List dense alignItems="flex-start">
              {data?.support?.replies.map((reply, idx) => (
                <Messages
                  reply={reply}
                  idx={idx}
                  key={reply.id}
                  opens={opens}
                  anchorEls={anchorEls}
                  setAnchorEls={setAnchorEls}
                  handleCloses={handleCloses}
                  handleClicks={handleClicks}
                  handleButtonClick={handleButtonClick}
                />
              ))}
            </List>
          )}
          {/* {status ? ( */}
          <Grid item container mt={5}>
            <Formik
              initialValues={{ message: "", file: null }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors }) => (
                <Form noValidate style={{ width: "100%" }}>
                  <Grid item container>
                    <Typography variant="h4" mb={2} gutterBottom>
                      Reply
                    </Typography>
                  </Grid>
                  <Grid item container flexDirection={"column"} gap={3}>
                    <Grid item container>
                      <FormikControl
                        name="message"
                        control="textarea"
                        placeholder="Enter Your Response here..."
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item container>
                      <FormikControl name="file" control="file" />
                    </Grid>
                    {errors.file && (
                      <Typography color="error" variant="error">
                        {errors.file}
                      </Typography>
                    )}
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
                        {values?.file?.preview?.map((item, idx) => (
                          <Grid
                            key={idx}
                            item
                            sx={{
                              // p: 0.5,
                              position: "relative",
                              width: "100%",
                            }}
                          >
                            <PhotoView key={idx} src={item}>
                              <Avatar
                                variant="square"
                                src={item}
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
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItem="center"
                    >
                      <Grid item md={5} xs={10}>
                        <CustomButton
                          type="submit"
                          title="Submit"
                          isSubmitting={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* end::Form group */}
                </Form>
              )}
            </Formik>
          </Grid>
          {/* // ) : (
          //   <Grid item container my={2} justifyContent={"center"}>
          //     <Typography variant="h3"> Issue has been closed</Typography>
          //   </Grid>
          // )} */}
        </Grid>
      </Grid>
      {isViewerVisible && (
        <PhotoProvider
          speed={() => 800}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
          images={images}
          visible={isViewerVisible}
          onClose={() => {
            setIsViewerVisible(false);
            handleClose();
            handleCloses();
          }}
        >
          <PhotoSlider
            images={images?.map((item) => ({ src: item, key: item }))}
            visible={isViewerVisible}
            onClose={() => setIsViewerVisible(false)}
            index={index}
            onIndexChange={setIndex}
          />
        </PhotoProvider>
      )}
    </Grid>
  );
};
export default Message;
