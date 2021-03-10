import React from 'react';
import ContactForm from '../ContactForm';
import RollbarProvider, { RollbarConsumer } from '../Rollbar';

export default function App(): React.ReactElement {
  return (
    <RollbarProvider>
      <ContactForm />
      <RollbarConsumer />
    </RollbarProvider>
  );
}
