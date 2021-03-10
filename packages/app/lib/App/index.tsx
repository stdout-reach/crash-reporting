import React from "react";
import RollbarProvider, { RollbarConsumer } from "../Rollbar";

export default function App(): React.ReactElement {
  return (
    <RollbarProvider>
      <div>Hello, React!</div>
      <RollbarConsumer />
    </RollbarProvider>
  );
}
