import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from './log/log.service';

dotenv.config();
const port = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);
  app.useLogger(logger);
  process.on('unhandledRejection', (reason, promise) => {
    logger.displayMessage(
      `Unhandled Rejection at:${promise}, reason: ${reason}`,
      'fatal',
    );
  });

  process.on('uncaughtException', (err, origin) => {
    logger.displayMessage(
      `Uncaught Exception ${err}, Origin: ${origin}`,
      'fatal',
    );
    process.exit(1);
  });
  await app.listen(port, () =>
    console.log(`Server is listening on port ${port}`),
  );
}
bootstrap();
