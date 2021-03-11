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
  cookies_enabled: boolean;
  language: string;
  browser: string;
}

export interface TelemetryReport {
  body: any;
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

interface PersonJsonObject {
  org: string;
  email: string;
  id: number;
}

interface ClientJsonObject {
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

interface TelemetryJsonObject {
  type: 'network' | 'log' | 'navigation' | 'dom';
  level: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  timestamp: number;
  source: 'client';
  body: object;
}

interface NetworkTelemetryJsonObject extends TelemetryJsonObject {
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

interface LogTelemetryJsonObject extends TelemetryJsonObject {
  type: 'log';
  body: {
    message: string;
  };
  uuid: string;
}

interface NavigationTelemetryJsonObject extends TelemetryJsonObject {
  type: 'navigation';
  body: {
    to: string;
    from: string;
  };
}

interface DomTelemetryJsonObject extends TelemetryJsonObject {
  type: 'dom';
  body: {
    subtype: string;
  };
}

interface BodyJsonObject {
  message: {
    body: string;
  };
  telemetry: {};
}

export interface TelemetryReportJsonObject {
  body: any;
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
