import React, { useState } from "react";
import { Form, Input, Submit } from "../../components/FormUI";
import "./style.css";
import { Grid } from "@mui/material";
import { getError, getImageSchema } from "../../utils";
import axios from "axios";
import { CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';

const GetForm = () => {
  let initialValues = { key: "" };
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async(values) => {
    try {
      setLoading(true);
      const {data} = await axios.get(`/api/v1/get-image/?key=${values.key}`);
      setImg(data.image || data);
      setLoading(false);
      values.key = "";
    } catch (error) {
      enqueueSnackbar(getError(error), {variant: 'error'});
      setLoading(false);
    }
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
            <Submit variant="contained" sx={{ marginLeft: "4rem", height: "2.2rem" }}>
              Get
            </Submit>
          </Grid>
        </Grid>
      </Form>

      {loading && <CircularProgress sx={{marginTop: "4rem"}}/>}
      {img &&(
        <div className="retrieved__img">
          <img style={{width: "100%"}} src={img} alt="img"/>
        </div>
      )}
    </div>
  );
};

export default GetForm;
