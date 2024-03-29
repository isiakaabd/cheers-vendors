import { CloseOutlined } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "react-toastify";
import { useCreateSupportMutation } from "redux/api/vendor";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("required"),
  message: Yup.string().required("required"),
});
const SupportForm = () => {
  const [active, setActive] = useState(0);
  const [createSupport, { isLoading }] = useCreateSupportMutation();
  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    const { title, message, file } = values;

    formData.append("title", title);
    formData.append("message", message);
    if (file.file.length > 0) {
      formData.append(`image`, file.file[0]);
    }
    const { data, error } = await createSupport(formData);
    if (data) {
      toast.success(data);
      setTimeout(() => resetForm(), 300);
    }
    if (error) toast.error(error.message);
  };

  return (
    <Grid item container>
      <Grid item sx={{ mx: "auto" }} md={8} xs={12}>
        <Formik
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={{
            title: "",
            message: "",
            file: "",
          }}
        >
          {({ setFieldValue, values, errors }) => {
            return (
              <Form noValidate>
                <Typography sx={{ mb: 2 }} variant="h1">
                  Support
                </Typography>

                <Grid item container gap={2}>
                  <Grid item container>
                    <FormikControl name="title" placeholder="Title" />
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="message"
                      control="textarea"
                      placeholder="Message"
                    />
                  </Grid>
                  <Grid item container>
                    <FormikControl name="file" control="file" multiple />
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

                            border: `.3rem solid ${
                              idx === active ? "#a80a69" : "#F6F6F6"
                            }`,
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              const y = values.file.file.filter(
                                (_, index) => index !== idx
                              );
                              const x = values.file.preview.filter(
                                (_, index) => index !== idx
                              );

                              setFieldValue("file", {
                                file: y,
                                preview: x,
                              });

                              if (x.length - 1 > idx) setActive(idx + 1);
                              if (idx === 0) setActive(0);
                              else setActive(idx - 1);
                            }}
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
                          >
                            <CloseOutlined
                              sx={{ fontSize: "1.2rem", color: "#fff" }}
                            />
                          </IconButton>
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
                              onClick={() => setActive(idx)}
                            />
                          </PhotoView>
                        </Grid>
                      ))}
                    </Grid>
                  </PhotoProvider>

                  <Grid item xs={12} sm={4} sx={{ mx: "auto" }}>
                    <CustomButton
                      title="Submit"
                      type="submit"
                      isSubmitting={isLoading}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};
export const Skeletons = () => {
  return (
    <Grid item container>
      <Grid item sx={{ mx: "auto" }} md={8} xs={12}>
        <Grid item container gap={3}>
          <Skeleton
            sx={{ height: "4rem", width: "15rem" }}
            animation="wave"
            variant="rectangular"
          />
          <Grid item container gap={2}>
            <Grid container flexWrap={"nowrap"} gap={2}>
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
            <Grid container flexWrap={"nowrap"}>
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
            <Grid container flexWrap={"nowrap"}>
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SupportForm;
