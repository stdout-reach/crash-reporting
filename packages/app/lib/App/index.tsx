import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Container } from '@material-ui/core';

import Header from '../Header';
import ContactForm from '../ContactForm';
import Posts from '../Posts';
import RollbarProvider from '../Rollbar';

export default function App(): React.ReactElement {
  return (
    <RollbarProvider>
      <BrowserRouter>
        <Header />

        <Container>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/posts'>
              <Posts />
            </Route>
            <Route path='/contact'>
              <ContactForm />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </RollbarProvider>
  );
}

function Home(): React.ReactElement {
  return <div>Home Page</div>;
}
