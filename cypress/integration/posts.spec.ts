import {
  parse,
  TelemetryReportJsonObject,
  NetworkTelemetryEventJsonObject,
  NavigationTelemetryEventJsonObject,
} from '@cr/telemetry';

import posts from '../fixtures/posts.json';

function getMockData(url: string): object {
  if (url.startsWith('https://jsonplaceholder.typicode.com/posts/')) {
    const index = parseInt(
      url.substring('https://jsonplaceholder.typicode.com/posts/'.length),
      10
    );
    const post = posts[index - 1];
    console.log(post);
    return { ...post };
  }
  return {};
}

describe('Executing the user session', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('should read the report', () => {
    // const posts = 'posts-parsed.json';
    // const posts = 'posts-failed.json';
    const posts = '12-crash-report-failed-to-fetch.json';

    cy.readReport<TelemetryReportJsonObject>(posts).then((r) => {
      const report = parse(r);

      report.telemetry.forEach((event) => {
        // Intercept all network calls
        if (event.type === 'network') {
          const networkEvent: NetworkTelemetryEventJsonObject = event;
          cy.interceptFetch(networkEvent.body.url, networkEvent.body.method, {
            status: networkEvent.body.status_code,
            data: getMockData(networkEvent.body.url), // TODO, need mock data...
          });
          return; // do nothing else...
        }
      });

      // NOTE: we need to get the first navigation event to we know where to start from.
      const firstNavigation: NavigationTelemetryEventJsonObject = report.telemetry.find(
        (event) => {
          return event.type === 'navigation';
        }
      ) as NavigationTelemetryEventJsonObject;

      if (firstNavigation) {
        cy.navigateTo(firstNavigation.body.from);
      } else {
        // NOTE: always http://localhost:8080 for now...
        cy.navigateTo(
          report.request.url.substring('http://localhost:8080'.length)
        );
      }

      report.telemetry.forEach((event) => {
        if (event.type === 'navigation') {
          // Do a navigation action
          cy.navigateTo(event.body.to);
        }
        if (event.type === 'dom') {
          // Do a dom action
          if (event.body.subtype === 'click') {
            // Do a click command
            cy.get(`${event.body.element}`).click();
          } else {
            // Do an input command
            cy.get(`${event.body.element}`).then((input) => {
              cy.controlledInputChange(input, event.body.value);
            });
          }
        }
        if (event.type === 'log') {
          // Do a log action
        }
      });
    });
  });
});
