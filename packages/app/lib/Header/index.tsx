import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Tab, Tabs, Divider } from '@material-ui/core';

function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

function pickTab(path: string): number {
  switch (path) {
    case '/posts': {
      return 1;
    }
    case '/contact': {
      return 2;
    }
    default: {
      return 0;
    }
  }
}

export default function Header(): React.ReactElement {
  const [value, setValue] = React.useState(pickTab(useLocation().pathname));

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
