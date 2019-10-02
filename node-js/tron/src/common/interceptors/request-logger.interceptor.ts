import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import clc from 'cli-color';

const colorizedFont = (isError: boolean, str: string): string => {
  const out = clc.bold.white;
  if (isError) {
    return out.bgRedBright(str);
  }
  return out.bgGreenBright(str);
};

const colorizedText = (isError: boolean, str: string): string => {
  if (isError) {
    return clc.red(str);
  }
  return clc.green(str);
};

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const now = Date.now();

    return handler.handle()
      .pipe(
        tap(() => {
            const http = context.switchToHttp();
            const { originalUrl, method } = http.getRequest();
            const { statusCode } = http.getResponse();
            const isError = statusCode >= 400;

            process.stdout.write(colorizedText(isError, `[APP] ${process.pid}  - `));
            process.stdout.write(colorizedFont(isError, method));
            process.stdout.write(colorizedText(isError, ` ${originalUrl} - `));
            process.stdout.write(`${new Date(Date.now()).toLocaleString()} `);
            process.stdout.write(clc.yellow(`+${Date.now() - now}ms`));
            process.stdout.write('\n');
          },
        ),
      );
  }
}
