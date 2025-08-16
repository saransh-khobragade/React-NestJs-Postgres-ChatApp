import { Injectable } from '@nestjs/common';
import { metrics } from '@opentelemetry/api';

@Injectable()
export class MetricsService {
  private readonly httpRequestsTotal = metrics.getMeter('app').createCounter('http_requests_total', {
    description: 'Total number of HTTP requests',
  });
  private readonly httpRequestDuration = metrics.getMeter('app').createHistogram('http_request_duration_seconds', {
    description: 'Duration of HTTP requests in seconds',
    unit: 's',
  });
  private readonly activeConnections = metrics.getMeter('app').createUpDownCounter('active_connections', {
    description: 'Number of active connections',
  });
  private readonly userRegistrations = metrics.getMeter('app').createCounter('user_registrations_total', {
    description: 'Total number of user registrations',
  });
  private readonly userLogins = metrics.getMeter('app').createCounter('user_logins_total', {
    description: 'Total number of user logins',
  });

  constructor() {
  }

  getMetrics(): Promise<string> { return Promise.resolve('Metrics are exposed via OpenTelemetry (OTLP) through Grafana Alloy.'); }

  incrementHttpRequests(method: string, route: string, status: string): void {
    this.httpRequestsTotal.add(1, { method, route, status });
  }

  observeHttpDuration(method: string, route: string, status: string, duration: number): void {
    this.httpRequestDuration.record(duration, { method, route, status });
  }

  setActiveConnections(count: number): void {
    this.activeConnections.add(count); // Use add with positive/negative deltas
  }

  incrementUserRegistrations(): void {
    this.userRegistrations.add(1);
  }

  incrementUserLogins(success: boolean): void {
    this.userLogins.add(1, { status: success ? 'success' : 'failure' });
  }
}