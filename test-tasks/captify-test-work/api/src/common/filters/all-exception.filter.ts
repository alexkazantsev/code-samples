import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions/exception-filter.interface';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    const r = exception.getResponse() as { response: object };

    response
      .status(statusCode)
      .json({
        ...r.response,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
