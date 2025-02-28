import winston, { Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
  LogData,
  TransformedData,
} from 'winston-elasticsearch';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};

export const winstonLogger = (
  elasticsearchNode: string,
  name: string,
  level: string
): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    elasticsearch: {
      level,
      transformer: esTransformer,
      clientOpts: {
        node: elasticsearchNode,
        maxRetries: 2,
        requestTimeout: 1000,
        sniffOnStart: false,
      },
    },
  } as const as {
    console: ConsoleTransportOptions;
    elasticsearch: ElasticsearchTransportOptions;
  };

  const esTransport = new ElasticsearchTransport(options.elasticsearch);
  const logger: Logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: {
      service: name,
    },
    transports: [new winston.transports.Console(options.console), esTransport],
  });
  return logger;
};
