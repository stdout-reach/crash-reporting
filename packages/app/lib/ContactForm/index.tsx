import React from 'react';

import { Formik, Form, FormikHelpers } from 'formik';
import { Button, TextField } from '@material-ui/core';
import * as Yup from 'yup';

function mockSuccessfulSubmit(
  values: ContactFormProps
): Promise<ContactFormProps> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(values);
    }, 300);
  });
}

interface ContactFormProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(/\d{3}\-\d{3}\-\d{4}/, {
      message: 'phone must match the following pattern: "xxx-xxx-xxxx"',
    })
    .notRequired(),
  message: Yup.string()
    .min(15, 'Your message is too short')
    .max(500, 'Your message is too long')
    .required(),
});

export default function ContactForm(): React.ReactElement {
  const handleSubmit = async (values: ContactFormProps) => {
    await mockSuccessfulSubmit(values);
  };

  const handleReset = (
    _: ContactFormProps,
    formik: FormikHelpers<ContactFormProps>
  ) => {
    formik.setErrors({});
    formik.setTouched({}, false);
    formik.setValues(initValues, false);
  };

  const initValues: ContactFormProps = {
    name: '',
    phone: '',
    email: '',
    message: '',
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      onReset={handleReset}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <TextField
            fullWidth
            required
            variant='outlined'
            id='name'
            name='name'
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          ></TextField>
          <TextField
            fullWidth
            variant='outlined'
            id='phone'
            name='phone'
            label='Phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          ></TextField>
          <TextField
            fullWidth
            required
            variant='outlined'
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          ></TextField>
          <TextField
            fullWidth
            required
            variant='outlined'
            id='message'
            name='message'
            label='Message'
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          ></TextField>
          <Button
            aria-label='reset'
            title='Reset'
            onClick={() => {
              formik.resetForm();
            }}
          >
            Reset
          </Button>
          <Button
            aria-label='submit'
            color='primary'
            variant='contained'
            title='Submit'
            disabled={formik.isSubmitting}
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
