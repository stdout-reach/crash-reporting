import parse from '../lib/Parser';
import {
  TelemetryReportJsonObject,
  NetworkTelemetryEventJsonObject,
  DomTelemetryEventJsonObject,
  NavigationTelemetryEventJsonObject,
  LogTelemetryEventJsonObject,
} from '../lib/Types';

describe('@cr/telemetry', () => {
  describe('when parsing Rollbar Json Data into a report', () => {
    const json: TelemetryReportJsonObject = {
      body: {
        message: {
          body: 'Title of the report',
        },
        telemetry: [
          {
            body: {
              end_time_ms: 456,
              url: 'http://example-host.com/',
              status_code: 200,
              start_time_ms: 123,
              response_content_type: 'application/json; charset=UTF-8',
              subtype: 'xhr',
              method: 'GET',
            },
            source: 'client',
            timestamp_ms: 456,
            type: 'network',
            level: 'info',
          },
          {
            body: {
              message: 'Test Log Message',
            },
            source: 'client',
            timestamp_ms: 123,
            type: 'log',
            level: 'info',
          },
          {
            body: {
              to: '/page-two',
              from: '/',
            },
            source: 'client',
            timestamp_ms: 123,
            type: 'navigation',
            level: 'info',
          },
          {
            body: {
              subtype: 'click',
              element: '... > button[type="submit"]',
            },
            source: 'client',
            timestamp_ms: 123,
            type: 'dom',
            level: 'info',
          },
        ],
      },
      timestamp: 123,
      framework: 'browser-js',
      platform: 'browser',
      endpoint: 'api.rollbar.com/api/1/item/',
      request: {
        url: 'http://example.com',
        query_string: '',
        user_ip: '123',
      },
      uuid: '123-456-7890',
      language: 'javascript',
      level: 'debug',
      environment: 'test',
      person: {
        id: 1,
        email: 'user@email.com',
        org: 'Company',
      },
      client: {
        javascript: {
          screen: {
            width: 1920,
            height: 1080,
          },
          plugins: [],
          language: 'javascript',
          browser: 'Chrome',
          cookies_enabled: true,
        },
        timestamp: 123,
        runtime_ms: 123,
      },
      metadata: {},
    };

    const report = parse(json);

    it('should contain the report title', () => {
      expect(report.title).toBe('Title of the report');
    });

    it('should contain the report timestamp', () => {
      expect(report.timestamp).toBe(123);
    });

    it('should contain the telemetry events', () => {
      expect(report.telemetry[0].type).toBe('network');
      expect(report.telemetry[1].type).toBe('log');
      expect(report.telemetry[2].type).toBe('navigation');
      expect(report.telemetry[3].type).toBe('dom');
    });
  });
});
