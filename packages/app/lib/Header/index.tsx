import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Tab, Tabs, Divider } from '@material-ui/core';

function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

export default function Header(): React.ReactElement {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs variant='fullWidth' value={value} onChange={handleChange}>
        <LinkTab label='Home' to='/' />
        <LinkTab label='Posts' to='/posts' />
        <LinkTab label='Contact' to='/contact' />
      </Tabs>
      <Divider />
    </>
  );
}
