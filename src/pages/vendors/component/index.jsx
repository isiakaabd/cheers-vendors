import { Avatar, Grid, IconButton, Typography } from "@mui/material";
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
const validationSchema = Yup.object().shape({
  title: Yup.string().required("required"),
  price: Yup.number("Enter Amount")
    .typeError("Enter Amount")
    .required("required"),
  description: Yup.string().required("required"),
});

const CreateInventory = ({ heading, values, setOpen, type }) => {
  const [createInventory] = useCreateInventoryMutation();
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [updateInventory] = useUpdateInventoryMutation();
  const cats = categories?.map((category) => ({
    label: category.title,
    value: category.title,
  }));

  // console.log(editCategory);
  const [active, setActive] = useState(0);
  const handleCreateInventory = async (values) => {
    const { title, category, price, description, file } = values;
    const categoryId = categories?.filter((cat) => category === cat.title);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category_id", categoryId[0].id);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("active", 1);

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
  };

  const handleSubmit = async (values) => {
    const { title, category, price, description, file } = values;
    const categoryId = categories?.filter((cat) => category === cat.title);

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("title", title);
    formData.append("category_id", categoryId[0]?.id);
    formData.append("price", price);
    formData.append("description", description);
    if (file?.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("gallery[]", file[i]);
      }
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
  // if (isLoading) return <Skeleton />;
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
            return (
              <Form style={{ width: "100%" }}>
                <Grid item container gap={2}>
                  <Grid item container>
                    <FormikControl name="title" placeholder="Title" />
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="category"
                      placeholder="Category"
                      control="select"
                      selected={type === "category" && values.category}
                      options={isLoading ? [] : [...cats]}
                    />
                  </Grid>
                  <Grid item container>
                    <FormikControl name="price" placeholder="Price" />
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
                  <Grid item container sx={{ mt: 3 }}>
                    <CustomButton
                      title="Submit"
                      width="100%"
                      type="submit"
                      isSubmitting={isSubmitting}
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

export default CreateInventory;
