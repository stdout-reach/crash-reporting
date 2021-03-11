import { TelemetryEvent } from 'rollbar';

export interface Person {
  org: string;
  email: string;
  id: number;
}

export interface Screen {
  width: number;
  height: number;
}

export interface Plugins {
  name: string;
  description: string;
}

export interface Client {
  screen: Screen;
  plugins: Plugins[];
  cookiesEnabled: boolean;
  language: string;
  browser: string;
}

export interface TelemetryReport {
  title: string;
  telemetry: (
    | NetworkTelemetryEventJsonObject
    | LogTelemetryEventJsonObject
    | DomTelemetryEventJsonObject
    | NavigationTelemetryEventJsonObject
  )[];
  timestamp: number;
  framework: string;
  platform: string;
  endpoint: string;
  uuid: string;
  language: string;
  level: string;
  environment: string;
  person: Person;
  client: Client;
  metadata: {};
}

export interface PersonJsonObject {
  org: string;
  email: string;
  id: number;
}

export interface ClientJsonObject {
  timestamp: number;
  javascript: {
    screen: Screen;
    plugins: Plugins[];
    cookies_enabled: boolean;
    language: string;
    browser: string;
  };
  runtime_ms: number;
}

export interface TelemetryEventJsonObject extends TelemetryEvent {
  type: 'network' | 'log' | 'navigation' | 'dom';
  source: 'client';
}

export interface NetworkTelemetryEventJsonObject
  extends TelemetryEventJsonObject {
  type: 'network';
  body: {
    end_time_ms: number;
    url: string;
    status_code: number;
    start_time_ms: number;
    response_content_type: string;
    request_content_type: string;
    subtype: 'xhr' | 'fetch';
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  };
}

export interface LogTelemetryEventJsonObject extends TelemetryEventJsonObject {
  type: 'log';
  body: {
    message: string;
  };
  uuid: string;
}

export interface NavigationTelemetryEventJsonObject
  extends TelemetryEventJsonObject {
  type: 'navigation';
  body: {
    to: string;
    from: string;
  };
}

export interface DomTelemetryEventJsonObject extends TelemetryEventJsonObject {
  type: 'dom';
  body: {
    subtype: 'click' | 'input';
    element: string;
  };
}

export interface BodyJsonObject {
  message: {
    body: string;
  };
  telemetry: TelemetryEventJsonObject[];
}

export interface TelemetryReportJsonObject {
  body: BodyJsonObject;
  timestamp: number;
  framework: string;
  platform: string;
  request: {
    url: string;
    query_string: string;
    user_ip: string;
  };
  endpoint: string;
  uuid: string;
  language: string;
  level: string;
  environment: string;
  person: PersonJsonObject;
  client: ClientJsonObject;
  metadata: {};
}
