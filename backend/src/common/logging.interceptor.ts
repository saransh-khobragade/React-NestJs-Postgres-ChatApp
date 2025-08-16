import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { context as otelContext, trace as otelTrace } from '@opentelemetry/api';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request & { method: string; url: string }>();
    const start = Date.now();

    const activeSpan = otelTrace.getSpan(otelContext.active());
    const spanContext = activeSpan?.spanContext();
    const traceId = spanContext?.traceId;
    const spanId = spanContext?.spanId;

    return next.handle().pipe(
      tap(() => {
        const response = http.getResponse<{ statusCode?: number }>();
        const durationMs = Date.now() - start;
        const log = {
          level: 'info',
          event: 'http_request_completed',
          method: request?.method,
          path: request?.url,
          status: response?.statusCode ?? 200,
          duration_ms: durationMs,
          trace_id: traceId,
          span_id: spanId,
          service: process.env.OTEL_SERVICE_NAME || 'nestjs-backend',
        } as const;
        // One-line JSON for easy ingestion into Loki
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(log));
      }),
      catchError((err) => {
        const durationMs = Date.now() - start;
        const status = (err?.status as number) ?? 500;
        const log = {
          level: 'error',
          event: 'http_request_failed',
          method: request?.method,
          path: request?.url,
          status,
          duration_ms: durationMs,
          message: err?.message,
          trace_id: traceId,
          span_id: spanId,
          service: process.env.OTEL_SERVICE_NAME || 'nestjs-backend',
        } as const;
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(log));
        return throwError(() => err);
      }),
    );
  }
}

