import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import * as colors from 'colors';
import * as clc from 'cli-color';
import 'rxjs/add/operator/do';

const colorizedFont = (isError: boolean, str: string): string => {
  const out = clc.bold.white;
  if (isError) return out.bgRedBright(str);
  return out.bgGreenBright(str);
};

const colorizedText = (isError: boolean, str: string): string => {
  if (isError) return clc.red(str);
  return clc.green(str);
};

@Interceptor()
export class ReqeustLoggerInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const now = Date.now();

    return stream$.do(
      (...args) => {
        const { originalUrl, method, res: { statusCode } } = dataOrRequest;
        const isError = statusCode >= 400;
        process.stdout.write(colorizedFont(isError, method));
        process.stdout.write(colorizedText(isError, ` ${originalUrl} - `));
        process.stdout.write(colorizedText(isError, `[${process.pid}] - `));
        process.stdout.write(`${new Date(Date.now()).toLocaleString()} `);
        process.stdout.write(clc.yellow(`+${Date.now() - now}ms`));
        process.stdout.write('\n');
      },
    );
  }
}
