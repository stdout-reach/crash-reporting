// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { TelemetryReport } from '@cr/telemetry';
import Bluebird from 'cypress/types/bluebird';

// Must be declared global to be detected by typescript (allows import/export)
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Navigate to a page within the application
       * @param page
       */
      navigateTo(page: string): void;

      stubFetch(result: {
        status: 200 | 401 | 403 | 404 | 405 | 500 | 501 | 502 | 503;
        json: object;
      }): void;

      interceptFetch(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        result: {
          status: 200 | 401 | 403 | 404 | 405 | 500 | 501 | 502 | 503;
          data: object;
        },
        delay?: number
      ): void;

      readReport<T>(fileName: string): Chainable<T>;

      controlledInputChange(
        input: JQuery<HTMLElement>,
        value: string
      ): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('navigateTo', (page: string = '') => {
  const route = `${page}`;
  return cy.get(`a[href="${route}"]`).click();
});

Cypress.Commands.add(
  'stubFetch',
  (result: {
    status: 200 | 401 | 403 | 404 | 405 | 500 | 501 | 502 | 503;
    json: object;
  }) => {
    const stub = cy.stub(window, 'fetch').callsFake(
      (): Promise<object> => {
        return new Promise((resolve) => {
          stub.restore();
          resolve(
            Promise.resolve({
              status: result.status,
              json: Promise.resolve(result.json),
            })
          );
        });
      }
    );
  }
);

Cypress.Commands.add(
  'interceptFetch',
  (
    url: string,
    method: 'GET' | 'POST' | 'UPDATE' | 'DELETE',
    result: {
      status: 200 | 401 | 403 | 404 | 405 | 500 | 501 | 502 | 503;
      data: object;
    },
    delay: number = 0
  ) => {
    return cy.intercept(
      {
        method: method,
        url: url,
      },
      (req) => {
        req.reply((res) => {
          res.delay(delay);
          res.send(result.status, result.data);
        });
      }
    );
  }
);

Cypress.Commands.add('readReport', (fileName: string) => {
  return cy.readFile(`cypress/reports/${fileName}`, 'utf8');
});

Cypress.Commands.add(
  'controlledInputChange',
  (input: string, value: string) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;

    const changeInputValue = (inputToChange) => (newValue) => {
      nativeInputValueSetter.call(inputToChange[0], newValue);
      inputToChange[0].dispatchEvent(
        new Event('change', { newValue, bubbles: true })
      );
    };

    return cy.get(input).then((input) => changeInputValue(input)(value));
  }
);

// Convert this to a module instead of script (allows import/export)
export {};
