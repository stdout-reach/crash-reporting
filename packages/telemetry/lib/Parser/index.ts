import {
  TelemetryEventJsonObject,
  TelemetryReportJsonObject,
  TelemetryReport,
  DomTelemetryEventJsonObject,
  NetworkTelemetryEventJsonObject,
  NavigationTelemetryEventJsonObject,
  LogTelemetryEventJsonObject,
} from '../Types/index';

export default function parse(
  json: TelemetryReportJsonObject
): TelemetryReport {
  const report: TelemetryReport = {
    title: json.body.message.body,
    telemetry: [],
    timestamp: json.timestamp,
    framework: json.framework,
    platform: json.platform,
    endpoint: json.endpoint,
    uuid: json.uuid,
    language: json.language,
    level: json.level,
    environment: json.environment,
    person: { ...json.person },
    client: {
      screen: { ...json.client.javascript.screen },
      plugins: [...json.client.javascript.plugins],
      language: json.client.javascript.language,
      browser: json.client.javascript.browser,
      cookiesEnabled: json.client.javascript.cookies_enabled,
    },
    metadata: {},
  };

  json.body.telemetry.forEach((event: TelemetryEventJsonObject) => {
    switch (event.type) {
      case 'dom': {
        // create dom event
        report.telemetry.push({ ...event } as DomTelemetryEventJsonObject);
        return;
      }
      case 'log': {
        // create log event
        report.telemetry.push({ ...event } as LogTelemetryEventJsonObject);
        return;
      }
      case 'navigation': {
        // create navigation event
        report.telemetry.push({
          ...event,
        } as NavigationTelemetryEventJsonObject);
        return;
      }
      case 'network': {
        // create network event
        report.telemetry.push({ ...event } as NetworkTelemetryEventJsonObject);
        return;
      }
      default: {
        // NOTE: not sure what this is, console log it and don't push to stack.
        console.warn(
          `The TelemetryEvent of type [${event.type}] is not understood. Because of this, it will not be included in the final report.`
        );
        return;
      }
    }
  });

  return report;
}
