// Preload OpenTelemetry before any instrumented modules are loaded
import { startOtel } from './otel';
import * as Pyroscope from '@pyroscope/nodejs';

// Start profiling (CPU + heap)
try {
  Pyroscope.init({
    serverAddress: process.env.PYROSCOPE_SERVER_ADDRESS || 'http://pyroscope:4040',
    appName: process.env.PYROSCOPE_APP_NAME || 'nestjs-backend',
    tags: {
      service_name: process.env.OTEL_SERVICE_NAME || 'nestjs-backend',
      'deployment.environment': process.env.DEPLOYMENT_ENVIRONMENT || 'dev',
    },
  });
  Pyroscope.start();
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('Pyroscope start failed (continuing without profiling):', e);
}

startOtel().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start OpenTelemetry SDK', err);
});

