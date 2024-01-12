import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const route = request.route.path;
    const body = JSON.stringify(request.body);
    const params = JSON.stringify(request.params);
    console.log(`                                      `);
    console.log(`................Start.................`);
    console.log(`Request Method: ${method}`);
    console.log(`Request Route: ${route}`);
    console.log(`Request Body: ${body}`);
    console.log(`Request Params: ${params}`);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`Time... ${Date.now() - now}ms`);
        console.log(`................End.................`);
      }),
    );
  }
}
