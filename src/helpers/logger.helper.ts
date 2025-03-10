import { getErrorMessage } from '../helpers';
import { winstonLogger } from './logger.base';
import { Logger } from 'winston';

type CaptureErrorFunction = (
  error: unknown,
  source: string,
  level?: 'error' | 'warn' | 'info'
) => void;

export type ServiceLogger = {
  log: Logger;
  captureError: CaptureErrorFunction;
};

export const createLogger = (
  serviceName: string,
  elasticUrl: string,
  level: string = 'debug'
): ServiceLogger => {
  const log: Logger = winstonLogger(elasticUrl, serviceName, level);
  const captureError: CaptureErrorFunction = (
    error,
    source,
    level = 'error'
  ) => {
    log.log(level, `[${serviceName}] ${source}`, getErrorMessage(error));
  };
  return { log, captureError };
};
