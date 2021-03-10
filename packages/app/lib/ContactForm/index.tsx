import React from 'react';

import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';
import * as Yup from 'yup';

function mockSuccessfulSubmit(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('something');
      resolve();
    }, 300);
  });
}

export default function ContactForm(): React.ReactElement {
  const handleSubmit = (formik) => {
    if (formik.isValid) {
      void mockSuccessfulSubmit();
    }
  };

  const handleReset = (formik) => {
    formik.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        message: '',
      }}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {(formik) => (
        <Form>
          <TextField
            fullWidth
            required
            variant='outlined'
            name='name'
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
          ></TextField>
          <TextField
            fullWidth
            variant='outlined'
            name='phone'
            label='Phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
          ></TextField>
          <TextField
            fullWidth
            required
            variant='outlined'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
          ></TextField>
          <TextField
            fullWidth
            required
            variant='outlined'
            name='message'
            label='Message'
            value={formik.values.message}
            onChange={formik.handleChange}
          ></TextField>
          <Button
            title='Reset'
            onClick={() => {
              formik.resetForm();
            }}
          >
            Reset
          </Button>
          <Button
            color='primary'
            variant='contained'
            title='Submit'
            onClick={() => {
              void formik.submitForm();
            }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
