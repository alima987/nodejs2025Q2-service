import { LoggerService, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import {
  appendFileSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  renameSync,
  statSync,
} from 'fs';

enum LoggingLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Log = 'log',
  Debug = 'debug',
  Verbose = 'verbose',
}

@Injectable()
export class Logger implements LoggerService {
  private loggingLevel: LoggingLevel | string =
    process.env.LOGGING_LEVEL || LoggingLevel.Log;

  private loggingPriorityMap: Record<LoggingLevel, number> = {
    [LoggingLevel.Fatal]: 0,
    [LoggingLevel.Error]: 1,
    [LoggingLevel.Warn]: 2,
    [LoggingLevel.Log]: 3,
    [LoggingLevel.Debug]: 4,
    [LoggingLevel.Verbose]: 5,
  };

  convertDatetoReadable() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  writingToFile(level: LoggingLevel | string, logMessage: string) {
    const folderPath = resolve(__dirname, '../..', 'logFiles');
    const filePath = resolve(folderPath, `currentLogFile.txt`);
    const errorFilePath = resolve(folderPath, `currentErrorLogFile.txt`);

    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }

    if (!existsSync(errorFilePath)) {
      const fileDescriptor = openSync(errorFilePath, 'w');
      closeSync(fileDescriptor);
    }
    if (!existsSync(filePath)) {
      const fileDescriptor = openSync(filePath, 'w');
      closeSync(fileDescriptor);
    }

    if (existsSync(filePath) && !(level === 'error' || level === 'fatal')) {
      const fileSize = statSync(filePath).size;
      if (filePath) {
        if (fileSize > (parseInt(process.env.MAX_SIZE) || 10240)) {
          const newFilePath = resolve(folderPath, `logFile-${Date.now()}.txt`);
          renameSync(filePath, newFilePath);
          appendFileSync(newFilePath, logMessage + '\n');
        } else {
          appendFileSync(filePath, logMessage + '\n');
        }
      }
    }

    if (
      (existsSync(errorFilePath) && level === 'error') ||
      (existsSync(errorFilePath) && level === 'fatal')
    ) {
      if (errorFilePath) {
        const errorFileSize = statSync(errorFilePath).size;
        if (errorFileSize > (parseInt(process.env.MAX_SIZE) || 10240)) {
          const errorNewFilePath = resolve(
            folderPath,
            `errorLogFile-${Date.now()}.txt`,
          );
          renameSync(errorFilePath, errorNewFilePath);
          appendFileSync(errorNewFilePath, logMessage + '\n');
        } else {
          appendFileSync(errorFilePath, logMessage + '\n');
        }
      }
    }
  }

  displayMessage(message: any, level: LoggingLevel | string) {
    const logMessage = `[${level.toUpperCase()}] ${this.convertDatetoReadable()} - ${message}\n`;
    process.stdout.write(logMessage);
    this.writingToFile(level, logMessage);
  }

  fatal(message: any) {
    if (
      this.loggingPriorityMap[this.loggingLevel] >=
      this.loggingPriorityMap[LoggingLevel.Fatal]
    ) {
      this.displayMessage(message, LoggingLevel.Fatal);
    }
  }

  error(message: any) {
    if (
      this.loggingPriorityMap[this.loggingLevel] >=
      this.loggingPriorityMap[LoggingLevel.Error]
    ) {
      this.displayMessage(message, LoggingLevel.Error);
    }
  }

  warn(message: any) {
    if (
      this.loggingPriorityMap[this.loggingLevel] >=
      this.loggingPriorityMap[LoggingLevel.Warn]
    ) {
      this.displayMessage(message, LoggingLevel.Warn);
    }
  }

  log(message: any) {
    if (
      this.loggingPriorityMap[this.loggingLevel] >=
      this.loggingPriorityMap[LoggingLevel.Log]
    ) {
      this.displayMessage(message, LoggingLevel.Log);
    }
  }

  debug?(message: any) {
    if (
      this.loggingPriorityMap[this.loggingLevel] >=
      this.loggingPriorityMap[LoggingLevel.Debug]
    ) {
      this.displayMessage(message, LoggingLevel.Debug);
    }
  }

  verbose?(message: any) {
    if (
      this.loggingPriorityMap[this.loggingLevel] >=
      this.loggingPriorityMap[LoggingLevel.Verbose]
    ) {
      this.displayMessage(message, LoggingLevel.Verbose);
    }
  }
}
