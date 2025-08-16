import { Controller, Get } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'NestJS CRUD API is running!';
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    const tracer = trace.getTracer('app-controller');
    const span = tracer.startSpan('health_check');
    try {
      return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      };
    } finally {
      span.end();
    }
  }
}
