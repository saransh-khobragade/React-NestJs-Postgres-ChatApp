import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter as OTLPTraceExporterGrpc } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter as OTLPMetricExporterGrpc } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { OTLPTraceExporter as OTLPTraceExporterHttp } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter as OTLPMetricExporterHttp } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const serviceName = process.env.OTEL_SERVICE_NAME || 'nestjs-backend';
// Use HTTP exporter endpoint by default (collector has HTTP at :4318). For HTTP exporters, include OTLP paths.
const otlpBase = (process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://otel-collector:4318').replace(':4317', ':4318');
const tracesUrl = `${otlpBase.replace(/\/$/, '')}/v1/traces`;
const metricsUrl = `${otlpBase.replace(/\/$/, '')}/v1/metrics`;

// Prefer gRPC; if not available, fall back to HTTP exporter
const traceExporter = new OTLPTraceExporterHttp({ url: tracesUrl });
const metricExporter = new OTLPMetricExporterHttp({ url: metricsUrl });

export const otelSdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  }),
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({ exporter: metricExporter }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
    }),
  ],
});

export async function startOtel() {
  await otelSdk.start();
}

export async function shutdownOtel() {
  await otelSdk.shutdown();
}
