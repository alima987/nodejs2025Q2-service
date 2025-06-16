import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () =>
    console.log(`Server is listening on port ${port}`),
  );
}
bootstrap();
