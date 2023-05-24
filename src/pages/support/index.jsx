import { CloseOutlined } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
const Support = () => {
  const [active, setActive] = useState(0);
  const validationSchema = Yup.object().shape({
    challenge: Yup.string("Select a Challenge").required("required"),
    description: Yup.number("Enter Description of the Challenge").required(
      "required"
    ),
  });
  return (
    <Grid item container>
      <Grid item sx={{ mx: "auto" }} md={8} xs={12}>
        <Formik
          enableReinitialize
          // onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={{
            challenge: "",
            description: "",
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
                    <FormikControl
                      name="challenge"
                      control={"select"}
                      options={[
                        { label: "Refund", value: "Refund" },
                        {
                          label: "Payment Reconciliation",
                          value: "Payment Reconciliation",
                        },
                        { label: "Others", value: "Others" },
                      ]}
                      placeholder="Challenge"
                    />
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="description"
                      control="textarea"
                      placeholder="Description"
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

                      // isSubmitting={isSubmitting}
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
export default Support;
