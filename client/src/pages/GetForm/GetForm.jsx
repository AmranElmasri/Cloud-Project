import React from "react";
import { Form, Input, Submit } from "../../components/FormUI";
import "./style.css";
import { Grid } from "@mui/material";
import { getImageSchema } from "../../utils";

const GetForm = () => {
  let initialValues = { key: "" };
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="getForm">
      <h3>Get image using key</h3>
      <Form
        initialValues={initialValues}
        validationSchema={getImageSchema}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Input
              name="key"
              label="Key"
              type="text"
              size="small"
              sx={{ backgroundColor: "#fff", marginLeft: "40px" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Submit variant="contained" sx={{ marginLeft: "4rem" }}>
              Get
            </Submit>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default GetForm;
