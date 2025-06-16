import { Module } from '@nestjs/common';
import { Logger } from './log.service';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}