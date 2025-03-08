import { getErrorMessage } from '../helpers';
import { winstonLogger } from './logger.base';
import { Logger } from 'winston';

type LogCatchFunction = (
  error: unknown,
  source: string,
  level?: 'error' | 'warn' | 'info'
) => void;

export type ServiceLogger = {
  log: Logger;
  logCatch: LogCatchFunction;
};

export const createLogger = (
  serviceName: string,
  elasticUrl: string,
  level: string = 'debug'
): ServiceLogger => {
  const log: Logger = winstonLogger(elasticUrl, serviceName, level);
  const logCatch: LogCatchFunction = (error, source, level = 'error') => {
    log.log(level, `[${serviceName}] ${source}`, getErrorMessage(error));
  };
  return { log, logCatch };
};
