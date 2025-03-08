import { getErrorMessage } from '../helpers';
import { winstonLogger } from './logger.base';
import { Logger } from 'winston';

export const createLogger = (
  serviceName: string,
  elasticUrl: string,
  level: string = 'debug'
) => {
  const log: Logger = winstonLogger(elasticUrl, serviceName, level);
  const logCatch = (
    error: unknown,
    comingFrom: string,
    level: 'error' | 'warn' | 'info' = 'error'
  ) => {
    log.log(level, `[${serviceName}] ${comingFrom}`, getErrorMessage(error));
  };
  return { log, logCatch };
};
