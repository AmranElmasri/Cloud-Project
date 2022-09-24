import React from "react";
import { Form, Input, Submit } from "../../components/FormUI";
import "./style.css";
import { Grid } from "@mui/material";
import { insertImageSchema } from "../../utils";

const InsertForm = () => {
  let initialValues = { key: "", image: "" };
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="insertForm">
      <h3>Insert New Image</h3>
      <Form
        initialValues={initialValues}
        validationSchema={insertImageSchema}
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
            <div className="input__file">
              <input type="file" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
            <Submit variant="contained" sx={{ marginTop: "1rem" }}>
              Insert
            </Submit>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default InsertForm;
