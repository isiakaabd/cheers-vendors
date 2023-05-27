import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import { Link, useNavigate } from "react-router-dom";
import FormikControl from "validation/FormikControl";

import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { useLoginMutation } from "redux/api/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getToken } from "redux/auth/auth.reducers";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const Login = (props) => {
  const [signInUser, { isLoading: loading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    const { data, error } = await signInUser({
      email,
      password,
    });
    if (error) {
      toast.error(error);
    } else if (data) {
      toast.success(data.message);
      dispatch(getToken(data?.data?.token));
      resetForm();
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid item container>
      <Formik
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        initialValues={{ email: "", password: "" }}
      >
        <Form>
          {/* begin::Heading */}
          <Grid item container gap={2}>
            <Grid item container flexDirection="column" gap={2}>
              <Typography textAlign={"center"} variant="h1">
                Welcome Vendor
              </Typography>
              <Typography
                textAlign={"center"}
                fontSize={"1.62rem"}
                color="#b5b5c3"
                fontWeight={500}
              >
                New Here?{" "}
                <Link
                  to="/auth/registration"
                  style={{
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "#a80a69 ",
                  }}
                >
                  Create an Account
                </Link>
              </Typography>
            </Grid>
            <Grid item container gap={3}>
              <Grid item container>
                <FormikControl
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  autoSave="off"
                />
              </Grid>
              <Grid item container>
                <FormikControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  autoSave="off"
                  endAdornment={
                    <InputAdornment>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Grid item sx={{ ml: "auto", mt: 1 }}>
                  <Typography
                    component={Link}
                    fontWeight={600}
                    color="primary"
                    to="/auth/forgot-password"
                    sx={{ fontSize: "1.3rem", textDecoration: "none" }}
                  >
                    Forgot Password ?
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container>
                <CustomButton
                  title={"Submit"}
                  isSubmitting={loading}
                  type="submit"
                />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};

Login.propTypes = {};

export default Login;
