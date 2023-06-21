import {
  Checkbox,
  FormHelperText,
  FormGroup,
  FormControl,
  FormLabel,
  Box,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { Field } from "formik/dist";
import PropTypes from "prop-types";
import { useState } from "react";

export const CheckboxesGroup = () => {
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </Box>
  );
};

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
