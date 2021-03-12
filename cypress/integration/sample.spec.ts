import {
  TelemetryReport,
  parse,
  TelemetryReportJsonObject,
  NetworkTelemetryEventJsonObject,
  NavigationTelemetryEventJsonObject,
} from '@cr/telemetry';

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it.skip('visits the home page', () => {
    cy.interceptFetch(
      'https://jsonplaceholder.typicode.com/posts/1',
      'GET',
      {
        status: 200,
        data: {
          id: 1,
          title: 'Hello, World',
          body: 'Body of the response....',
          userId: 1,
        },
      },
      3000
    );
    cy.navigateTo('posts');
  });

  it('should read the report', async () => {
    const postParsed = 'posts-parsed.json';
    const postsFailed = '12-crash-report-failed-to-fetch.json';

    cy.readReport<TelemetryReportJsonObject>(postsFailed).then((r) => {
      const report = parse(r);

      report.telemetry.forEach((event) => {
        // Intercept all network calls
        if (event.type === 'network') {
          const networkEvent: NetworkTelemetryEventJsonObject = event;
          cy.interceptFetch(networkEvent.body.url, networkEvent.body.method, {
            status: networkEvent.body.status_code,
            data: {}, // TODO, need mock data...
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
          const element = cy.get(`${event.body.element}`);
          if (event.body.subtype === 'click') {
            // Do a click command
            element.click();
          } else {
            // Do an input command
            element
              .invoke('val', event.body.value)
              .trigger('change')
              .trigger('input');
          }
        }
        if (event.type === 'log') {
          // Do a log action
        }
      });
    });
  });
});
