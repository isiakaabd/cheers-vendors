import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
} from "redux/api/inventory";
import { useGetAllCategoriesQuery } from "redux/api/vendor";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { CloseOutlined } from "@mui/icons-material";
import Images from "../ImageList";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("required"),
  stock: Yup.string().required("required"),
  category: Yup.string().required("required"),
  price: Yup.number("Enter Amount")
    .typeError("Enter Amount")
    .required("required"),
  active: Yup.boolean(),
  description: Yup.string().required("required"),

  propertiesArray: Yup.array().min(1, "At least one item is required"),
});

const CreateInventory = ({ heading, values, setOpen, type }) => {
  const [createInventory] = useCreateInventoryMutation();
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [updateInventory] = useUpdateInventoryMutation();
  const cats = categories?.map((category) => ({
    label: category.title,
    value: category.title,
    properties: category?.properties,
  }));
  // console.log(values);
  // useEffect(() => {
  //   if (type === "edit") {
  //     const JSONProperties = JSON.parse(values?.propertiesArray);

  //     setProperties(JSONProperties);
  //   }
  //   //eslint-disable-next-line
  // }, [type]);
  const [active, setActive] = useState(0);

  const [properties, setProperties] = useState(null);

  const handleCreateInventory = async (values) => {
    const {
      title,
      category,
      active,
      stock,
      propertiesArray,
      price,
      description,
      file,
    } = values;
    const categoryId = categories?.filter((cat) => category === cat.title);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category_id", categoryId[0].id);
    formData.append("price", price);
    formData.append("active", active ? 1 : 0);
    formData.append("stock", stock);
    formData.append("properties", JSON.stringify(propertiesArray));
    formData.append("description", description);

    for (let i = 0; i < file.file.length; i++) {
      formData.append(`gallery[${i}]`, file.file[i]);
    }

    const { data, error } = await createInventory(formData);
    if (data) {
      toast.success(data?.message);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
    const err = error?.data?.errors;

    if (err) {
      const title = err?.title;
      const category = err?.category_id;
      const price = err?.price;
      if (title?.length > 0) toast.error(title[0]);
      if (category?.length > 0) toast.error(category[0]);
      if (price?.length > 0) toast.error(price[0]);
    }

    toast.error(error);
  };

  const initialValues = {
    title: "",
    category: "",
    price: "",
    description: "",
    file: null,
    propertiesArray: [],
    properties: "",
    stock: "",
    active: true,
    media: [],
  };

  const handleSubmit = async (values) => {
    const {
      title,
      category,
      stock,
      active,
      propertiesArray,
      price,
      description,
      file,
    } = values;
    const categoryId = categories?.filter((cat) => category === cat.title);

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("title", title);
    formData.append("properties", JSON.stringify(propertiesArray));
    formData.append("category_id", categoryId[0]?.id);
    formData.append("price", price);
    formData.append("active", active ? 1 : 0);
    formData.append("stock", stock);
    formData.append("description", description);

    for (let i = 0; i < file.file.length; i++) {
      formData.append(`gallery[${i}]`, file.file[i]);
    }
    const { data, error } = await updateInventory({
      id: values.id,
      body: formData,
    });

    if (data) {
      toast.success(data?.message);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
    const err = error?.data?.errors;

    if (err) {
      const title = err?.title;
      const category = err?.category_id;
      const price = err?.price;
      if (title?.length > 0) toast.error(title[0]);
      if (category?.length > 0) toast.error(category[0]);
      if (price?.length > 0) toast.error(price[0]);
    }
  };

  const changeCategory = (e, setFieldValue) => {
    setFieldValue("category", e.target.value);

    let y = cats?.filter((item) => item.label === e.target.value);
    let x = JSON.parse(y[0].properties);
    console.log(x);
    setProperties(y[0]?.properties && x);
    setFieldValue("propertiesArray", y[0]?.properties && x);
  };

  const handleDelete = (index, idx, values, setFieldValue) => {
    let x = properties[index];
    console.log(properties);
    let b = x.variants;
    let y = b[idx];

    let j = b.filter((v) => v !== y);

    // properties[index] = x;
    let w = properties.map((item, idxs) => {
      if (idxs === index) {
        item.variants = j;
      }
      return item;
    });

    setProperties(w);
    setFieldValue("propertiesArray", w);
  };

  return (
    <Grid item container gap={2} sx={{ pt: 0, height: "100%" }}>
      <Typography
        color="text.primary"
        fontWeight={700}
        width="100%"
        textAlign="center"
        fontSize={{ md: "2rem", xs: "1.5rem" }}
      >
        {heading}
      </Typography>
      <Grid item container>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={type === "edit" ? values : initialValues}
          onSubmit={type === "edit" ? handleSubmit : handleCreateInventory}
        >
          {({ isSubmitting, values, errors, setFieldValue }) => {
            console.log(values);
            let arr =
              values?.propertiesArray?.length > 0 ? values.propertiesArray : [];
            // let files =
            //   values?.media.length > 0
            //     ? [...values.media, values?.file?.preview]
            //     : values?.file?.preview;
            return (
              <Form style={{ width: "100%" }}>
                <Grid item container gap={2}>
                  <Grid item container>
                    <FormikControl name="title" placeholder="Title" />
                  </Grid>
                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item xs={6}>
                      <FormikControl name="stock" placeholder="Stock Count" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl name="price" placeholder="Price" />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    flexWrap="nowrap"
                    gap={2}
                    alignItems="center"
                  >
                    <Grid item flex={1}>
                      <FormikControl
                        name="category"
                        placeholder="Category"
                        control="select"
                        onChange={(e) => changeCategory(e, setFieldValue)}
                        selected={type === "category" && values.category}
                        options={isLoading ? [] : [...cats]}
                      />
                    </Grid>
                    <Grid item>
                      <Grid item container justifyContent={"flex-end"}>
                        <FormikControl
                          name="active"
                          control={"checkbox"}
                          label="Active"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container flexDirection={"column"}>
                    {/* <Grid item container flexWrap="nowrap" gap={2}>
                      <Grid item flex={1}>
                        <FormikControl
                          name="properties"
                          placeholder="Add a property"
                        />
                      </Grid>
                 
                      <Grid item>
                        <CustomButton
                          type="button"
                          disabled={!values.properties}
                          onClick={() => {
                            setFieldValue("propertiesArray", [
                              ...values.propertiesArray,
                              {
                                name: values.properties,
                                variant: "",
                              },
                            ]);
                            setTimeout(
                              () => setFieldValue("properties", ""),
                              10
                            );
                          }}
                          title={"Add Properties"}
                        />
                      </Grid>
                    </Grid> */}
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                      }}
                      component="ul"
                    >
                      {" "}
                      {arr?.length > 0 &&
                        arr?.map((property, index) => {
                          return (
                            <>
                              {/* <Grid
                                item
                                container
                                flexWrap="nowrap"
                                gap={2}
                                mt={1}
                              >
                                <Grid item flex={1}>
                                  <FormikControl
                                    // value=
                                    name={x}
                                    label={property.name}
                                    placeholder={`${property.name}- use Comma(,) for more than one property e.g red,green,blue`}
                                  />
                                </Grid>
                                <Grid item>
                                  <CustomButton
                                    color={"secondary"}
                                    type="button"
                                    onClick={() => {
                                      const arr = values.propertiesArray.filter(
                                        (item) => item.name !== property.name
                                      );
                                      setFieldValue("propertiesArray", arr);
                                    }}
                                    title={"Delete "}
                                  />
                                </Grid>
                              </Grid> */}
                              <Grid
                                item
                                container
                                alignItems={"center"}
                                key={index}
                              >
                                <Grid item>{property?.name}</Grid>
                                <Grid item container>
                                  {property?.variants?.map((item, idx) => (
                                    <ListItem
                                      key={idx}
                                      sx={{ maxWidth: "max-content" }}
                                    >
                                      <Chip
                                        color="primary"
                                        sx={{ fontSize: "1.2rem" }}
                                        label={item}
                                        onDelete={() =>
                                          handleDelete(
                                            index,
                                            idx,
                                            values,
                                            setFieldValue
                                          )
                                        }
                                      />
                                    </ListItem>
                                  ))}
                                </Grid>
                              </Grid>
                            </>
                          );
                        })}
                    </Paper>

                    {/*  {properties && (
                      <Grid item>
                     <FormikControl
                          // value=
                          name={`propertiesArray[${index}].variant`}
                          label={property.name}
                          placeholder={`${property.name}- use Comma(,) for more than one property e.g red,green,blue`}
                        /> 
                      </Grid>
                    )}*/}

                    {errors.propertiesArray && (
                      <Typography color="error" variant="error">
                        {errors.propertiesArray}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="description"
                      control="textarea"
                      placeholder="description"
                      rows={5}
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
                  {type === "edit" && (
                    <Grid item container flexDirection={"column"} gap={2}>
                      <Typography variant="h4">Existing Images</Typography>
                      {values.media?.length > 0 ? (
                        <Images
                          itemData={values.media}
                          inventoryId={values.id}
                        />
                      ) : (
                        <Typography variant="h5">No Images</Typography>
                      )}
                    </Grid>
                  )}
                </Grid>
                <Grid item container sx={{ mt: 3 }}>
                  <CustomButton
                    title="Submit"
                    width="100%"
                    type="submit"
                    isSubmitting={isSubmitting}
                  />
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default CreateInventory;
