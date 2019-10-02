import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions/exception-filter.interface';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    const r = exception.getResponse();
    const body = typeof r === 'string' ? { statusCode, error: r } : { ...r };

    response
      .status(statusCode)
      .json({
        ...body,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
