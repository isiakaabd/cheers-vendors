import { Avatar, Grid, Skeleton, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "react-toastify";
import {
  useChangePasswordMutation,
  useGetVendorProfileQuery,
} from "redux/api/authSlice";
import { useUpdateProfileMutation } from "redux/api/vendor";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First name is required"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  lastname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Last name is required"),
  vendor_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Vendor name is required"),
  phone: Yup.string()
    .min(8, "Minimum 8 digit")
    .max(12, "Maximum 12 digit")
    .required("Phone is required"),
});
const passwordValidationSchema = Yup.object().shape({
  oldpassword: Yup.string().required("Enter your Old password"),

  password: Yup.string()
    .required("Enter your password")
    .min(8, "password too short")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),

  cpassword: Yup.string("Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});
const Profile = () => {
  const { data: profile, isLoading, error } = useGetVendorProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword, { isLoading: load }] = useChangePasswordMutation();
  if (isLoading) return <Skeletons />;

  if (error) return <Typography>Something went wrong..</Typography>;
  const onSubmit = async (values) => {
    const { firstname, lastname, email, phone, vendor_name, file } = values;
    const formData = new FormData();

    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("_method", "PUT");
    formData.append("vendor_name", vendor_name);

    if (file.file.length > 0) {
      formData.append(`profile_picture`, file.file[0]);
    }
    // const datas = {
    //   first_name: firstname,
    //   last_name: lastname,
    //   email,
    //   phone,
    //   vendor_name,
    // };
    // if (file?.file.length > 0) {
    //   console.log(file.file[0]);
    //   datas.profile_picture = file.file[0];
    // }

    try {
      const { data } = await updateProfile(formData);

      if (data) toast.success(data);
    } catch (err) {
      let picsError = err?.errors?.profile_picture;

      toast.error(picsError[0] || err.message || "Something went wrong..");
    }
  };
  const onSubmitPassword = async (values, onSubmitProps) => {
    const { password, cpassword, oldpassword } = values;
    const formData = new FormData();
    formData.append("old_password", oldpassword);
    formData.append("new_password", password);
    formData.append("new_password_confirmation", cpassword);

    const { data, error } = await changePassword(formData);

    if (data) {
      toast.success(data);
    } else toast.error(error);
    setTimeout(() => onSubmitProps.resetForm(), 200);
  };
  const { email, first_name, vendor_name, last_name, phone, profile_picture } =
    profile;
  return (
    <Grid item cotainer flexDirection="column" gap={6}>
      <Grid item container>
        <Grid item sx={{ mx: "auto" }} md={8} xs={12}>
          <Formik
            enableReinitialize
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            initialValues={{
              firstname: first_name || "",
              lastname: last_name || "",
              email: email || "",
              phone: phone || "",
              vendor_name: vendor_name || "",
              file: profile_picture || null,
              // username: username || "",
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form noValidate>
                <Typography sx={{ mb: 2 }} variant="h1">
                  Profile
                </Typography>

                <Grid item container gap={2}>
                  <Grid item container gap={2} flexWrap="nowrap">
                    <Grid item xs={6}>
                      <FormikControl
                        name="firstname"
                        autoComplete="off"
                        placeholder="First name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        name="lastname"
                        autoComplete="off"
                        placeholder="Last name"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="vendor_name"
                      autoComplete="off"
                      placeholder="Vendor Name"
                    />
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="email"
                      autoComplete="off"
                      placeholder="Email"
                      disabled
                    />
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="phone"
                      autoComplete="off"
                      placeholder="Phone"
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

                  <Grid item xs={12} sm={4} sx={{ mx: "auto" }}>
                    <CustomButton
                      title="Update Profile"
                      type="submit"
                      isSubmitting={isSubmitting}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>

      <Grid item container mt={4}>
        <Grid item sx={{ mx: "auto" }} md={8} xs={12}>
          <Formik
            enableReinitialize
            onSubmit={onSubmitPassword}
            validationSchema={passwordValidationSchema}
            initialValues={{
              password: "",
              cpassword: "",
              oldpassword: "",
            }}
          >
            <Form noValidate>
              <Typography sx={{ mb: 2 }} variant="h1">
                Update Password
              </Typography>

              <Grid item container gap={2}>
                <Grid item container>
                  <FormikControl
                    name="oldpassword"
                    type="password"
                    autoComplete="off"
                    placeholder="Old Password"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="New Password"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    name="cpassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {/* </Grid> */}
                </Grid>

                <Grid item xs={12} sm={4} sx={{ mx: "auto" }}>
                  <CustomButton
                    title="Update Password"
                    type="submit"
                    isSubmitting={load}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};
function Skeletons() {
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
}
export default Profile;
