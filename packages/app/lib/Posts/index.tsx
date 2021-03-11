import React, { useState } from 'react';

import { Formik, Form } from 'formik';
import {
  TextField,
  Button,
  Box,
  Divider,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import usePosts from '../Hooks/usePosts';

export default function Posts(): React.ReactElement {
  const [id, setId] = useState<number>(1);
  const post = usePosts(id);

  return (
    <>
      <Box>
        {post.loading && <CircularProgress />}
        {!post.loading && (
          <>
            <Typography variant='h5'>{post.title}</Typography>
            <Typography variant='body1'>{post.body}</Typography>
          </>
        )}
      </Box>
      <Divider />
      <Formik
        initialValues={{
          post: 1,
        }}
        onSubmit={(values) => {
          setId(values.post);
        }}
      >
        {(formik) => (
          <Form>
            <TextField
              id='post'
              name='post'
              value={formik.values.post}
              onChange={formik.handleChange}
            />
            <Button color='primary' variant='contained' type='submit'>
              Fetch Post
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
