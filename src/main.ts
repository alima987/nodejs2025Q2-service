import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use('/doc', (_, res) => {
    const yamlPath = join(__dirname, '..', 'doc', 'api.yaml');
    const fileContent = readFileSync(yamlPath, 'utf8');
    res.setHeader('Content-Type', 'text/yaml');
    res.send(fileContent);
  });
  await app.listen(4000);
}
bootstrap();
