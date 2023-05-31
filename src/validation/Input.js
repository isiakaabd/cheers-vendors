import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
import { Grid, TextField, Typography } from "@mui/material";
import { TextError } from "./TextError";
const Text = ({ placeholder, endAdornment, ...rest }) => {
  return (
    <TextField
      id="outlined-basic"
      {...rest}
      size="small"
      label={placeholder}
      variant="filled"
      InputProps={{ endAdornment }}
    />
  );
};

const Input = (props) => {
  const { label, name, type, borderRadius, helperText, styles, ...rest } =
    props;
  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        type={type ? type : "text"}
        {...rest}
        as={Text}
      />
      {helperText && (
        <Typography
          variant="span"
          color="#9B9A9A"
          sx={{ md: ".5rem", xs: ".2rem" }}
          fontSize={{ md: "1.2rem", xs: "1rem" }}
        >
          {helperText}
        </Typography>
      )}
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
