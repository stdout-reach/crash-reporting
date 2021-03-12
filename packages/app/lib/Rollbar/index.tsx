import React from 'react';
import Rollbar from 'rollbar';

import { Button } from '@material-ui/core';

declare var AUTOMATED_TEST: any;

const RollbarContext = React.createContext<Rollbar>(undefined);

interface PropsWithChildren {
  children: React.ReactNode;
}

function noop(_: any[]): void {
  return null;
}

export function useRollbar(): Rollbar {
  const rollbar = React.useContext(RollbarContext);

  if (!AUTOMATED_TEST) {
    if (!rollbar) {
      throw new Error('useRollbar can only be used inside a RollbarProvider');
    }
    return rollbar;
  } else {
    return {
      info: noop,
      log: noop,
      error: noop,
      warn: noop,
      warning: noop,
      critical: noop,
    } as Rollbar;
  }
}

export default function RollbarProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  if (AUTOMATED_TEST) {
    return <>{children}</>;
  }

  const rollbar = new Rollbar({
    accessToken: 'c934fda01afb41a796892b1c646c6b42',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'development',
      person: {
        id: 1,
        email: 'nico.greco@outreach.io',
        org: 'Outreach',
      },
    },
  });

  return (
    <RollbarContext.Provider value={rollbar}>
      {children}
    </RollbarContext.Provider>
  );
}

export function RollbarConsumer(): React.ReactElement {
  const rollbar = useRollbar();

  return (
    <>
      <Button
        onClick={() => {
          rollbar.info('Crash Report: Test log');
        }}
      >
        Send Info
      </Button>
      <Button
        onClick={() => {
          rollbar.warn('Test warn');
        }}
      >
        Send Warning
      </Button>
      <Button
        onClick={() => {
          rollbar.error('Test error');
        }}
      >
        Send Error
      </Button>
      <Button
        onClick={() => {
          throw new Error('Throw Test Error');
        }}
      >
        Throw Error
      </Button>
    </>
  );
}
