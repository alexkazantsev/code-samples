import { Injectable, NestInterceptor, ExecutionContext, HttpStatus, HttpException, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as clc from 'cli-color';
import { logger } from '../utils/logger';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle()
      .pipe(
        catchError(error => {
          const http = context.switchToHttp();
          const { originalUrl, method } = http.getRequest();

          process.stdout.write(clc.red(`[APP] ${process.pid} - `));
          process.stdout.write(clc.red(method));
          process.stdout.write(clc.red(` ${originalUrl} - `));
          process.stdout.write(`${new Date(Date.now()).toLocaleString()} `);
          process.stdout.write('\n');

          logger.error(error);

          return throwError(new HttpException(error, error.status || HttpStatus.BAD_REQUEST));
        }),
      );
  }
}
