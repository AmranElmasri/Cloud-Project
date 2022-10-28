import React, { useState } from 'react';
import { Form, Input, Submit } from '../../components/FormUI';
import './style.css';
import { Grid } from '@mui/material';
import { getBase64, getError, insertImageSchema } from '../../utils';
import axios from '../../apis/index';
import { useSnackbar } from 'notistack';

const InsertForm = () => {
  let initialValues = { key: '', image: '' };
  const [base64, setBase64] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    values.image = base64;

    try {
      if (base64) {
        const { data } = await axios.post('/insert-img', values);
        enqueueSnackbar(data.message, { variant: 'success' });
        values.key = '';
        values.image = '';
      }
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(getError(error), { variant: 'error' });
    }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((base64) => {
        setBase64(base64);
      })
      .catch((error) => {
        console.log(error);
      });
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
              sx={{ backgroundColor: '#fff', marginLeft: '40px' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="input__file">
              <input type="file" name="file" onChange={handleFileInputChange} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
            <Submit variant="contained" sx={{ marginTop: '1rem' }}>
              Insert
            </Submit>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default InsertForm;
