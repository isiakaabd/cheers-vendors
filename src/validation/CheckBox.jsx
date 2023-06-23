import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Field } from "formik/dist";
import PropTypes from "prop-types";

const Switchs = ({ label, name, value, ...rest }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          // sx={{ m: label ? 1 : 0 }}
          size="large"
          name={name}
          {...rest}
        />
      }
      label={label}
    />
  );
};

const CheckBox = (props) => {
  const { label, value, name, placeholder, ...rest } = props;

  return (
    <>
      <Grid container direction="column">
        <Field
          id={name}
          type="checkbox"
          label={label ? label : null}
          name={name}
          as={Switchs}
          {...rest}
        />
      </Grid>
      {/* <ErrorMessage name={name} component={TextError} /> */}
    </>
  );
};
CheckBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
export default CheckBox;
