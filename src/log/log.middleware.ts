import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    console.log('Request...');
    const startTime = Date.now();
    this.logger.log(
      `[Inc] - Method: ${method}, URL: ${originalUrl}, Query: ${JSON.stringify(
        query,
      )}, Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const elapsedTime = Date.now() - startTime;
      const { statusCode, statusMessage } = res;
      if (statusCode === 500) {
        this.logger.fatal(
          `[Out] - Status: ${statusCode}, Message: ${statusMessage}, Elapsed Time: ${elapsedTime}ms`,
        );
      } else if ((statusCode >= 400 && statusCode < 500) || statusCode > 500) {
        this.logger.error(
          `[Out] - Status: ${statusCode}, Message: ${statusMessage}, Elapsed Time: ${elapsedTime}ms`,
        );
      } else {
        this.logger.log(
          `[Out] - Status: ${statusCode}, Message: ${statusMessage}, Elapsed Time: ${elapsedTime}ms`,
        );
      }
    });

    next();
  }
}
